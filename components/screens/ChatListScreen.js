import {  MenuItem, OverflowMenu, Layout, Text, Button, Icon, List, Divider, useTheme } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import UserChatItem from '../list/UserChatItem';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import React from 'react';
import SignInModal from '../modals/SignInModal';
import DefaultStyle from '../DefaultStyle';
import { DefaultContext } from '../default-context';

const data = new Array(30).fill({
  title: 'Weirdo',
  description: 'Hey how are you?',
  src: "pepe.jpg",
  timestamp: '5 min ago'
});

const AppBar = (props) => {

  const [visible, setVisible] = React.useState(false);

  const onItemSelect = (index) => {
    setVisible(false);
  };

  const renderToggleButton = (props) => (
    <Button
      style={styles.rightButton}
      status='primary'
      size='small'
      onPress={() => setVisible(true)}
      accessoryLeft={<Icon name='more-horizontal' />}
    />
  );

  return (
    <View style={styles.appBarContainer}>
      <Text style={[DefaultStyle.heading, {flex: 1, textAlign: 'left'}]}>Chat.</Text>
      <Button
        style={styles.rightButton}
        status='basic'
        appearance='ghost'
        size='small'
        onPress={props.openSearchScreen}
        accessoryLeft={<Icon name='search' />}
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

/**
 * ChatList
 * Shows the different conversation threads with other users.
 * Clicking on a specific thread opens the corresponding conversation
 * Ref. see ConversationScreen
 */
const ChatListScreen = (props) => {

  // We get the theme context to update the theme
  const context = React.useContext(DefaultContext);
  const theme = useTheme();

  // If the user is signed in, we will show the chat list items
  const isSignedIn = context.user !== null;

  /**
   * Opens the selected conversation thread
   */
  openConversationView = () => {
    props.navigation.navigate('Conversation');
  };

  /**
   * Opens the sign up screen
   */
  openSignUpScreen = () => {
    props.navigation.navigate('SignUp');
  }

  /**
   * Opens the search screen
   */
  openSearchScreen = () => {
    props.navigation.navigate('Search');
  }

  const renderItem = ({item, index}) => (
    <UserChatItem 
      title={`${item.title} ${index + 1}`}
      src={`${item.src}`}
      description={item.description}
      timestamp={item.timestamp}
      onClick={openConversationView}
    />
  );

  // Get the height of the navigation bar
  const navBarHeight = useBottomTabBarHeight();

  return (
    <Layout>
      <AppBar openSearchScreen={openSearchScreen}/>
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
          <SignInModal openSignUpScreen={openSignUpScreen} context={context}/>
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