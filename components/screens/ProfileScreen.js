import React from 'react';
import { ApplicationProvider, BottomNavigation, MenuItem, Layout, Text, Button, Icon, Menu, useTheme, Card, Avatar, Toggle } from '@ui-kitten/components';
import { StyleSheet, View, ImageBackground, ToastAndroid } from 'react-native';
import { ThemeContext } from '../theme-context';
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

const UserIcon = (props) => (
  <Icon {...props} name='user' />
);

const SecurityIcon = (props) => (
  <Icon {...props} name='shield' />
);

const DarkModeIcon = (props) => (
  <Icon {...props} name='moon' />
);

const LanguageIcon = (props) => (
  <Icon {...props} name='globe' />
);

const LockIcon = (props) => (
  <Icon {...props} name='lock' />
);

const LogoutIcon = (props) => (
  <Icon {...props} name='log-out' />
);

const InfoIcon = (props) => (
  <Icon {...props} name='info' />
);
 
/**
 * Events
 */
const onThemeClicked = (themeContext) => {
  // Apply the new theme
  let newTheme = themeContext.theme === 'light' ? 'dark' : 'light';
  themeContext.applyTheme(newTheme);
  ToastAndroid.show(`Theme successfully set to ${newTheme} mode!`, ToastAndroid.SHORT);
}

const onSignOutClicked = (themeContext) => {
  // set the user to null
  themeContext.updateUser(null);
  ToastAndroid.show(`You have successfully signed out!`, ToastAndroid.SHORT);
}

const ProfileContainer = (props) => {
  const context = props.context;
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const user = context.user;

  return (
    <Layout style={[styles.profileContainer, {backgroundColor: theme['background-basic-color-3']}]}>
      <Card style={styles.profileCard} disabled={true}>
        { 
          user ? (
            <Layout style={styles.headerContainer}>
              <Avatar
                shape='rounded'
                size='giant'
                source={require('../../assets/menja.jpg')}
                ImageComponent={ImageBackground}
                style={styles.userAvatar}
              />
              <Layout style={styles.headerInfoContainer}>
                <Text category='h6'>{user.firstName} {user.lastName}</Text>
                <Text category='h6' appearance='hint'>@{user.username}</Text>
              </Layout>
            </Layout>
          ) : (
            <Layout style={styles.headerContainer}>
              <Avatar
                shape='rounded'
                size='giant'
                source={require('../../assets/menja_guest.jpg')}
                ImageComponent={ImageBackground}
                style={styles.userAvatar}
              />
              <Layout style={styles.headerInfoContainer}>
                <Text category='h6'>Guest</Text>
                <Text category='h6' appearance='hint'>You're not signed in.</Text>
              </Layout>
            </Layout>
          )
        }
        <Menu onSelect={index => setSelectedIndex(index)} style={{marginTop: 16, marginHorizontal: -24}} >
          { user &&
            <>
              <MenuItem
                title='General information'
                accessoryLeft={UserIcon}
                accessoryRight={ForwardIcon}
              />
              <MenuItem
                title='Security'
                accessoryLeft={SecurityIcon}
                accessoryRight={ForwardIcon}
              />
            </>
          }
          <MenuItem
            title='Switch theme'
            accessoryLeft={DarkModeIcon}
            accessoryRight={ForwardIcon}
            onPress={() => onThemeClicked(context)}
          />
          <MenuItem
            title='Language'
            accessoryLeft={LanguageIcon}
            accessoryRight={ForwardIcon}
          />
          <MenuItem
            title='Privacy Policy'
            accessoryLeft={LockIcon}
            accessoryRight={ForwardIcon}
          />
          <MenuItem
            title='About'
            accessoryLeft={InfoIcon}
            accessoryRight={ForwardIcon}
          />
          { user && 
            <MenuItem
              title='Log out'
              accessoryLeft={LogoutIcon}
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
const ProfileScreen = () => {

  // We get the theme context to update the theme
  const themeContext = React.useContext(ThemeContext);

  return (
    <Layout>
      <AppBar />
      <ProfileContainer context={themeContext} />
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
    alignSelf: 'center'
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