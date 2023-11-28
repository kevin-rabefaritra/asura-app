import React from 'react';
import { Button, Divider, Icon, Text, Layout, Input, Datepicker, Avatar, useTheme, Card, Spinner } from "@ui-kitten/components";
import { Keyboard, StyleSheet, ToastAndroid, View } from "react-native";
import DefaultStyle from "../../DefaultStyle";
import CustomIconButton from "../../basic/CustomIconButton";
import { updatePassword } from '../../../repositories/UserRepository';
import { PASSWORD_MIN_LENGTH } from '../SignUpScreen';
import { BASE_URI, TOKEN, getPreference } from '../../services/PreferenceServices';

const AppBar = (props) => {
    return (
        <View style={styles.appBarContainer}>
            <Text style={[DefaultStyle.heading, {flex: 1, textAlign: 'left'}]}>Security.</Text>
            <Button
                style={ { marginRight: 8} }
                appearance='ghost'
                status='basic'
                size='small'
                onPress={props.onBackPressed}
                children={() => (<Text>BACK</Text>)}>
            </Button>
            <CustomIconButton
                status='primary'
                size='small'
                iconName='check'
                onPress={props.onValidatePressed} />
        </View>
    );
};

/**
 * User security screen
 * @param {*} props 
 * @returns 
 */
const SecurityScreen = (props) => {

    const theme = useTheme();

    const [oldPassword, setOldPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = React.useState("");
    const [errors, setErrors] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const onCloseScreen = () => {
        props.navigation.goBack();
    }

    /**
     * Updates the user's password
     */
    const onValidatePressed = async () => {
        if (isLoading) {
            return;
        }

        Keyboard.dismiss();
        setIsLoading(true);

        // Clear all errors
        let formErrors = [];

        // Confirm that new password and new password confirm match
        if (newPassword !== newPasswordConfirm) {
            formErrors.push('New password / new password confirm do not match.');
        }
        
        // Confirm that the old password is different from the new one
        if (oldPassword === newPassword) {
            formErrors.push('Old and new password must be different.');
        }

        console.log(newPassword.trim().length);
        if (newPassword.trim().length < PASSWORD_MIN_LENGTH) {
            formErrors.push(`Password must be at least ${PASSWORD_MIN_LENGTH} characters`);
        }

        setErrors(formErrors);

        // If no errors, we can perform the password update
        if (formErrors.length === 0) {
            try {
                const token = await getPreference(TOKEN);
                const response = await updatePassword(
                    `${BASE_URI}/users/password/update`,
                    token,
                    oldPassword,
                    newPassword
                );
    
                if (response.status == 200) {
                    ToastAndroid.show(`Password updated successfully!`, ToastAndroid.SHORT);
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
        setIsLoading(false);
    }

    return (
        <Layout style={styles.container}>
            <AppBar onBackPressed={onCloseScreen} onValidatePressed={onValidatePressed}/>
            <Divider />
            {
                !isLoading &&
                <Layout style={styles.body}>
                    { errors.length > 0 && 
                        <Card
                            style={{marginTop: 8}}
                            status='danger'>
                            <Text style={{lineHeight: 24}}>
                            Error(s):
                            { errors.filter((item) => item != null && item.trim() != "").map((item) => `\n\u2022 ${item}`)}
                            </Text>
                        </Card>
                    }
                    <Input 
                        label="Current password"
                        maxLength={50}
                        onChangeText={value => setOldPassword(value)} />
                    <Input
                        label="New password"
                        maxLength={50}
                        onChangeText={value => setNewPassword(value)} />
                    <Input
                        label="Confirm new password"
                        maxLength={50}
                        onChangeText={value => setNewPasswordConfirm(value)} />
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

export default SecurityScreen;

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
});