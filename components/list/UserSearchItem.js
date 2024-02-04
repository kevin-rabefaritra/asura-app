import { Avatar, Layout, Text, useTheme } from "@ui-kitten/components";

const { TouchableOpacity, StyleSheet, ImageBackground } = require("react-native")

const SearchIcon = (props) => {
    const theme = useTheme();
    return (
      <Avatar
        shape='square'
        size='medium'
        source={props.source}
        ImageComponent={ImageBackground}
        style={{borderRadius: 2, borderWidth: 2, borderColor: theme['color-primary-disabled']}}
      />
    );
  }

const UserSearchItem = (props) => {
    return (
        <TouchableOpacity onPress={props.onClick}>
            <Layout style={styles.container}>
                <SearchIcon
                    source={require('../../assets/pepe.jpg')}
                />
                <Layout style={styles.contentContainer}>
                    <Text category='p1'>{props.title}</Text>
                    <Text category='p1' appearance='hint' style={{marginTop: 4}}>@{props.subtitle}</Text>
                </Layout>
            </Layout>
        </TouchableOpacity>
    )
}

export default UserSearchItem;

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      padding: 16,
    },
    contentContainer: {
      flex: 1,
      marginLeft: 16,
      justifyContent: 'space-between',
      alignSelf: 'center'
    }
  });