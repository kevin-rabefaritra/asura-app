import { Button, Card, Layout, Text, useTheme } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import DefaultStyle from "../../DefaultStyle";
import React, { useEffect } from "react";
import { sayHello } from "../../../repositories/UserRepository";

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
    
    const [output, setOutput] = React.useState("");
    const [displayedOutput, setDisplayedOutput] = React.useState("");

    const addOutput = (line) => {
        const value = `${output}\n${line}`;
        setOutput(value);
    };

    useEffect(() => {
        if (displayedOutput !== "") {
            setDisplayedOutput(`${displayedOutput}\n${output}`);
        }
        else {
            setDisplayedOutput(output);
        }
    }, [output]);

    const debug = async () => {
        // 1. Start 1
        setOutput("Starting debug.\n(1) Sending /hello to the other side..");

        let response = await sayHello();
        if (response.status === 200) {
            setOutput("(2) Hello successfull!");
        }
        else {
            setOutput(`(2) Hello failed with status code ${response.status}.`);
        }

        setOutput("(2) Authenticating user");
        // Todo: authenticate
    };
    
    return (
        <Layout style={{padding: 16, flex: 1, backgroundColor: theme['background-basic-color-3']}}>
            <Card header={Header} footer={<Footer onPress={debug}/>} style={{backgroundColor: theme['background-basic-color-1']}}>
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
    },
});