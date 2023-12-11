import { Button, Card, Input, Layout, Text, useTheme } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import DefaultStyle from "../../DefaultStyle";
import React, { useEffect } from "react";
import { getBasicInfo, sayHello, signIn } from "../../../repositories/UserRepository";
import { BASE_URI, REFRESH_TOKEN, TOKEN, getPreference, savePreference } from "../../services/PreferenceServices";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Screen for performing debug operation
 * @param {*} props 
 */

const Header = (props) => (
    <Layout style={{padding: 16}}>
        <Text style={DefaultStyle.subtitle}>[Debug Server]</Text>
    </Layout>
);

const Footer = (props) => (
    <View {...props}  style={[props.style, styles.footerContainer]}>
    <Button
        style={styles.footerControl}
        size='small' onPress={props.onPress}>TEST</Button>
    </View>
);

const DebugScreen = (props) => {
    const theme = useTheme();

    const [username, setUsername] = React.useState();
    const [password, setPassword] = React.useState();
    
    const [output, setOutput] = React.useState("");
    const [displayedOutput, setDisplayedOutput] = React.useState("");

    const addOutput = (line) => {
        const value = `${output}\n${line}`;
        setOutput(value);
    };

    useEffect(() => {
        if (output !== "") {
            if (displayedOutput !== "") {
                setDisplayedOutput(`${displayedOutput}\n${output}`);
            }
            else {
                setDisplayedOutput(output);
            }
            // Reset output value to avoid unecessary useEffect call
            setOutput("");
        }
    }, [output]);

    const debug = async () => {
        // 1. Start 1
        setOutput("Starting debug.\n(1) Sending /hello to the other side..");

        // 2. GET request to /hello
        let response = await sayHello();
        if (response.status === 200) {
            setOutput("(1) Hello successfull!\n(2) Authenticating user..");
        }
        else {
            setOutput(`(1) Hello failed with status code ${response.status}.`);
            return;
        }

        // 3. Test token validity by fetching user basic info
        // multiGet returns error and stores
        let _, stores = await AsyncStorage.multiGet([TOKEN, REFRESH_TOKEN]);
        let [accessToken, refreshToken] = [stores[0][1], stores[1][1]];

        let authSuccess = false;
        response = await getBasicInfo(`${BASE_URI}/users/profile/basic`, accessToken);
        if (response.status === 200) {
            setOutput("(2) User authenticated successfully!");
            authSuccess = true;
        }
        else {
            setOutput(`(2) Authentication failed with status code ${response.status}.\n(3) Updating token..`);
        }

        if (!authSuccess) {
            const headers = {'Content-Type': 'application/json', 'Authorization': `Basic ${accessToken}`};
            response = await fetch(`${BASE_URI}/token/renew`, "POST", headers, {'refreshToken': refreshToken});

            if (response.status === 200) {
                setOutput(`(3) Token updated successfully!`);
                authSuccess = True;
            }
            else {
                setOutput(`(3) Token could not be updated.\n(4) Generating from credentials..`);
            }
        }

        if (!authSuccess) {
            response = await signIn(`${BASE_URI}/users/signin`, username, password);
            if (response.status === 200) {
                setOutput(`(4) Sign in successfull! Saving new tokens..`);
                let json = await response.json();
                await savePreference(TOKEN, json.token);
                await savePreference(REFRESH_TOKEN, json.refreshToken);
            }
            else {
                setOutput(`(4) Sign in failed with status code ${response.status}.`);
            }
        }
    };
    
    return (
        <Layout style={{padding: 16, flex: 1, backgroundColor: theme['background-basic-color-3']}}>
            <Card style={{backgroundColor: theme['background-basic-color-1']}}>
            <Input
                label='Your username'
                placeholder='@'
                onChangeText={setUsername}
            />
            <Input
                style={{marginTop: 16}}
                label='Password'
                secureTextEntry={true}
                placeholder='Enter your password'
                onChangeText={setPassword}
            />
            </Card>
            <Card header={Header} footer={<Footer onPress={debug}/>} style={{backgroundColor: theme['background-basic-color-1'], marginTop: 16}}>
                <Text>{displayedOutput}</Text>
            </Card>
        </Layout>
    );
}
export default DebugScreen;

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 2,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    footerControl: {
        marginHorizontal: 2,
    }
});