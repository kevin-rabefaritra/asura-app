import React from 'react';
import { Button, Divider, Icon, Text, Layout, Input, Datepicker, Avatar, useTheme } from "@ui-kitten/components";
import { ImageBackground, StyleSheet, View } from "react-native";
import DefaultStyle from "../../DefaultStyle";
import CustomIconButton from "../../basic/CustomIconButton";

const AppBar = (props) => {
    return (
        <View style={styles.appBarContainer}>
            <Text style={[DefaultStyle.heading, {flex: 1, textAlign: 'left'}]}>General info.</Text>
            <Button
                style={ { marginRight: 8} }
                appearance='ghost'
                status='basic'
                size='small'
                onPress={props.onBackPressed}>BACK
            </Button>
            <CustomIconButton
                status='primary'
                size='small'
                iconName='check' />
        </View>
    );
};

/**
 * General info profile screen
 * @param {*} props 
 * @returns 
 */
const GeneralInfoScreen = (props) => {

    const onCloseScreen = () => {
        props.navigation.goBack();
    }

    const theme = useTheme();

    return (
        <Layout style={styles.container}>
            <AppBar onBackPressed={onCloseScreen}/>
            <Divider />
            <Layout style={styles.body}>
                <Avatar
                    shape='square'
                    size='giant'
                    source={require('../../../assets/menja.jpg')}
                    ImageComponent={ImageBackground}
                    style={[styles.userAvatar, {borderColor: theme['color-primary-default']}]}
                />
                <Input label="Username" maxLength={50} value="@userm" disabled={true} />
                <Input label="Birth date" maxLength={50} value="12/03/1993" />
                <Input label="Email address" maxLength={50} value="user@demo.com" />
                <Input 
                    label='Bio'
                    multiline={true}
                    textStyle={ {minHeight: 128, textAlignVertical: 'top', paddingVertical: 8} }
                    placeholder="Hi! I'm available!" />
            </Layout>
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