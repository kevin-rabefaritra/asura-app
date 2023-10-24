import { Avatar, Layout, Text } from "@ui-kitten/components";

const { TouchableOpacity, StyleSheet, ImageBackground } = require("react-native")

const SearchIcon = (props) => {
    return (
      <Avatar
        shape='rounded'
        size='medium'
        source={props.source}
        ImageComponent={ImageBackground}
      />
    );
  }

const SearchItem = (props) => {
    return (
        <TouchableOpacity onPress={props.onClick}>
            <Layout style={styles.container}>
                <SearchIcon
                    source={require('../../assets/pepe.jpg')}
                />
                <Layout style={styles.contentContainer}>
                    <Text category='p1'>{props.title}</Text>
                    <Text category='p1' appearance='hint'>{props.subtitle}</Text>
                </Layout>
            </Layout>
        </TouchableOpacity>
    )
}

export default SearchItem;

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
    }
  });