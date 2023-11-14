import { Text, Avatar, Layout, useTheme, Card, Button, Icon } from '@ui-kitten/components';
import { View, Image, StyleSheet, ImageBackground } from 'react-native';
import CustomIconButton from '../basic/CustomIconButton';
import DefaultStyle from '../DefaultStyle';

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
            shape='square'
            size='medium'
            style={[styles.profilePic, {borderColor: theme['color-primary-default']}]}
            source={require('../../assets/menja.jpg')}
            ImageComponent={ImageBackground}
          />
          <View style={styles.headerText}>
            <Text style={DefaultStyle.pixel} category='s1'>{props.title}</Text>
            <Text style={DefaultStyle.pixel} category='s1' appearance='hint'>{props.subtitle}</Text>
          </View>
        </View>
        <Text style={styles.body} category='p1'>{props.content}</Text>
        <Image 
          style={styles.postImage}
          source={require('../../assets/post.jpeg')}
        />
        <Layout style={styles.actions}>
          <CustomIconButton appearance='ghost' style={{flex:1}} status='primary' iconName="heart">18</CustomIconButton>
          <CustomIconButton appearance='ghost' style={{flex:1}} status='basic' iconName="message-circle">2</CustomIconButton>
          <CustomIconButton appearance='ghost' style={{flex:1}} status='basic' iconName="share"></CustomIconButton>
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
    lineHeight: 22,
    fontFamily: 'PixeloidSans',
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