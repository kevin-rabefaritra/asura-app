import { Button, Divider, Icon, Input, Layout, Text } from "@ui-kitten/components";
import MainStatusBar from "../basic/MainStatusBar";
import { StyleSheet } from "react-native";
import DefaultStyle from "../DefaultStyle";

/**
 * Sign up screen
 * For the user to create an account
 */

const [usernameError, setUsernameError] = React.useState(false);
const [firstnameError, setFirstnameError] = React.useState(false);
const [passwordError, setPasswordError] = React.useState(false);

const SignUpScreen = (props) => {
  const onCloseScreen = () => {
    props.navigation.goBack();
  }

  const onClickValidate = () => {
    // Validate the form
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
        status="basic"
        placeholder='@'
      />
      <Layout style={[styles.inlineContainer, styles.inputItem]}>
        <Input
          style={[styles.inlineContainerItem, {marginRight: 16}]}
          label='First name'
          placeholder='Your first name'
        />
        <Input
          style={styles.inlineContainerItem}
          label='Last name'
          placeholder='Your last name'
        />
      </Layout>
      <Divider style={styles.inputItem} />
      <Input
        style={styles.inputItem}
        label='Password'
        secureTextEntry={true}
        placeholder='Enter your password'
      />
      <Input
        style={styles.inputItem}
        label='Confirm your password'
        secureTextEntry={true}
        placeholder='Enter your password again'
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