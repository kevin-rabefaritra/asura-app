import { Text, Avatar, Layout, useTheme, Card, Button, Icon } from '@ui-kitten/components';
import { View, Image, StyleSheet, ImageBackground } from 'react-native';

/**
 * Represents a single post item (displayed on the timeline)
 */
const PostItem = (props) => {
  const theme = useTheme();

  return (
    <Card style={[styles.container, {backgroundColor: theme['background-basic-color-1']}]}>
      <Layout style={{marginHorizontal: -8}}>
        <View style={styles.header}>
          <Avatar
            shape='rounded'
            size='medium'
            style={styles.profilePic}
            source={require('../../assets/menja.jpg')}
            ImageComponent={ImageBackground}
          />
          <View style={styles.headerText}>
            <Text style={styles.title} category='s1'>{props.title}</Text>
            <Text category='s1' appearance='hint'>{props.subtitle}</Text>
          </View>
        </View>
        <Text style={styles.body} category='p1'>{props.content}</Text>
        <Image 
          style={styles.postImage}
          source={require('../../assets/post.jpeg')}
        />
        <Layout style={styles.actions}>
          <Button appearance='ghost' style={{flex:1}} status='primary' accessoryLeft={<Icon name="heart"/>}>18</Button>
          <Button appearance='ghost' style={{flex:1}} status='basic' accessoryLeft={<Icon name="message-circle"/>}>2</Button>
          <Button appearance='ghost' style={{flex:1}} status='basic' accessoryLeft={<Icon name="share"/>}></Button>
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
    borderRadius: 10
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    marginRight: 10,
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
    borderRadius: 8,
  },
  actions: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: -6
  }
});