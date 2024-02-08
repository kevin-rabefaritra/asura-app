import { Button, Divider, Icon, Input, Layout, List, Modal, ProgressBar, Text, useTheme } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, View } from "react-native";
import { fetchProfileInfo, search } from "../../repositories/UserRepository";
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
                value={props.text}
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

    // Used for loading and pagination
    const [isLoading, setIsLoading] = React.useState(false);
	const [hasMoar, setHasMoar] = React.useState(true);
	const [currentPage, setCurrentPage] = React.useState(1);

    const resultsListRef = React.useRef();

    // User profile modal used states
    const [showModal, setShowModal] = React.useState(false);
    const [modalUser, setModalUser] = React.useState(null);

    const onCloseScreen = () => {
        props.navigation.goBack();
    }

    /**
     * Used to fetch search results
     * @param {Boolean} fromStart 
     */
    const fetchSearchResults = async (_keyword = keyword, fromStart = true) => {
        // If fromStart, scroll to the top of the list
        if (fromStart) {
            // setting isLoading to true displays the loading animation, we only
            // need it when the list is empty. when there are results, we have
            // the "Loading more" text.
            setIsLoading(true);
            resultsListRef.current.scrollToOffset({animated: true, offset: 0});
        }

        let page = fromStart ? 1 : currentPage;
        try {
            const response = await search(_keyword, page);
            if (response.status === 200) {
                const json = await response.json();
                const items = page === 1 ? json.results : [...data, ...json.results];
                setData(items);
                setHasMoar(Boolean(json.next_page));
                if (json.next_page) {
                    page += 1;
                }
                setCurrentPage(page);
            }
            else {
                // request error (404) - no results
            }
        }
        catch(error) {
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
    }

    /**
     * Render search items into the List
     */
    const renderSearchItem = ({item, index}) => {
        const content = (item.content) ?
            (<PostItem 
                avatar={item.src}
                title={`${item.user_firstname} ${item.user_lastname}`}
                subtitle={item.created_at}
                thumbnail={item.thumbnail}
                content={item.content}
                likesCount={item.likes_count}
                postUuid={item.uuid}
                userScore={item.user_score} />
            ) : (<UserSearchItem
                icon={item.uuid}
                title={`${item.first_name} ${item.last_name}`}
                subtitle={item.username}
                onPress={() => loadUserProfileInfo(item.uuid)} />
            );
        
        return (index === data.length - 1 && hasMoar) ? (<>
            {content}
            <Text style={{textAlign: 'center', padding: 16}}>Loading moar...</Text>
        </>) : content;
    }

    /**
     * Displays a user profile info in a modal
     * @param {String} uuid 
     */
    const loadUserProfileInfo = async (uuid) => {
        setShowModal(true);
        try {
            let response = await fetchProfileInfo(uuid);
            if (response.status === 200) {
                let json = await response.json();
                setModalUser(json);
            }
            else {
                // 
            }
        }
        catch(error) {
            console.log(error);
        }
    };

    /**
     * Dismisses the user profile modal
     */
    const dismissUserProfileModal = () => {
        setShowModal(false);
        setModalUser(null);
    }

    /**
     * Load all posts of a given user, calling this function does the following
     * actions:
     * 1) Dismiss the user profile modal
     * 2) Set the search input to posts:{modal user username}
     * 3) Perform a new search
     */
    const searchUserPosts = () => {
        let _keyword = `posts:${modalUser.username}`;
        dismissUserProfileModal();
        setKeyword(_keyword);
        fetchSearchResults(_keyword, true);
    }

    const theme = useTheme();

    return (
        <Layout style={[styles.container, {backgroundColor: theme['background-basic-color-3']}]}>
            <AppBar 
                text={keyword}
                onChangeText={setKeyword}
                onBackPressed={onCloseScreen}
                onValidateSearch={fetchSearchResults}
                backgroundColor={theme['background-basic-color-1']}
            />
            <Divider />
            
            <List
                ref={resultsListRef}
                data={data}
                renderItem={renderSearchItem}
                onRefresh={() => {}}
                onEndReached={() => hasMoar && fetchSearchResults(keyword, false)}
                refreshing={isLoading}
            />

            <UserProfileModal 
                visible={showModal}
                navigation={props.navigation}
                user={modalUser}
                onBackdropPress={dismissUserProfileModal}
                onActionPressed={searchUserPosts} />

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