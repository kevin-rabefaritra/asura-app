import { Button, Card, Divider, Input, Layout, Text, useTheme } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

/**
 * Sign up modal dialog
 * For the user to sign in (provided they already have an account)
 */
const SignInModal = (props) => {
  const theme = useTheme();

  return (
    <Card style={styles.signInModal}>
      <Text category='h1'>Sign in</Text>
      <Text category='s1' appearance='hint'>Don't have an account yet? <Text status='primary' onPress={props.onOpenSignUpScreen}>Create one now</Text>!</Text>
      <Input
        style={styles.inputItem}
        label='Your username'
        placeholder='@'
      />
      <Input
        style={styles.inputItem}
        label='Password'
        secureTextEntry={true}
        placeholder='Enter your password'
      />
      <Button
        style={styles.inputItem}
        status='primary'>
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