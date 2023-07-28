import { Divider, List, BottomNavigationTab, Layout, Text, Button, Icon, IconRegistry } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import PostItem from '../list/PostItem';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const data = new Array(30).fill({
  title: 'Kevin Michel',
  subtitle: '4 minutes ago',
  content: "I was a bit bored this weekend so made a short trip to the moon.",
  thumbnail: "",
  avatar: ""
});

const AppBar = () => {
  return (
    <View style={styles.appBarContainer}>
      <Text category='h2'>Explore</Text>
    </View>
  );
};

/**
 * Explore Screen
 * This is the home timeline
 */
const ExploreScreen = () => {

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

  return (
    <Layout>
      <AppBar />
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
    padding: 16,
  },
  contentContainer: {
    paddingTop: 4,
    paddingBottom: 4
  }
});