import { Avatar, Button, Card, Layout, Modal, Spinner, Text, useTheme } from "@ui-kitten/components"
import React, { useEffect } from "react";
import { ImageBackground, StyleSheet } from "react-native"
import CustomIconButton from "../basic/CustomIconButton";

/**
 * Component to show a user profile in a modal view 
 * Props required:
 * - visible (boolean)
 * - user (string || null)
 * - onOpenConversationView: navigate to conversation view
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
                            <Avatar
                                shape='square'
                                size='giant'
                                source={require('../../assets/pepe.jpg')}
                                ImageComponent={ImageBackground}
                                style={{borderWidth: 2, borderRadius: 2, borderColor: theme['color-primary-default']}}
                            />
                            <Layout style={styles.headerRight}>
                                <Text category='p1'>{props.user.first_name}{props.user.last_name}</Text>
                                <Text category='p1' appearance='hint' style={{marginTop: 2}}>{props.user.username}</Text>
                            </Layout>
                        </Layout>
                        <Text style={{marginTop: 16}}category='s1'>Bio</Text>
                        <Text category='p1' appearance='hint'>{props.user.bio || '_'}</Text>

                        <Text style={{marginTop: 16}}category='s1'>Joined on</Text>
                        <Text category='p1' appearance='hint'>{props.user.birthday}</Text>

                        <CustomIconButton style={{marginTop: 16}} status='primary' iconName='plus' textColor={theme['color-basic-100']}>Add to contacts</CustomIconButton>
                        <CustomIconButton 
                            status='info'
                            style={{marginTop: 8}}
                            textColor={theme['color-basic-100']}
                            iconName='mail'
                            onPress={props.onOpenConversationView}>
                                View Profile
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