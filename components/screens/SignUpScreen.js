import { Button, Divider, Icon, Input, Layout, Text } from "@ui-kitten/components";
import MainStatusBar from "../basic/MainStatusBar";
import { StyleSheet } from "react-native";
import DefaultStyle from "../DefaultStyle";
import React from "react";

/**
 * Sign up screen
 * For the user to create an account
 */
const PASSWORD_MIN_LENGTH = 8

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
    setUsernameError(username.trim() == '' ? "Username cannot be empty" : "")
    setFirstnameError(firstname.trim() == '' ? "First name cannot be empty": "")
    setEmailError(email.trim() == "" ? "Email is invalid" : "")
    setPasswordError(password.trim() == "" ? "Password is empty" : "")

    // 2. check that the password / confirm password match
    if (passwordError == "") {
      setPasswordError(password.trim() != confirmPassword.trim() ? "Password must match" : "")
    }

    // 3. email address

    // 4. check that the username is available 
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