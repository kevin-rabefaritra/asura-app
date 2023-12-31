import { Button, Card, Divider, Input, Text, useTheme } from "@ui-kitten/components";
import { Keyboard, StyleSheet } from "react-native";
import DefaultStyle from "../DefaultStyle";
import React, { useEffect } from "react";
import { PASSWORD_MIN_LENGTH, USERNAME_MIN_LENGTH } from "../screens/SignUpScreen";
import { signIn } from "../../repositories/UserRepository";
import { TOKEN, USERNAME, getPreference, savePreference } from "../services/PreferenceServices";
import User from "../models/User";
import APIException from "../../exceptions/APIException";

/**
 * Sign up modal dialog
 * For the user to sign in (provided they already have an account)
 * Test user account: test / 12345678
 */

const SignInModal = (props) => {
  const context = props.context;
  const theme = useTheme();

  const [signInError, setSignInError] = React.useState("")

  // Username / password fields
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [isSigningIn, setIsSigningIn] = React.useState(false)
  const [isFormValid, setIsFormValid] = React.useState(false)

  const [hasLoadedDefaultUsername, setHasLoadedDefaultUsername] = React.useState(false);

  const validateForm = () => {
    return username.trim().length >= USERNAME_MIN_LENGTH && password.trim().length >= PASSWORD_MIN_LENGTH;
  }

  // Effect to keep track on the sign in button
  useEffect(() => {
    setIsFormValid(validateForm());
  }, [username, password]);

  // Load default username if set in preferences (only do once)
  // Todo: handle onResume
  getPreference(USERNAME).then((username) => {
    if (!hasLoadedDefaultUsername && username) {
      setHasLoadedDefaultUsername(true);
      setUsername(username);
    }
  });

  // on sign up click
  const onSignInClick = async () => {
    // Dismiss the keyboard
    Keyboard.dismiss();

    if (!validateForm()) {
      return;
    }
    // Set the button text to ongoing
    setIsSigningIn(true);
    
    // Perform request
    try {
      const response = await signIn(username, password);
      if (response.status == 200) {
        setSignInError(null);
        let json = await response.json();
        let jsonUser = json.user;

        savePreference(TOKEN, json.token);
        
        // Update the user in Context
        const user = new User(
          jsonUser.username,
          jsonUser.uuid,
          jsonUser.first_name,
          jsonUser.last_name,
          jsonUser.email
        );
        context.updateUser(user);
      }
    }
    catch (e) {
      console.log(e);
      if (e instanceof APIException) {
        if (e.statusCode == 404) {
          // the user does not exist
          setSignInError("The username / password does not exist.");
        }
      }
      else {
        setSignInError("An error occured. Please try again.");
      }
    }
    finally {
      setIsSigningIn(false);
    }
  }

  return (
    <Card style={styles.signInModal} disabled={true}>
      <Text style={DefaultStyle.title} >Sign in.</Text>
      <Text category='s1' appearance='hint'>Don't have an account yet? <Text status='primary' onPress={props.openSignUpScreen}>Create one now</Text>!</Text>
      { signInError && 
        <Text category="label" status="danger" style={{marginTop: 8}}>{signInError}</Text>
      }
      <Input
        style={styles.inputItem}
        label='Your username'
        placeholder='@'
        value={username}
        onChangeText={setUsername}
      />
      <Input
        style={styles.inputItem}
        label='Password'
        secureTextEntry={true}
        placeholder='Enter your password'
        onChangeText={setPassword}
      />
      <Button
        style={styles.inputItem}
        status='primary'
        disabled={isSigningIn || !isFormValid}
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