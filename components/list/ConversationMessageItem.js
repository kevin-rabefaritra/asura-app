import { Avatar, Card, Layout, Text, useStyleSheet } from "@ui-kitten/components";
import { ImageBackground, StyleSheet } from "react-native";

const ConversationMessageItem = (props) => {
  return (
    <Layout 
      level={props.isMe ? '3' : '2'}
      style={props.isMe ? styles.messageBubbleRight : styles.messageBubble}
    >
      <Avatar
        shape='rounded'
        size='small'
        source={props.source}
        ImageComponent={ImageBackground}
        style={styles.avatar}
      />
      <Text style={{textAlign: props.isMe ? 'right' : 'left'}}>
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
  }
});