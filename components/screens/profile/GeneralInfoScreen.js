import React from 'react';
import { Button, Divider, Icon, Text, Layout, Input, Datepicker, Avatar, useTheme, Spinner } from "@ui-kitten/components";
import { ImageBackground, Keyboard, StyleSheet, ToastAndroid, View } from "react-native";
import DefaultStyle from "../../DefaultStyle";
import CustomIconButton from "../../basic/CustomIconButton";
import { getBasicInfo, updateBasicInfo } from '../../../repositories/UserRepository';
import { BASE_URI, TOKEN, getPreference } from '../../services/PreferenceServices';
import APIException from '../../../exceptions/APIException';
import { isEmail } from '../../../helpers/string_helpers';
import { ThemeContext } from '../../theme-context';
import UserSessionExpiredException from '../../../exceptions/UserSessionExpiredException';

const AppBar = (props) => {
    return (
        <View style={styles.appBarContainer}>
            <Text style={[DefaultStyle.heading, {flex: 1, textAlign: 'left'}]}>General info.</Text>
            <Button
                style={ { marginRight: 8} }
                appearance='ghost'
                status='basic'
                size='small'
                onPress={props.onBackPressed}
                children={() => (<Text>CLOSE</Text>)}>
            </Button>
            <CustomIconButton
                status='primary'
                size='small'
                iconName='check'
                onPress={props.onValidatePressed}/>
        </View>
    );
};

/**
 * General info profile screen
 * @param {*} props 
 * @returns 
 */
const GeneralInfoScreen = (props) => {

    const theme = useTheme();
    const themeContext = React.useContext(ThemeContext);

    const [username, setUsername] = React.useState();
    const [birthDate, setBirthDate] = React.useState();
    const [email, setEmail] = React.useState();
    const [bio, setBio] = React.useState();

    const [isProfileLoaded, setIsProfileLoaded] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    /**
     * Called when the user closes the screen
     */
    const onCloseScreen = () => {
        props.navigation.goBack();
    }

    /**
     * Called when the user saves the changes
     */
    const onValidatePressed = async () => {
        if (isLoading) {
            return;
        }
        Keyboard.dismiss();
        setIsLoading(true);

        // Validate form
        let hasErrors = false;

        // 1. Check email address
        if (!isEmail(email)) {
            hasErrors = true;
        }

        // 2. Check birthdate
        // Todo: implement
        if (hasErrors) {
            return;
        }

        try {
            const token = await getPreference(TOKEN);
            const response = await updateBasicInfo(token, birthDate, email, bio);

            if (response.status == 200) {
                // User profile updated successfully
                ToastAndroid.show(`Profile updated successfully!`, ToastAndroid.SHORT);
            }
            else {
                ToastAndroid.show(`An error occured. Please try again later.`, ToastAndroid.SHORT);
            }
        }
        catch (e) {
            console.log(e);
            ToastAndroid.show(`An error occured. Please try again later.`, ToastAndroid.SHORT);
        }
        finally {
            setIsLoading(false);
        }
    }

    // Fetch token from preferences
    if (!isProfileLoaded) {
        getBasicInfo()
            .then(response => response.json())
            .then(json => {
                setUsername(`@${json.username}`);
                setBirthDate(json.birthday);
                setEmail(json.email);
                setBio(json.bio);
                setIsLoading(false);
                setIsProfileLoaded(true);
            })
            .catch((e) => {
                if (e instanceof UserSessionExpiredException) {
                    themeContext.updateUser(null);
                    onCloseScreen();
                    ToastAndroid.show("Session expired. Please sign in again.", ToastAndroid.SHORT);
                }
                else {
                    console.error(e);
                }
            });
    }

    return (
        <Layout style={styles.container}>
            <AppBar onBackPressed={onCloseScreen} onValidatePressed={onValidatePressed}/>
            <Divider />
            {
                !isLoading &&
                <Layout style={styles.body}>
                    <Avatar
                        shape='square'
                        size='giant'
                        source={require('../../../assets/menja.jpg')}
                        ImageComponent={ImageBackground}
                        style={[styles.userAvatar, {borderColor: theme['color-primary-default']}]}
                    />
                    <Input 
                        label="Username"
                        maxLength={50}
                        value={username}
                        disabled={true}
                        onChangeText={setUsername} />

                    <Input
                        label="Birth date"
                        maxLength={50}
                        value={birthDate}
                        placeholder="DD-MM-YYYY"
                        onChangeText={setBirthDate} />

                    <Input
                        label="Email address"
                        maxLength={50}
                        value={email}
                        onChangeText={setEmail} />

                    <Input 
                        label='Bio'
                        multiline={true}
                        textStyle={ {minHeight: 128, textAlignVertical: 'top', paddingVertical: 8} }
                        placeholder="Hi! I'm available!"
                        value={bio}
                        onChangeText={setBio} />
                </Layout>
            }
            {
                isLoading &&
                <Layout style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                    <Spinner />
                </Layout>
            }
        </Layout>
    )
}

export default GeneralInfoScreen;

const styles = StyleSheet.create({
    appBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    container: {
        flex: 1
    },
    body: {
        flexDirection: 'column',
        padding: 16,
        gap: 16
    },
    userAvatar: {
        alignSelf: 'center',
        borderWidth: 2,
        borderRadius: 4
    },
});