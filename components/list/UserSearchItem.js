import { Avatar, Card, Icon, Layout, Text, useTheme } from "@ui-kitten/components";
import CachedAvatar from "../basic/CachedAvatar";

const { StyleSheet, ImageBackground, TouchableOpacity } = require("react-native")

const UserSearchItem = (props) => {
	const theme = useTheme();
	return (
		<TouchableOpacity style={styles.container} onPress={props.onPress}>
		<Card disabled={true}>
			<Layout style={styles.cardContainer}>
				<CachedAvatar
					imageStyle={[styles.profilePic, {borderColor: theme['color-primary-default']}]}
					uri={props.avatar}
				/>
				<Layout style={styles.contentContainer}>
					<Text category='p1'>{props.title}</Text>
					<Text category='p1' appearance='hint' style={{marginTop: 4}}>{props.subtitle}</Text>
				</Layout>
			</Layout>
		</Card>
		</TouchableOpacity>
	)
}

export default UserSearchItem;

const styles = StyleSheet.create({
    container: {
		marginHorizontal: 8,
		marginVertical: 4,
		borderRadius: 4
    },
    cardContainer: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		marginHorizontal: -8
    },
    contentContainer: {
		flex: 1,
		marginLeft: 10,
		justifyContent: 'space-between',
		alignSelf: 'center'
    },
	profilePic: {
		borderRadius: 2,
		borderWidth: 2
	},
});