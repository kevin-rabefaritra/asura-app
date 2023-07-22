import {  MenuItem, OverflowMenu, Layout, Text, Button, Icon, IconRegistry, List, ListItem, Divider, TopNavigation, TopNavigationAction, useTheme } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import UserChatItem from '../list/UserChatItem';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React from 'react';
import SignInModal from '../modals/SignInModal';

const data = new Array(30).fill({
  title: 'Item',
  description: 'Hey how are you?',
  src: "menja.png",
  timestamp: '5 min ago'
});

const AppBar = () => {

  const [visible, setVisible] = React.useState(false);

  const onItemSelect = (index) => {
    setVisible(false);
  };

  const renderToggleButton = () => (
    <Button
      style={styles.rightButton}
      status='primary'
      size='small'
      onPress={() => setVisible(true)}
      accessoryLeft={<Icon name='more-horizontal'/>}
    />
  );

  return (
    <View style={styles.appBarContainer}>
      <Text style={{flex: 1, textAlign: 'left'}} category='h2'>Chat</Text>
      <Button
        style={styles.rightButton}
        status='primary'
        size='small'
        accessoryLeft={<Icon name='search'/>}
      />

      <OverflowMenu
        anchor={renderToggleButton}
        visible={visible}
        onSelect={onItemSelect}
        onBackdropPress={() => setVisible(false)}>
          
        <MenuItem title='Add contact' accessoryLeft={<Icon name='user-plus' />}/>
        <MenuItem title='Create group' accessoryLeft={<Icon name='users' />}/>

      </OverflowMenu>
    </View>
  );
};

const ChatListScreen = (props) => {
  const theme = useTheme();

  onOpenConversation = () => {
    props.navigation.navigate('Conversation');
  };

  onOpenSignUpScreen = () => {
    props.navigation.navigate('SignUp');
  }

  const renderItem = ({item, index}) => (
    <UserChatItem 
      title={`${item.title} ${index + 1}`}
      src={`${item.src}`}
      description={item.description}
      timestamp={item.timestamp}
      onclick={onOpenConversation}
    />
  );

  // Get the height of the navigation bar
  const navBarHeight = useBottomTabBarHeight();
  const isSignedIn = false;

  return (
    <Layout>
      <AppBar />
      <Divider />
      {isSignedIn &&
        <List
          data={data}
          renderItem={renderItem}
          ItemSeparatorComponent={Divider}
          style={{marginBottom: navBarHeight + 24}}
        />
      }
      {!isSignedIn && 
        <Layout style={[styles.content, {backgroundColor: theme['background-basic-color-3']}]}>
          <SignInModal onOpenSignUpScreen={onOpenSignUpScreen}/>
        </Layout>
      }
    </Layout>
  );
};

export default ChatListScreen;

const styles = StyleSheet.create({
  appBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  rightButton: {
    marginLeft: 8
  },
  content: {
    height: '100%',
    padding: 16
  }
});