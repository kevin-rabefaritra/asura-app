import { Button, Icon, Layout, useTheme } from "@ui-kitten/components";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { DefaultContext } from "../default-context";
import CachedImage from "../basic/CachedImage";

/**
 * Screen used to display a gallery of images
 * @param {*} props, contains the following properties:
 * - 
 * @returns 
 */
const GalleryScreen = (props) => {

    const { uri } = props.route.params;

    const context = React.useContext(DefaultContext);
	const theme = useTheme();

    // image dimensions
    const window = Dimensions.get('window');
    const maxWidth = window.width;
    const maxHeight = window.height - 32 /** Button margin top * 2 */ - 48 /** button height */;

    /**
     * Closes the screen
     */
    const onCloseScreen = () => {
        props.navigation.goBack();
    };

    return (
        <Layout style={{flex: 1, backgroundColor: theme['background-basic-color-3']}}>
            <Button
                style={styles.backButton}
                appearance='ghost'
                status='primary'
                onPress={onCloseScreen}
                accessoryLeft={<Icon name='arrow-left' />} />

            <CachedImage
                uri={uri}
                onPress={null}
                imageStyle={{width: maxWidth, height: maxHeight, resizeMode: 'contain'}} />
            
        </Layout>
    );
};
export default GalleryScreen;

const styles = StyleSheet.create({
    backButton: {
        width: 48,
        marginHorizontal: 16,
        marginTop: 16,
    }
});