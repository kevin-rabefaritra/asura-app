import { StyleSheet, ImageBackground, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Avatar, Layout, ListItem, Text } from "@ui-kitten/components";

const UserAvatar = (props) => {
  return (
    <Avatar
      shape='rounded'
      size='medium'
      source={props.source}
      ImageComponent={ImageBackground}
    />
  );
}

/**
 * Represents a chat item listed in the chat list
 * We use it to display the last message per chat
 */
const UserChatItem = (props) => {
  
  return (
    <TouchableOpacity onPress={props.onclick} >
      <Layout style={styles.container}>
        <UserAvatar
          source={require('../../assets/pepe.jpg')}
        />
        <Layout style={styles.contentContainer}>
          <Text category='p1'>{props.title}</Text>
          <Text category='p1' appearance='hint'>{props.description}</Text>
        </Layout>
        <Text category='c1' appearance='hint' style={styles.timestamp}>{props.timestamp}</Text>
      </Layout>
    </TouchableOpacity>
  )
};

export default UserChatItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
  },
  contentContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'space-between',
  },
  timestamp: {
    textAlign: 'right',
  },
});