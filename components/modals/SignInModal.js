import { Button, Card, Divider, Input, Layout, Text, useTheme } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import DefaultStyle from "../DefaultStyle";
import React from "react";
import { PASSWORD_MIN_LENGTH, USERNAME_MIN_LENGTH } from "../screens/SignUpScreen";

/**
 * Sign up modal dialog
 * For the user to sign in (provided they already have an account)
 */

const SignInModal = (props) => {
  const theme = useTheme();

  // Username / password fields
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")

  // on sign up click
  const onSignInClick = () => {
     if (username.trim().length < USERNAME_MIN_LENGTH || password.trim().length < PASSWORD_MIN_LENGTH) {
      return
     }
     
     // Perform request
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