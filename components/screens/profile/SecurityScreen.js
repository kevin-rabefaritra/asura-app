import React from 'react';
import { Button, Divider, Icon, Text, Layout, Input, Datepicker, Avatar, useTheme } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import DefaultStyle from "../../DefaultStyle";
import CustomIconButton from "../../basic/CustomIconButton";

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
                iconName='check' />
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

    const [oldPassword, setOldPassword] = React.useState();
    const [newPassword, setNewPassword] = React.useState();
    const [newPasswordConfirm, setNewPasswordConfirm] = React.useState();

    const onCloseScreen = () => {
        props.navigation.goBack();
    }

    const onValidatePressed = () => {
        
    }

    return (
        <Layout style={styles.container}>
            <AppBar onBackPressed={onCloseScreen}/>
            <Divider />
            <Layout style={styles.body}>
                <Input label="Current password" maxLength={50} />
                <Input label="New password" maxLength={50} />
                <Input label="Confirm new password" maxLength={50} />
            </Layout>
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