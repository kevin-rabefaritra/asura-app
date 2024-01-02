import ExploreScreen from './ExploreScreen';
import ProfileScreen from './ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon, Divider } from '@ui-kitten/components';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <>
  <Divider />
  <BottomNavigation
    appearance='noIndicator'
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab icon={<Icon name='compass'/>}/>
    <BottomNavigationTab icon={<Icon name='user'/>}/>
  </BottomNavigation>
  </>
);

/**
 * MainScreen
 * Contains the navigator (with a BottomNavigation component).
 * 1) Explore
 * This is the timeline view
 * 2) Chat
 * Shows the different conversations with other users / groups
 * 3) Profile
 * Shows the user profile (if they have an account)
 */
const MainScreen = ({props, navigation}) => {

  return (
    <Navigator tabBar={props => <BottomTabBar {...props} />} screenOptions={{headerShown: false}}>
      <Screen name='Explore' component={ExploreScreen} />
      <Screen name='Profile' component={ProfileScreen}/>
    </Navigator>
  );
};

export default MainScreen;