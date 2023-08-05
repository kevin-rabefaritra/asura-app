import { Divider, List, BottomNavigationTab, Layout, Text, Button, Icon, IconRegistry } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import PostItem from '../list/PostItem';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import DefaultStyle from '../DefaultStyle';

const data = new Array(30).fill({
  title: 'Kevin Michel',
  subtitle: '4 minutes ago',
  content: "I was a bit bored this weekend so made a short trip to the moon. 😐 #boredinmoon #boredom",
  thumbnail: "",
  avatar: ""
});

const AppBar = (props) => {
  
  return (
    <View style={styles.appBarContainer}>
      <Text style={[DefaultStyle.heading, {flex: 1, textAlign: 'left'}]}>Explore.</Text>

      <Button
        style={styles.rightButton}
        appearance='ghost'
        status='basic'
        size='small'
        onPress={props.onOpenSearchScreen}
        accessoryLeft={<Icon name='search' />}
      />

      <Button
        style={styles.rightButton}
        appearance='ghost'
        status='primary'
        size='small'
        onPress={onOpenWritePostScreen}
        accessoryLeft={<Icon name='plus-square' />}
      />
    </View>
  );
};

/**
 * Explore Screen
 * This is the home timeline
 */
const ExploreScreen = (props) => {

  const renderItem = ({item, index}) => (
    <PostItem 
      avatar={item.src}
      title={item.title}
      subtitle={item.subtitle}
      thumbnail={item.thumbnail}
      content={item.content}
    />
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

  return (
    <Layout>
      <AppBar onOpenSearchScreen={onOpenSearchScreen} onOpenWritePostScreen={onOpenWritePostScreen}/>
      <Divider />
      <List
        data={data}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
        style={{marginBottom: navBarHeight + 24}}
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
});