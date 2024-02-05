import { Button, Divider, Icon, Input, Layout, List, Modal, ProgressBar, Text, useTheme } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, View } from "react-native";
import { search } from "../../repositories/UserRepository";
import UserSearchItem from "../list/UserSearchItem";
import UserProfileModal from "../modals/UserProfileModal";
import CustomIconButton from "../basic/CustomIconButton";
import PostItem from "../list/PostItem";

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
                onChangeText={props.onChangeText}
                multiline={false}
                onSubmitEditing={() => props.onValidateSearch()}
            />
        </View>
    );
};

const SearchScreen = (props) => {

    const [keyword, setKeyword] = React.useState(null);
    const [data, setData] = React.useState([]);

    // Used to display the progress bar under the search bar
    const [progress, setProgress] = React.useState(0);

    const [showModal, setShowModal] = React.useState(false);

    const onCloseScreen = () => {
        props.navigation.goBack();
    }

    const onValidateSearch = async () => {
        // send request using keyword
        setProgress(.5);
        try {
            const response = await search(keyword);
            setProgress(1);
            if (response.status == 200) {
                const json = await response.json();
                setData(json.results);
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
        }
    }

    const renderSearchItem = ({item, index}) => {
        if (item.content) {
            return (<PostItem 
                avatar={item.src}
                title={`${item.user_firstname} ${item.user_lastname}`}
                subtitle={item.user_username}
                thumbnail={item.thumbnail}
                content={item.content}
                likesCount={item.likes_count}
                postUuid={item.uuid}
                userScore={item.user_score} />
            );
        }
        else {
            return (<UserSearchItem
                icon={item.uuid}
                title={`${item.first_name} ${item.last_name}`}
                subtitle={item.username}
                onClick={() => setShowModal(true)} />
            );
        }
    }

    const theme = useTheme();

    return (
        <Layout style={[styles.container, {backgroundColor: theme['background-basic-color-3']}]}>
            <AppBar 
                onChangeText={setKeyword}
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
                />
            }

            <UserProfileModal 
                visible={showModal}
                navigation={props.navigation}
                onBackdropPress={() => setShowModal(false)} />

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