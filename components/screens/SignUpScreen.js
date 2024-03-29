import { Button, Divider, Icon, Input, Layout, Text, Card, Spinner } from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import DefaultStyle from "../DefaultStyle";
import React from "react";
import { isEmail } from "../../helpers/string_helpers";
import { EMAIL, NAME, USERNAME, UUID, savePreference } from "../services/PreferenceServices";
import { signUp } from "../../repositories/UserRepository";
import APIException from "../../exceptions/APIException";

/**
 * Sign up screen
 * For the user to create an account
 */
export const PASSWORD_MIN_LENGTH = 6
export const USERNAME_MIN_LENGTH = 3
const FIRST_NAME_MIN_LENGTH = 2 

const SignUpScreen = (props) => {

  // Error messages
  const [generalError, setGeneralError] = React.useState('');
  const [usernameError, setUsernameError] = React.useState('');
  const [firstnameError, setFirstnameError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  // Form values
  const [username, setUsername] = React.useState('');
  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const [hasErrors, setHasErrors] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const onCloseScreen = () => {
    props.navigation.goBack();
  }

  const signUpUser = async () => {
    setIsProcessing(true);
    try {
      const response = await signUp(username, firstname, lastname, email, password);
      if (response.status == 201) {
        const json = await response.json();

        // Sign up successful, we store the account into to the preferences
        await savePreference(UUID, json.uuid);
        await savePreference(USERNAME, json.username);
        await savePreference(NAME, `${json.first_name} ${json.last_name}`);
        await savePreference(EMAIL, json.email);

        setHasErrors(false);

        onCloseScreen();
      }
    }
    catch(error) {
      console.log(error);
      setHasErrors(true);
      if (error instanceof APIException) {
        if (error.statusCode == 400) {
          // got expected error from server
          // username or email might already been taken
          setUsernameError("The username or email is already taken.");
        }
        else {
          setGeneralError(`Error code ${error.statusCode}`);
        }
      }
      else {
        setGeneralError('Error reaching out to the server.');
      }
    }
    finally {
      setIsProcessing(false);
    }
  }

  // Validate the form
  const onClickValidate = () => {
    // 1. check that there are no empty fields (except last name)
    errors = false;
    setGeneralError("");

    // 2. Check username
    if (username.trim().length < USERNAME_MIN_LENGTH) {
      errors = true;
      setUsernameError(`Username must be at least ${USERNAME_MIN_LENGTH} characters`);
    } else {
      setUsernameError('');
    }

    // 3. Check first name
    if (firstname.trim().length < FIRST_NAME_MIN_LENGTH) {
      errors = true;
      setFirstnameError(`First name must be at least ${FIRST_NAME_MIN_LENGTH} characters`);
    } else {
      setFirstnameError('');
    }

    // 4. Check email
    if (!isEmail(email.trim())) {
      errors = true;
      setEmailError("Email is invalid");
    } else {
      setEmailError('');
    }

    // 5. check that the password / confirm password match
    if (password.trim().length < PASSWORD_MIN_LENGTH) {
      errors = true;
      setPasswordError(`Password must be at least ${PASSWORD_MIN_LENGTH} characters`);
    }
    else if (password.trim() != confirmPassword.trim()) {
      errors = true;
      setPasswordError("Passwords must match");
    }
    else {
      setPasswordError("");
    }

    // 3. check that the username is available (only if all conditions above are completed)
    setHasErrors(errors);
    if (errors) {
      return null;
    }
    
    // 4. Todo: make http request to check the username availability

    // 5. Signs the user up
    signUpUser();
  }

  const getErrors = () => {
    return [generalError, usernameError, firstnameError, emailError, passwordError]
  }

  return (
    <Layout style={styles.container}>
      { isProcessing &&
        <View style={DefaultStyle.loadingContainer}>
          <Spinner status='primary' size='medium'/>
        </View>
      }
      
      <Layout style={{padding: 16}}>      
        <Button
          style={styles.backButton}
          appearance='ghost'
          status='primary'
          onPress={onCloseScreen}
          accessoryLeft={<Icon name='arrow-left' />}
        />
        <Text style={[styles.inputItem, DefaultStyle.title]}>hello.</Text>
        { 
          hasErrors && 
          <Card
            style={{marginTop: 8}}
            status='danger'>
            <Text style={{lineHeight: 24}}>
              Error(s):
              { getErrors().filter((item) => item != null && item.trim() != "").map((item) => `\n\u2022 ${item}`)}
            </Text>
          </Card>
        }
        <Input
          style={styles.inputItem}
          label='Username (can be changed later)'
          status={usernameError && "danger" || "info"}
          onChangeText={setUsername}
          placeholder='@'
        />
        <Layout style={[styles.inlineContainer, styles.inputItem]}>
          <Input
            style={[styles.inlineContainerItem, {marginRight: 16}]}
            label='First name'
            status={firstnameError && "danger" || "info"}
            placeholder='Your first name'
            onChangeText={setFirstname}
          />
          <Input
            style={styles.inlineContainerItem}
            label='Last name'
            placeholder='Your last name'
            onChangeText={setLastname}
          />
        </Layout>
        <Divider style={styles.inputItem} />
        <Input
          style={styles.inputItem}
          label='Email'
          status={emailError && "danger" || "info"}
          placeholder='Enter your email address'
          onChangeText={setEmail}
        />
        <Input
          style={styles.inputItem}
          label='Password'
          secureTextEntry={true}
          status={passwordError && "danger" || "info"}
          placeholder={`Enter your password (at least ${PASSWORD_MIN_LENGTH} characters)`}
          onChangeText={setPassword}
        />
        <Input
          style={styles.inputItem}
          label='Confirm your password'
          secureTextEntry={true}
          status={passwordError && "danger" || "info"}
          placeholder='Enter your password again'
          onChangeText={setConfirmPassword}
        />
        <Button
          style={styles.inputItem}
          status='primary'
          onPress={onClickValidate}>
          Create my account
        </Button>
      </Layout>
    </Layout>
  )
}

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
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