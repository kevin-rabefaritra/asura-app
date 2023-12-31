import { Avatar, Layout, Text, useTheme } from "@ui-kitten/components";
import { ImageBackground, StyleSheet } from "react-native";

/**
 * Represents a individual conversation message item
 * The item is divided into two categories:
 * 1. me: message has been sent by the connected user
 * 2. others: message has been sent by another user
 */
const ConversationMessageItem = (props) => {
  const theme = useTheme();

  return (
    <Layout 
      level={props.isMe ? '3' : '2'}
      style={props.isMe ? styles.messageBubbleRight : styles.messageBubble}
    >
      <Avatar
        shape='square'
        size='small'
        source={props.source}
        ImageComponent={ImageBackground}
        style={[styles.avatar, {borderColor: theme['color-primary-disabled']}]}
      />
      <Text style={{textAlign: props.isMe ? 'right' : 'left', flex: 1, flexWrap: 'wrap'}}>
        {props.content}
      </Text>
    </Layout>
  );
}

export default ConversationMessageItem;

const styles = StyleSheet.create({
  messageBubble: {
    padding: 16,
    flexDirection: 'row',
    gap: 16
  },
  messageBubbleRight: {
    padding: 16,
    flexDirection: 'row-reverse',
    gap: 16
  },
  avatar: {
    borderWidth: 2,
    borderRadius: 2
  }
});