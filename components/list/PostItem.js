import { Text, Avatar, Layout, useTheme, Card, Button, Icon } from '@ui-kitten/components';
import { View, Image, StyleSheet, ImageBackground } from 'react-native';
import CustomIconButton from '../basic/CustomIconButton';
import DefaultStyle from '../DefaultStyle';
import { useState } from 'react';
import { reactToPost } from '../../repositories/PostRepository';
import UserSessionExpiredException from '../../exceptions/UserSessionExpiredException';

/**
 * Represents a single post item (displayed on the timeline)
 */
const PostItem = (props) => {
	const [score, setScore] = useState(props.likesCount);
	const [hasReacted, setHasReacted] = useState(false);
	const [isSendingRequest, setIsSendingRequest] = useState(false); 
	const theme = useTheme();

	const onClickReact = () => {
		if (isSendingRequest) {
			return;
		}

		let _hasReacted = !hasReacted;

		// Send reaction to server
		setIsSendingRequest(true);
		reactToPost(props.postUuid, _hasReacted ? 1 : 0)
			.then((response) => {
				// response should be status 201
				console.log(`[onClickReact] ${response.status}`);
				setScore(score + (_hasReacted ? 1 : -1));
				setHasReacted(_hasReacted);
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
	
	return (
		<Card style={[styles.container, {backgroundColor: theme['background-basic-color-1']}]}>
			<Layout style={{marginHorizontal: -8}}>
				<View style={styles.header}>
					<Avatar
						shape='square'
						size='medium'
						style={[styles.profilePic, {borderColor: theme['color-primary-default']}]}
						source={require('../../assets/menja.jpg')}
						ImageComponent={ImageBackground}
					/>
					<View style={styles.headerText}>
						<Text category='s1'>{props.title}</Text>
						<Text category='s1' appearance='hint' style={{marginTop: 2}}>{props.subtitle}</Text>
					</View>
				</View>
				<Text style={styles.body} category='p1'>{props.content}</Text>
				<Image 
					style={styles.postImage}
					source={require('../../assets/post.jpeg')}
				/>
				<Layout style={styles.actions}>
					<CustomIconButton 
						appearance='ghost'
						style={{flex:1}}
						status={hasReacted ? 'primary' : 'basic'}
						textColor={hasReacted ? theme['color-primary-default'] : null}
						onPress={onClickReact}
						iconName="arrow-up">
						{score}
					</CustomIconButton>
					<CustomIconButton appearance='ghost' style={{flex:1}} status='basic' iconName="copy"></CustomIconButton>
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