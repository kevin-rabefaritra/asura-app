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

const data = new Array(30).fill({
	title: 'Kevin Michel',
	subtitle: '4 minutes ago',
	content: "I was a bit bored this weekend so made a short trip to the moon. 😐 #boredinmoon #boredom",
	thumbnail: "",
	avatar: ""
});

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

		{ 
		props.isSignedIn && 
		<CustomIconButton
			style={styles.rightButton}
			status='primary'
			size='small'
			onPress={onOpenWritePostScreen}
			iconName='plus'
		/>
		}
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
	const [isLoading, setIsLoading] = React.useState(false);
	const [hasLoaded, setHasLoaded] = React.useState(false);
	const isSignedIn = context.user !== null;

	const renderItem = ({item, index}) => (
		<PostItem 
			avatar={item.src}
			title={item.title}
			subtitle={item.subtitle}
			thumbnail={item.thumbnail}
			content={item.content}
			likesCount={item.likesCount} />
  	);

	// Get the height of the navigation bar
	const navBarHeight = useBottomTabBarHeight();

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
	onFetchPosts = () => {
		getPosts(0)
			.then((response) => response.json())
			.then((json) => {
				setData(json.results.map((item) => ({
					title: [item.user_firstname, item.user_lastname].join(' '),
					subtitle: item.created_at,
					content: item.content,
					thumbnail: "",
					avatar: "",
					likesCount: item.likes_count
				})));
			})
			.catch((exception) => {
				console.log(exception);
				if (exception instanceof UserSessionExpiredException) {
                    signOutAndRedirect(context, props.navigation, to="Profile");
				}
			})
			.finally(() => {
				setIsLoading(false);
				setHasLoaded(true);
			});
	}

	if (!hasLoaded && !isLoading) {
		setIsLoading(true);
		onFetchPosts();
	}

	return (
		<Layout style={{flex: 1}}>
			<AppBar 
				onOpenSearchScreen={onOpenSearchScreen} 
				onOpenWritePostScreen={onOpenWritePostScreen}
				isSignedIn={isSignedIn}
			/>
			<Divider />
			{ isLoading ? (
			<View style={DefaultStyle.full}>
				<Spinner status='primary' size='medium'/>
			</View>) : (
			<List
				data={data}
				renderItem={renderItem}
				contentContainerStyle={styles.contentContainer}
				style={{marginBottom: navBarHeight + 24}}
			/> )
			}
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