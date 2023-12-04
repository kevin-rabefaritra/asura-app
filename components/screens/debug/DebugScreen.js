import { Button, Card, Layout, Text, useTheme } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import DefaultStyle from "../../DefaultStyle";

/**
 * Screen for performing debug operation
 * @param {*} props 
 */

const Footer = (props) => (
    <View {...props}  style={[props.style, styles.footerContainer]}>
    <Button
        style={styles.footerControl}
        size='small'>TEST</Button>
    </View>
);

const DebugScreen = (props) => {
    const theme = useTheme();
    
    return (
        <Layout style={{padding: 16, flex: 1, backgroundColor: theme['background-basic-color-3']}}>
            <Card footer={Footer} style={{backgroundColor: theme['background-basic-color-1']}}>
                <Text style={DefaultStyle.subtitle}>[Debug Server]</Text>
                <View style={{height: 8}}/>
                <Text>(1) Server access</Text>
                <Text>(2) Access token</Text>
                <Text>(3) Refresh token</Text>
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