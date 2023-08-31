import { Button, Card, Divider, Input, Layout, Text, useTheme } from "@ui-kitten/components";
import { Keyboard, StyleSheet } from "react-native";
import DefaultStyle from "../DefaultStyle";
import React from "react";
import { PASSWORD_MIN_LENGTH, USERNAME_MIN_LENGTH } from "../screens/SignUpScreen";
import { sayHello, signIn } from "../../repositories/UserRepository";
import { BASE_URI, TOKEN, USERNAME, UUID, NAME, EMAIL, savePreference } from "../services/PreferenceServices";

/**
 * Sign up modal dialog
 * For the user to sign in (provided they already have an account)
 */

const SignInModal = (props) => {
  const theme = useTheme();

  const [signInError, setSignInError] = React.useState("")

  // Username / password fields
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [isSigningIn, setIsSigningIn] = React.useState(false)

  // on sign up click
  const onSignInClick = async () => {
    if (username.trim().length < USERNAME_MIN_LENGTH || password.trim().length < PASSWORD_MIN_LENGTH) {
      return
    }
    // Set the button text to ongoing
    setIsSigningIn(true);

    // Dismiss the keyboard
    Keyboard.dismiss();
     
    // Perform request
    const response = await signIn(`${BASE_URI}/users/signin`, username, password);
    setIsSigningIn(false);
    if (response.status == 200) {
      let json = await response.json();
      let user = json.user;

      savePreference(TOKEN, json.token);
      savePreference(UUID, user.uuid);
      savePreference(USERNAME, user.username);
      savePreference(NAME, `${user.first_name} ${user.last_name}`);
      savePreference(EMAIL, user.email);
      console.log("OK");
    }
    if (response.status == 404) {
      // the user does not exist
    }
  }

  return (
    <Card style={styles.signInModal}>
      <Text style={DefaultStyle.title}>Sign in.</Text>
      <Text category='s1' appearance='hint'>Don't have an account yet? <Text status='primary' onPress={props.onOpenSignUpScreen}>Create one now</Text>!</Text>
      <Input
        style={styles.inputItem}
        label='Your username'
        placeholder='@'
        onChangeText={value => {setUsername(value)}}
      />
      <Input
        style={styles.inputItem}
        label='Password'
        secureTextEntry={true}
        placeholder='Enter your password'
        onChangeText={value => setPassword(value)}
      />
      <Button
        style={styles.inputItem}
        status='primary'
        disabled={isSigningIn}
        onPress={onSignInClick}>
        Log in
      </Button>
      <Divider style={styles.inputItem}/>
      <Button
        style={styles.inputItem}
        status='basic'>
        Log in with Facebook
      </Button>
      <Button
        style={styles.inputItem}
        status='basic'>
        Log in with Google
      </Button>
    </Card>
  )
}

export default SignInModal;

const styles = StyleSheet.create({
  signInModal: {
    borderRadius: 10,
    margin: 16
  },
  inputItem: {
    marginTop: 10
  }
});