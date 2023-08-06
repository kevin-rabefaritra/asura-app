import { Button, Divider, Icon, Input, Layout, useTheme } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";

const AppBar = (props) => {
    return (
        <View style={styles.appBarContainer}>
            <Button
                style={styles.backButton}
                appearance='ghost'
                status='primary'
                size='small'
                onPress={props.onBackPressed}
                accessoryLeft={<Icon name='arrow-left' />}
            />
            <Input
                style={styles.input}
                placeholder="Search"
            />
        </View>
    );
};

const SearchScreen = (props) => {

    const onCloseScreen = () => {
        props.navigation.goBack();
    }

    const theme = useTheme();

    return (
        <Layout style={styles.container}>
            <AppBar onBackPressed={onCloseScreen}/>
            <Divider />

        </Layout>
    )
}

export default SearchScreen;

const styles = StyleSheet.create({
    appBarContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 8
    },
    container: {
        flex: 1
    },
    backButton: {
        width: 48
    },
    input: {
        flex: 1,
        marginHorizontal: 8
    },
});