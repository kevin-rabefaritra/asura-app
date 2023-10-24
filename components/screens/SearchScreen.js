import { Button, Divider, Icon, Input, Layout, List, useTheme } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, View } from "react-native";
import { search } from "../../repositories/UserRepository";
import { BASE_URI, TOKEN, getPreference } from "../services/PreferenceServices";
import SearchItem from "../list/SearchItem";

const data = new Array(5).fill({
    uuid: '1991911-3939939-939393',
    first_name: 'Kevin',
    last_name: "Michel",
    username: 'kevin',
    email: "kevin@gmail.com"
});

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
    const [data, setData] = React.useState([]);

    const onCloseScreen = () => {
        props.navigation.goBack();
    }

    const onValidateSearch = async () => {
        // send request using keyword
        setIsLoading(true);
        try {
            const token = await getPreference(TOKEN);
            const response = await search(`${BASE_URI}/users/search/`, token, keyword);
            setIsLoading(false);
            if (response.status == 200) {
                const json = await response.json();
                setData(json);
            }
            else {
                // request error (404)
            }
        }
        catch(error) {
            // Todo: catch errors
            setIsLoading(false);
            console.log(error);
        }
    }

    const renderSearchItem = ({item, index}) => {
        return (
            <SearchItem
                title={item.username}
                icon={item.uuid}
                subtitle={`${item.first_name} ${item.last_name}`}
                onClick={() => {}}
            />
        )
    }

    const theme = useTheme();

    return (
        <Layout style={styles.container}>
            <AppBar onChangeText={(value) => setKeyword(value)} onBackPressed={onCloseScreen} onValidateSearch={onValidateSearch}/>
            <Divider />
            <List
                data={data}
                renderItem={renderSearchItem}
                ItemSeparatorComponent={Divider}
            />
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