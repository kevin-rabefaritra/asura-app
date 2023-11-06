import { Button, Divider, Icon, Input, Layout, List, Modal, ProgressBar, Text, useTheme } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, View } from "react-native";
import { search } from "../../repositories/UserRepository";
import { BASE_URI, TOKEN, getPreference } from "../services/PreferenceServices";
import SearchItem from "../list/SearchItem";
import UserProfileModal from "../modals/UserProfileModal";
import CustomIconButton from "../basic/CustomIconButton";

const test_data = new Array(5).fill({
    uuid: '1991911-3939939-939393',
    first_name: 'Kevin',
    last_name: 'Michel',
    username: 'kevin',
    email: 'kevin@gmail.com'
});

const AppBar = (props) => {
    return (
        <View style={styles.appBarContainer} backgroundColor={props.backgroundColor}>
            <CustomIconButton
                style={styles.backButton}
                appearance='ghost'
                status='primary'
                size='small'
                onPress={props.onBackPressed}
                iconName='arrow-left'
            />
            <Input
                style={styles.input}
                placeholder='Search'
                onChangeText={(value) => props.onChangeText(value)}
                multiline={false}
                onSubmitEditing={() => props.onValidateSearch()}
            />
        </View>
    );
};

const SearchScreen = (props) => {

    const [keyword, setKeyword] = React.useState(null);
    const [data, setData] = React.useState(test_data);

    // Used to display the progress bar under the search bar
    const [progress, setProgress] = React.useState(0);

    // Used to display search results information (such as "No result(s)")
    const [isSearching, setIsSearching] = React.useState(false);

    const [showModal, setShowModal] = React.useState(false);

    const onCloseScreen = () => {
        props.navigation.goBack();
    }

    const onValidateSearch = async () => {
        // send request using keyword
        setProgress(.5);
        try {
            const token = await getPreference(TOKEN);
            const response = await search(`${BASE_URI}/users/search/`, token, keyword);
            setProgress(1);
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
            setProgress(1);
            console.log(error);
        }
        finally {
            setProgress(0);
            setIsSearching(true);
        }
    }

    const renderSearchItem = ({item, index}) => {
        return (
            <SearchItem
                title={item.username}
                icon={item.uuid}
                subtitle={`${item.first_name} ${item.last_name}`}
                onClick={() => setShowModal(true)}
            />
        )
    }

    // Opens a conversation view (used by UserProfileModal)
    const openConversationView = () => {
        // dismiss the modal
        setShowModal(false);

        // open the conversation view
        props.navigation.navigate('Conversation');
    };

    const theme = useTheme();

    return (
        <Layout style={[styles.container, {backgroundColor: theme['background-basic-color-3']}]}>
            <AppBar 
                onChangeText={(value) => setKeyword(value)}
                onBackPressed={onCloseScreen}
                onValidateSearch={onValidateSearch}
                backgroundColor={theme['background-basic-color-1']}
            />

            { 
                (progress > 0) &&
                <ProgressBar progress={progress} />
            }
            <Divider />
            {
                (data.length > 0) &&
                <List
                    data={data}
                    renderItem={renderSearchItem}
                    ItemSeparatorComponent={Divider}
                />
            }
            {
                (data.length == 0) && isSearching &&
                <Text appearance='hint' style={{margin: 16, textAlign: 'center'}}>No result(s) found.</Text>
            }

            <UserProfileModal 
                visible={showModal}
                navigation={props.navigation}
                onBackdropPress={() => setShowModal(false)}
                onOpenConversationView={openConversationView} />

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
    }
});