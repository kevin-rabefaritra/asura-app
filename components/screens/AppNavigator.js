import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './MainScreen';
import ConversationScreen from './ConversationScreen';
import MainStatusBar from '../basic/MainStatusBar';
import SignUpScreen from './SignUpScreen';

const { Navigator, Screen } = createNativeStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Navigator screenOptions={{ header: () => (<MainStatusBar />)}}>
      <Screen name='Main' component={MainScreen} />
      <Screen name='Conversation' component={ConversationScreen} />
      <Screen name='SignUp' component={SignUpScreen} />
    </Navigator>
  </NavigationContainer>
)

export default AppNavigator; 