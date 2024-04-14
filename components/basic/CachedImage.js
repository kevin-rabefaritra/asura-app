import { Spinner, Text, useTheme } from "@ui-kitten/components";
import React, { useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import DefaultStyle from "../DefaultStyle";
import { fetchRawData } from "../services/CachingServices";

/**
 * Component used to cache and display images
 * @param {*} props, contains the following attributes:
 * - uri {String}
 * - imageStyle {object} optionnal
 * - onPress {function}
 * callback to be called when the user clicks on the image
 */
const CachedImage = (props) => {

    const [imageData, setImageData] = React.useState(null);

    const theme = useTheme();

    /**
     * Loads an image into the Image component
     */
    const loadImage = async () => {
        let rawData = await fetchRawData(props.uri);
        setImageData(rawData);
    };

    useEffect(() => {
        if (!imageData) {
            loadImage();
        }
    }, []);

    return (
        <TouchableOpacity style={props.style} onPress={props.onPress} disabled={props.onPress ? false : true}>
        {
            !imageData && 
            <View style={[{backgroundColor: theme['background-basic-color-3']}, DefaultStyle.loadingContainer]}>
                <Text>Loading image..</Text>
            </View>
        }
        {
            imageData && 
            <Image 
                style={[{backgroundColor: theme['background-basic-color-3']}, props.imageStyle || styles.image]}
                source={{uri: imageData}} />
        }
        </TouchableOpacity>
    );
}
export default CachedImage;

const styles = StyleSheet.create({
    image: {
        height: 192,
        borderRadius: 8,
        resizeMode: 'cover'
    }
});