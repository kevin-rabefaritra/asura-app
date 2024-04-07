import { Text, Avatar, Layout, useTheme, Card, Button, Icon } from '@ui-kitten/components';
import { View, Image, StyleSheet } from 'react-native';
import CustomIconButton from '../basic/CustomIconButton';
import { useState } from 'react';
import { reactToPost } from '../../repositories/PostRepository';
import UserSessionExpiredException from '../../exceptions/UserSessionExpiredException';
import MediaCarousell from '../basic/MediaCarousell';
import CachedAvatar from '../basic/CachedAvatar';

/**
 * Represents a single post item (displayed on the timeline)
 * @param {*} props contains the following attributes:
 * - postUuid {String} the UUID of the Post
 * - title {String} the Post title text
 * - subtitle {String} the Post subtitle text
 * - content {String} the Post content
 * - likesCount {Integer} the number of likes of the Post
 * - userScore {Integer} the score given by the current user (-1, 0, 1)
 * - media {Array<String>} the Post media URLs (can be empty)
 * - avatar {String|null} the URL of the avatar (can be null)
 * 
 * - onMediaPressed {callback} callback to be called when a media item is pressed
 * - onClickShare {callback} callback to be called when the user presses on the Share button
 */
const PostItem = (props) => {
	const [score, setScore] = useState(props.likesCount);
	const [userScore, setUserScore] = useState(props.userScore);
	const [isSendingRequest, setIsSendingRequest] = useState(false); 
	const theme = useTheme();

	const onClickReact = () => {
		if (isSendingRequest) {
			return;
		}

		let _hasReacted = userScore != 0;
		let newScore = _hasReacted ? 0 : 1;

		// Send reaction to server
		setIsSendingRequest(true);
		reactToPost(props.postUuid, newScore)
			.then((response) => {
				// response should be status 201
				setScore(score + (_hasReacted ? -1 : 1));
				setUserScore(newScore);
			})
			.catch((e) => {
				// Failed to send reaction
				if (e instanceof UserSessionExpiredException) {
					
				}
				console.log(e);
			})
			.finally(() => {
				setIsSendingRequest(false);
			});
	};
	
	// Todo: create a caroussel of pictures if there is more than 1 media file
	return (
		<Card style={[styles.container, {backgroundColor: theme['background-basic-color-1']}]}>
			<Layout style={{marginHorizontal: -8}}>
				<View style={styles.header}>
					<CachedAvatar
						imageStyle={[styles.profilePic, {borderColor: theme['color-primary-default']}]}
						uri={props.avatar}
					/>
					<View style={styles.headerText}>
						<Text category='s1'>{props.title}</Text>
						<Text category='s1' appearance='hint' style={{marginTop: 2}}>{props.subtitle}</Text>
					</View>
				</View>
				<Text style={styles.body} category='p1'>{props.content}</Text>
				{
					props.media && props.media.length > 0 && 
					<MediaCarousell
						media={props.media}
						onMediaPressed={props.onMediaPressed}
					/>
				}
				<Layout style={styles.actions}>
					<CustomIconButton 
						appearance='ghost'
						style={{flex:1}}
						status={userScore ? 'primary' : 'basic'}
						textColor={userScore ? theme['color-primary-default'] : null}
						onPress={onClickReact}
						iconName="arrow-up">
						{score}
					</CustomIconButton>
					<CustomIconButton 
						appearance='ghost'
						style={{flex:1}}
						status='basic'
						onPress={() => props.onClickShare(props.postUuid)}
						iconName="copy">
					</CustomIconButton>
				</Layout>
			</Layout>
		</Card>
	);
}

export default PostItem;


const styles = StyleSheet.create({
	container: {
		marginHorizontal: 8,
		marginVertical: 4,
		borderRadius: 4
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	profilePic: {
		marginRight: 10,
		borderRadius: 2,
		borderWidth: 2
	},
	headerText: {
		flex: 1,
	},
	title: {
		fontWeight: 'bold'
	},
	body: {
		marginVertical: 10,
		lineHeight: 22
	},
	postImage: {
		width: '100%',
		borderRadius: 4,
	},
	actions: {
		marginTop: 10,
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginBottom: -6
	}
});