import { Avatar, Button, Card, Layout, Modal, Text, useTheme } from "@ui-kitten/components"
import React from "react";
import { ImageBackground, StyleSheet } from "react-native"

const UserProfileModal = (props) => {
    const theme = useTheme()

    const [icon, setIcon] = React.useState(null);
    const [title, setTitle] = React.useState('Jane Doe');
    const [subtitle, setSubtitle] = React.useState('@janedoe');
    const [description, setDescription] = React.useState(null);
    const [signupDate, setSignupDate] = React.useState(null);

    return (
        <Modal 
            visible={props.visible}
            backdropStyle={styles.backdrop}
            style={{width: '90%'}}
            onBackdropPress={props.onBackdropPress}>

            <Card style={styles.container} disabled={true}>
                <Layout style={styles.header}>
                    <Avatar
                        shape='rounded'
                        size='large'
                        source={require('../../assets/pepe.jpg')}
                        ImageComponent={ImageBackground}
                    />
                    <Layout style={styles.headerRight}>
                        <Text category='p1'>{title}</Text>
                        <Text category='p1' appearance='hint'>{subtitle}</Text>
                    </Layout>
                </Layout>
                <Text style={{marginTop: 16}}category="s1">Bio</Text>
                <Text category='p1' appearance='hint'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet odio tempus, laoreet arcu sit amet, tristique risus.</Text>

                <Text style={{marginTop: 16}}category="s1">Joined on</Text>
                <Text category='p1' appearance='hint'>14 Oct. 2023</Text>

                <Button style={{marginTop: 16}}>Follow</Button>
                <Button status="basic" style={{marginTop: 8}}>Send a message</Button>
            </Card>

        </Modal>
    )
}

export default UserProfileModal

const styles = StyleSheet.create({
    container: {
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