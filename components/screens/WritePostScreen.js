import { Button, Divider, Icon, Text, Layout, Input } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import DefaultStyle from "../DefaultStyle";
import CustomIconButton from "../basic/CustomIconButton";

const AppBar = (props) => {
    return (
        <View style={styles.appBarContainer}>
            <Text style={[DefaultStyle.heading, {flex: 1, textAlign: 'left'}]}>Write history.</Text>
            <Button
                style={ { marginRight: 8} }
                appearance='ghost'
                status='basic'
                size='small'
                onPress={props.onBackPressed}
                children={() => (<Text>CANCEL</Text>)}>
            </Button>
            <CustomIconButton
                status='primary'
                size='small'
                iconName='check' />
        </View>
    );
};

/**
 * Write Post screen
 * v0.1 - Title (optional) + body
 * @param {*} props 
 * @returns 
 */
const WritePostScreen = (props) => {

    const onCloseScreen = () => {
        props.navigation.goBack();
    }

    return (
        <Layout style={styles.container}>
            <AppBar onBackPressed={onCloseScreen}/>
            <Divider />
            <Layout style={styles.body}>
                <Input label="Title (optional)" maxLength={250} />
                <Input 
                    multiline={true}
                    textStyle={ {minHeight: 128, textAlignVertical: 'top', paddingVertical: 8} }
                    placeholder="Write history here.." />
            </Layout>
        </Layout>
    )
}

export default WritePostScreen;

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
    }
});