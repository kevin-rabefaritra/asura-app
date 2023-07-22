import { Divider, List, BottomNavigationTab, Layout, Text, Button, Icon, IconRegistry } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import PostItem from '../list/PostItem';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const data = new Array(30).fill({
  title: 'Kevin Rabefaritra',
  subtitle: '4 minutes ago',
  content: "A bit bored this weekend so I went to the USA.",
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