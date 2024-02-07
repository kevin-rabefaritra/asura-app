import { Avatar, Card, Icon, Layout, Text, useTheme } from "@ui-kitten/components";

const { StyleSheet, ImageBackground, TouchableOpacity } = require("react-native")

const SearchIcon = (props) => {
    const theme = useTheme();
    return (
      <Avatar
        shape='square'
        size='medium'
        source={props.source}
        ImageComponent={ImageBackground}
        style={{borderRadius: 2, borderWidth: 2, borderColor: theme['color-primary-default']}}
      />
    );
  }

const UserSearchItem = (props) => {
  const theme = useTheme();
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Card disabled={true}>
          <Layout style={styles.cardContainer}>
              <SearchIcon
                  source={require('../../assets/pepe.jpg')}
              />
              <Layout style={styles.contentContainer}>
                  <Text category='p1'>{props.title}</Text>
                  <Text category='p1' appearance='hint' style={{marginTop: 4}}>{props.subtitle}</Text>
              </Layout>
          </Layout>
      </Card>
    </TouchableOpacity>
  )
}

export default UserSearchItem;

const styles = StyleSheet.create({
    container: {
      marginHorizontal: 8,
      marginVertical: 4,
      borderRadius: 4
    },
    cardContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginHorizontal: -8
    },
    contentContainer: {
      flex: 1,
      marginLeft: 16,
      justifyContent: 'space-between',
      alignSelf: 'center'
    }
  });