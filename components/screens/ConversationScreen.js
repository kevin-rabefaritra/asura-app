import { Avatar, Button, Divider, Icon, Input, Layout, List, MenuItem, OverflowMenu, Text, useTheme } from "@ui-kitten/components"
import ConversationMessageItem from '../list/ConversationMessageItem';
import React from 'react';
import { ImageBackground, StyleSheet, TextInput, View } from "react-native";
import CustomIconButton from "../basic/CustomIconButton";

const data = new Array(180).fill({
  content: 'Shtosharaka shtashakara Shtosharaka shtashakara Shtosharaka'
});

const UserAvatar = (props) => {
  return (
    <Avatar
      shape='rounded'
      size='medium'
      source={props.source}
      ImageComponent={ImageBackground}
      style={styles.avatar}
    />
  );
}

const AppBar = (props) => {

  const [visible, setVisible] = React.useState(false);

  const onItemSelect = (index) => {
    setVisible(false);
  };

  const renderToggleButton = () => (
    <Button
      style={styles.overflowMenu}
      status='primary'
      size='small'
      onPress={() => setVisible(true)}
      accessoryLeft={<Icon name='more-horizontal' />}
    />
  );

  return (
    <View style={styles.appBarContainer}>
      <Button
        style={styles.backButton}
        appearance='ghost'
        status='primary'
        onPress={props.onBackPressed}
        accessoryLeft={<Icon name='arrow-left' />}
      />
      
      <UserAvatar 
        source={require('../../assets/menja.jpg')}
      />
      <Text style={{flex: 1, textAlign: 'left'}} category='h6'>Kevin Michel</Text>

      <OverflowMenu
        style={styles.overflowMenu}
        anchor={renderToggleButton}
        visible={visible}
        onSelect={onItemSelect}
        onBackdropPress={() => setVisible(false)}>
          
        <MenuItem title='Search' accessoryLeft={<Icon name='search' />}/>
        <MenuItem title='Report user' accessoryLeft={<Icon name='alert-triangle' />}/>

      </OverflowMenu>
    </View>
  );
};

const InputBar = () => {
  return (
    <Layout style={styles.inputContainer}>
      <Input
        style={styles.input}
        placeholder="Type a message"
      />
      <Button 
        style={styles.iconButton}
        accessoryLeft={<Icon name='plus' />}
        appearance='ghost'
        status='primary'
        size='small'
      />
    </Layout>
  );
}

/**
 * Conversation screen
 * Shows the conversation thread between two or more users
 */
const ConversationScreen = (props) => {

  const onCloseScreen = () => {
    props.navigation.goBack();
  }

  const renderItem = ({item, index}) => (
    <ConversationMessageItem 
      content={item.content}
      isMe={index%2===0}
      source={require('../../assets/menja.jpg')}
    />
  );
  const theme = useTheme();
  
  return (
    <Layout style={styles.container}>
      <AppBar onBackPressed={onCloseScreen}/>
      <Divider />
      <List
        style={{backgroundColor: theme['background-basic-color-1']}}
        data={data}
        renderItem={renderItem}
      />
      <Divider />
      <InputBar />
    </Layout>
  )
}

export default ConversationScreen;

const styles = StyleSheet.create({
  appBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  container: {
    flex: 1,
  },
  backButton: {
    width: 48,
    marginHorizontal: 8
  },
  avatar: {
    marginRight: 16
  },
  overflowMenu: {
    marginRight: 16
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  input: {
    flex: 1,
    marginHorizontal: 8
  },
  iconButton: {
    margin: 0,
  },
});