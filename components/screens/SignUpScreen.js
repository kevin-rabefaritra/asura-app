import { Button, Divider, Icon, Input, Layout, Text } from "@ui-kitten/components";
import MainStatusBar from "../basic/MainStatusBar";
import { StyleSheet } from "react-native";
import DefaultStyle from "../DefaultStyle";
import React from "react";
import { isAlpha, isEmail } from "../../helpers/string_helpers";
import { BASE_URI } from "../../App";

/**
 * Sign up screen
 * For the user to create an account
 */
export const PASSWORD_MIN_LENGTH = 8
export const USERNAME_MIN_LENGTH = 3
const FIRST_NAME_MIN_LENGTH = 2 

const SignUpScreen = (props) => {

  // Error messages
  const [usernameError, setUsernameError] = React.useState(null);
  const [firstnameError, setFirstnameError] = React.useState(null);
  const [emailError, setEmailError] = React.useState(null);
  const [passwordError, setPasswordError] = React.useState(null);

  // Form values
  const [username, setUsername] = React.useState('');
  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const onCloseScreen = () => {
    props.navigation.goBack();
  }

  // Validate the form
  const onClickValidate = () => {
    // 1. check that there are no empty fields (except last name)
    setUsernameError(username.trim().length < USERNAME_MIN_LENGTH ? `Username must be at least ${USERNAME_MIN_LENGTH} characters` : "")
    setFirstnameError(firstname.trim().length < FIRST_NAME_MIN_LENGTH ? `First name must be at least ${FIRST_NAME_MIN_LENGTH} characters` : "")
    setEmailError(!isEmail(email.trim()) ? "Email is invalid" : "")

    // 2. check that the password / confirm password match
    if (password.trim().length < PASSWORD_MIN_LENGTH) {
      setPasswordError(`Password must be at least ${PASSWORD_MIN_LENGTH} characters`)
    }
    else if (password.trim() != confirmPassword.trim()) {
      setPasswordError("Password must match")
    }
    else {
      setPasswordError("")
    }

    // 4. check that the username is available (only if all conditions above are completed)
    if (usernameError != "" || firstnameError != "" || emailError != "" || passwordError != "") {
      return
    }

    // make http request to check the username availability
    // better to put this block in a separate repository file, and use await instead
    fetch(`${BASE_URI}/signinorsomething`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password
      })
    })
    .then(response => response.json())
    .catch(error => {
      console.error(error)
    })
  }

  return (
    <Layout style={styles.container}>
      <Button
        style={styles.backButton}
        appearance='ghost'
        status='primary'
        onPress={onCloseScreen}
        accessoryLeft={<Icon name='arrow-left' />}
      />
      <Text style={[styles.inputItem, DefaultStyle.title]}>hello.</Text>
      <Input
        style={styles.inputItem}
        label='Username (can be changed later)'
        status={usernameError && "danger" || "info"}
        onChangeText={value => setUsername(value)}
        placeholder='@'
      />
      <Layout style={[styles.inlineContainer, styles.inputItem]}>
        <Input
          style={[styles.inlineContainerItem, {marginRight: 16}]}
          label='First name'
          status={firstnameError && "danger" || "info"}
          placeholder='Your first name'
          onChangeText={value => setFirstname(value)}
        />
        <Input
          style={styles.inlineContainerItem}
          label='Last name'
          placeholder='Your last name'
          onChangeText={value => setLastname(value)}
        />
      </Layout>
      <Divider style={styles.inputItem} />
      <Input
        style={styles.inputItem}
        label='Email'
        status={emailError && "danger" || "info"}
        placeholder='Enter your email address'
        onChangeText={value => setEmail(value)}
      />
      <Input
        style={styles.inputItem}
        label='Password'
        secureTextEntry={true}
        status={passwordError && "danger" || "info"}
        placeholder={`Enter your password (at least ${PASSWORD_MIN_LENGTH} characters)`}
        onChangeText={value => setPassword(value)}
      />
      <Input
        style={styles.inputItem}
        label='Confirm your password'
        secureTextEntry={true}
        status={passwordError && "danger" || "info"}
        placeholder='Enter your password again'
        onChangeText={value => setConfirmPassword(value)}
      />
      <Button
        style={styles.inputItem}
        status='primary'
        onPress={onClickValidate}>
        Create my account
      </Button>
    </Layout>
  )
}

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: '100%'
  },
  inlineContainer: {
    flexDirection: 'row'
  },
  inlineContainerItem: {
    flex: 1,
  },
  backButton: {
    width: 48
  },
  inputItem: {
    marginTop: 16
  }
});