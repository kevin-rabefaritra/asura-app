import { Spinner, Text, useTheme } from "@ui-kitten/components";
import React, { useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import DefaultStyle from "../DefaultStyle";
import { fetchRawData } from "../services/CachingServices";

/**
 * Component used to cache and display images
 * @param {*} props, contains the following attributes:
 * - uri {String}
 */
const CachedImage = (props) => {

    const [imageData, setImageData] = React.useState(null);

    const theme = useTheme();

    const loadImage = async () => {
        let rawData = await fetchRawData(props.uri);
        setImageData(rawData);
    };

    useEffect(() => {
        loadImage();
    }, []);

    return (
        <TouchableOpacity style={props.style}>
        {
            !imageData && 
            <View style={[{backgroundColor: theme['background-basic-color-3']}, styles.pagerImage, DefaultStyle.loadingContainer]}>
                <Text>Loading image..</Text>
            </View>
        }
        {
            imageData && 
            <Image style={[{backgroundColor: theme['background-basic-color-3']}, styles.image]} source={{uri: imageData}} />
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