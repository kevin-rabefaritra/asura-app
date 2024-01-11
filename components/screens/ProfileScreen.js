import React from 'react';
import { MenuItem, Layout, Text, Icon, Menu, useTheme, Card, Avatar } from '@ui-kitten/components';
import { StyleSheet, View, ImageBackground, ToastAndroid, TouchableOpacity } from 'react-native';
import { DefaultContext } from '../default-context';
import DefaultStyle from '../DefaultStyle';


const AppBar = () => {
  return (
    <View style={styles.appBarContainer}>
      <Text style={DefaultStyle.heading}>Le me.</Text>
    </View>
  );
};

/**
 * Icons
 */

const ForwardIcon = (props) => (
  <Icon {...props} name='arrow-right' />
);
 
/**
 * Events
 */
const onThemeClicked = (context) => {
  // Apply the new theme
  let newTheme = context.theme === 'light' ? 'dark' : 'light';
  context.applyTheme(newTheme);
  ToastAndroid.show(`Theme successfully set to ${newTheme} mode!`, ToastAndroid.SHORT);
}

const onSignOutClicked = (context) => {
  // set the user to null
  context.updateUser(null);
  ToastAndroid.show(`You have successfully signed out!`, ToastAndroid.SHORT);
}

const ProfileContainer = (props) => {
  const context = props.context;
  const theme = useTheme();
  const navigation = props.navigation;
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const user = context.user;

  return (
    <Layout style={[styles.profileContainer, {backgroundColor: theme['background-basic-color-3']}]}>
      <Card style={styles.profileCard} disabled={true}>
        { 
          user ? (
            <Layout style={styles.headerContainer}>
              <Avatar
                shape='square'
                size='giant'
                source={require('../../assets/menja.jpg')}
                ImageComponent={ImageBackground}
                style={[styles.userAvatar, {borderColor: theme['color-primary-default']}]}
              />
              <Layout style={styles.headerInfoContainer}>
                <Text>{user.firstName} {user.lastName}</Text>
                <Text appearance='hint' style={{marginTop: 4}}>@{user.username}</Text>
              </Layout>
            </Layout>
          ) : (
            <TouchableOpacity style={styles.headerContainer} onPress={() => {props.navigation.navigate('SignIn')}}>
              <Avatar
                shape='rounded'
                size='giant'
                source={require('../../assets/menja_guest.jpg')}
                ImageComponent={ImageBackground}
                style={styles.userAvatar}
              />
              <Layout style={styles.headerInfoContainer}>
                <Text category='h6'>Guest</Text>
                <Text category='p1' appearance='hint' style={{ marginTop: 2 }}>You're not signed in.</Text>
              </Layout>
            </TouchableOpacity>
          )
        }
        <Menu onSelect={index => setSelectedIndex(index)} style={{marginTop: 16, marginHorizontal: -24}} >
          { user &&
            <>
              <MenuItem
                title='General information'
                accessoryLeft={<Icon {...props} name='user' />}
                accessoryRight={ForwardIcon}
                onPress={() => {props.navigation.navigate('GeneralInfo')}}
              />
              <MenuItem
                title='Security'
                accessoryLeft={<Icon {...props} name='shield' />}
                accessoryRight={ForwardIcon}
                onPress={() => {props.navigation.navigate('Security')}}
              />
            </>
          }
          <MenuItem
            title='Switch theme'
            accessoryLeft={<Icon {...props} name='moon' />}
            accessoryRight={ForwardIcon}
            onPress={() => onThemeClicked(context)}
          />
          <MenuItem
            title='Language'
            accessoryLeft={<Icon {...props} name='globe' />}
            accessoryRight={ForwardIcon}
          />
          <MenuItem
            title='Privacy Policy'
            accessoryLeft={<Icon {...props} name='lock' />}
            accessoryRight={ForwardIcon}
          />
          <MenuItem
            title='About'
            accessoryLeft={<Icon {...props} name='info' />}
            accessoryRight={ForwardIcon}
            onLongPress={() => {props.navigation.navigate('Debug')}}
          />
          { user && 
            <MenuItem
              title='Log out'
              accessoryLeft={<Icon {...props} name='log-out' />}
              accessoryRight={ForwardIcon}
              onPress={() => onSignOutClicked(context)}
            />
          }
        </Menu>
      </Card>
    </Layout>
  );
};

/**
 * Profile screen
 * Shows the user profile, where the user can set their preferences
 * and other settings.
 */
const ProfileScreen = (props) => {

  // We get the theme context to update the theme
  const context = React.useContext(DefaultContext);

  return (
    <Layout>
      <AppBar />
      <ProfileContainer context={context} navigation={props.navigation}/>
    </Layout>
  )
}

export default ProfileScreen;

const styles = StyleSheet.create({
  appBarContainer: {
    padding: 16,
  },
  profileContainer: {
    padding: 16,
    flexDirection: 'column',
    height: '100%'
  },
  profileCard: {
    margin: 16,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  userAvatar: {
    alignSelf: 'center',
    borderRadius: 4,
    borderWidth: 2
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  headerInfoContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'space-between',
    alignSelf: 'center'
  },
  text: {
    alignSelf: 'center'
  }
});