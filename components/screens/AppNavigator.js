import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './MainScreen';
import ConversationScreen from './ConversationScreen';
import MainStatusBar from '../basic/MainStatusBar';
import SignUpScreen from './SignUpScreen';
import SearchScreen from './SearchScreen';
import WritePostScreen from './WritePostScreen';

const { Navigator, Screen } = createNativeStackNavigator();

/**
 * App main navigator, it consists on 3 screens:
 *  (1) Main screen: consists on the main content of the app.
 * It includes the BottomNavigation menu and its different pages.
 *  (2) Conversation screen: used to show a conversation thread between
 * two users / groups.
 *  (3) Sign up: used for new users who want to create an account
 */
const AppNavigator = () => (
  <NavigationContainer>
    <Navigator screenOptions={{ header: () => (<MainStatusBar />), animation: 'fade' }} >
      <Screen name='Main' component={MainScreen} />
      <Screen name='Conversation' component={ConversationScreen} />
      <Screen name='SignUp' component={SignUpScreen} />
      <Screen name='Search' component={SearchScreen} />
      <Screen name='WritePost' component={WritePostScreen} />
    </Navigator>
  </NavigationContainer>
)

export default AppNavigator; 