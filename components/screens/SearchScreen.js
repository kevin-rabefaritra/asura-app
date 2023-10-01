import { Button, Divider, Icon, Input, Layout, useTheme } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, View } from "react-native";
import { search } from "../../repositories/UserRepository";
import { BASE_URI, TOKEN, getPreference } from "../services/PreferenceServices";

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
                onChangeText={(value) => props.onChangeText(value)}
                multiline={false}
                onSubmitEditing={() => props.onValidateSearch()}
            />
        </View>
    );
};

const SearchScreen = (props) => {

    const [keyword, setKeyword] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    const onCloseScreen = () => {
        props.navigation.goBack();
    }

    const onValidateSearch = async () => {
        // send request using keyword
        setIsLoading(true);
        try {
            const token = await getPreference(TOKEN);
            const response = search(`${BASE_URI}/search/`, token, keyword);
            if (response.status == 200) {
                
            }
            else {
                // request error
            }
        }
        catch(error) {
            // Todo: catch errors
        }
    }

    const theme = useTheme();

    return (
        <Layout style={styles.container}>
            <AppBar onChangeText={(value) => setKeyword(value)} onBackPressed={onCloseScreen} onValidateSearch={onValidateSearch}/>
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