import ExploreScreen from './ExploreScreen';
import ChatListScreen from './ChatListScreen';
import ProfileScreen from './ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon, Divider } from '@ui-kitten/components';
import MainStatusBar from '../basic/MainStatusBar';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <>
  <Divider />
  <BottomNavigation
    appearance='noIndicator'
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab icon={<Icon name='compass'/>}/>
    <BottomNavigationTab icon={<Icon name='message-circle'/>}/>
    <BottomNavigationTab icon={<Icon name='user'/>}/>
  </BottomNavigation>
  </>
);

const MainScreen = ({props, navigation}) => {

  return (
    <Navigator tabBar={props => <BottomTabBar {...props} />} screenOptions={{headerShown: false}}>
      <Screen name='Explore' component={ExploreScreen} />
      <Screen name='Chat' component={ChatListScreen}/>
      <Screen name='Profile' component={ProfileScreen}/>
    </Navigator>
  );
};

export default MainScreen;