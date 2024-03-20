import { Avatar, Button, Card, Layout, Modal, Spinner, Text, useTheme } from "@ui-kitten/components"
import React, { useEffect } from "react";
import { ImageBackground, StyleSheet } from "react-native"
import CustomIconButton from "../basic/CustomIconButton";
import CachedAvatar from "../basic/CachedAvatar";

/**
 * Component to show a user profile in a modal view 
 * Props required:
 * - visible <boolean> display or not the modal
 * - user <string || null> user object that will be loaded in the modal. setting
 * the user to null will display a "Loading" message.
 * - onActionPressed <function> function to call when the primary button is pressed
 */

const UserProfileModal = (props) => {
    const theme = useTheme()

    return (
        <Modal 
            visible={props.visible}
            backdropStyle={styles.backdrop}
            style={{width: '90%'}}
            onBackdropPress={props.onBackdropPress}>

            <Card style={styles.container} disabled={true}>
                {
                    props.user && <>
                        <Layout style={styles.header}>
                            <CachedAvatar
                                imageStyle={[{borderWidth: 2, borderRadius: 2, borderColor: theme['color-primary-default']}]}
                                uri={props.user.profile_picture}
                                size='giant'
                            />
                            <Layout style={styles.headerRight}>
                                <Text category='p1'>{props.user.first_name} {props.user.last_name}</Text>
                                <Text category='p1' appearance='hint' style={{marginTop: 4}}>@{props.user.username}</Text>
                            </Layout>
                        </Layout>
                        <Text style={{marginTop: 16}}category='s1'>Bio</Text>
                        <Text category='p1' appearance='hint' style={{marginTop: 4}}>{props.user.bio || '_'}</Text>

                        <Text style={{marginTop: 16}}category='s1'>Joined on</Text>
                        <Text category='p1' appearance='hint' style={{marginTop: 4}}>{props.user.created_at}</Text>

                        <CustomIconButton 
                            style={{marginTop: 16}}
                            status='primary'
                            iconName='compass'
                            textColor={theme['color-basic-100']}
                            onPress={props.onActionPressed}>
                            View posts
                        </CustomIconButton>
                    </>
                }
                {
                    !props.user && <>
                        <Text>Loading user info_</Text>
                    </>
                }
            </Card>
        </Modal>
    )
}

export default UserProfileModal

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
        borderRadius: 4
    },
    header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    headerRight: {
        flex: 1,
        marginLeft: 8,
        alignSelf: 'center',
        justifyContent: 'space-between',
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
})