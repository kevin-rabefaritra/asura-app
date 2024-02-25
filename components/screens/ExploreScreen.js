import { Divider, List, BottomNavigationTab, Layout, Text, Button, Icon, IconRegistry, Spinner, useTheme } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import PostItem from '../list/PostItem';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import DefaultStyle from '../DefaultStyle';
import React, { useEffect } from 'react';
import { DefaultContext } from '../default-context';
import CustomIconButton from '../basic/CustomIconButton';
import { getPosts } from '../../repositories/PostRepository';
import UserSessionExpiredException from '../../exceptions/UserSessionExpiredException';
import { signOutAndRedirect } from '../../repositories/UserRepository';

const AppBar = (props) => {
	
	const theme = useTheme();
	
	return (
    <View style={[styles.appBarContainer, { backgroundColor: theme['background-basic-color-1'] }]}>
		<Text style={[DefaultStyle.heading, {flex: 1, textAlign: 'left'}]}>Explore.</Text>

		<CustomIconButton
			style={styles.rightButton}
			appearance='ghost'
			status='basic'
			size='small'
			onPress={props.onOpenSearchScreen}
			iconName='search'
		/>
		
    </View>
  );
};

/**
 * Explore Screen
 * This is the home timeline
 */
const ExploreScreen = (props) => {

	const context = React.useContext(DefaultContext);
	const theme = useTheme();

	const [data, setData] = React.useState(null);
	const [isLoading, setIsLoading] = React.useState(true);
	const [hasMoar, setHasMoar] = React.useState(true);
	const [currentPage, setCurrentPage] = React.useState(1);
	const isSignedIn = context.user !== null;

	const renderItem = ({item, index}) => {
		const content = (<PostItem 
			avatar={item.src}
			title={item.title}
			subtitle={item.subtitle}
			thumbnail={item.thumbnail}
			content={item.content}
			likesCount={item.likesCount}
			postUuid={item.uuid}
			userScore={item.userScore}
			media={item.media}/>
		);

		return (index === data.length - 1 && hasMoar) ? 
			<>
				{content}
				<Text style={{textAlign: 'center', padding: 16}}>Loading moar...</Text>
			</> : content;
	}

	/**
	 * Opens the search screen
	 */
	onOpenSearchScreen = () => {
		props.navigation.navigate('Search');
	}

	// Writes a post
	onOpenWritePostScreen = () => {
		props.navigation.navigate('WritePost')
	}

	// Fetch posts
	onFetchPosts = async (reloadAll = false) => {
		let page = reloadAll ? 1 : currentPage;
		try {
			await new Promise(r => setTimeout(r, 1000));
			let posts = await getPosts(page);
			let json = await posts.json();
			let items = json.results.map((item) => ({
				uuid: item.uuid,
				title: [item.user_firstname, item.user_lastname].join(' '),
				subtitle: item.created_at,
				content: item.content,
				thumbnail: "",
				avatar: "",
				likesCount: item.likes_count,
				userScore: item.user_score,
				media: item.media.map((item) => item.file)
			}));

			setHasMoar(Boolean(json.next));
			if (page === 1) {
				// set existing array with fetched items
				setData(items);
			}
			else {
				// append fetched items to existing array
				let updatedData = [...data, ...items];
				setData(updatedData);
			}

			// increment page no. if there are more items
			if (json.next) {
				page += 1;
			}
			setCurrentPage(page);
		}
		catch(exception) {
			console.log(exception);
			if (exception instanceof UserSessionExpiredException) {
				signOutAndRedirect(context, props.navigation, to="Profile", redirectInstead=true);
			}
		}
		finally {
			setIsLoading(false);
		}
	}

	return (
		<Layout style={{flex: 1, backgroundColor: theme['background-basic-color-3']}}>
			<AppBar 
				onOpenSearchScreen={onOpenSearchScreen} 
				onOpenWritePostScreen={onOpenWritePostScreen}
				isSignedIn={isSignedIn}
			/>
			<Divider />
			<List
				data={data}
				onRefresh={() => onFetchPosts(true)}
				onEndReached={() => hasMoar && onFetchPosts()}
				refreshing={isLoading}
				renderItem={renderItem}
				contentContainerStyle={styles.contentContainer}
				style={{backgroundColor: theme['background-basic-color-3']}}
			/>
		</Layout>
	);
}

	export default ExploreScreen;

	const styles = StyleSheet.create({
		appBarContainer: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			padding: 16,
		},
		contentContainer: {
			paddingTop: 4,
			paddingBottom: 4
		},
		rightButton: {
			marginLeft: 8
		},
	}
);