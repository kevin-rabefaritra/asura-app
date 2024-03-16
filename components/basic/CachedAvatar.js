import { Avatar, Spinner, Text, useTheme } from "@ui-kitten/components";
import React, { useEffect } from "react";
import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";
import DefaultStyle from "../DefaultStyle";
import { fetchRawData } from "../services/CachingServices";

/**
 * Component used to cache and display avatars
 * Inspired from CachedImage but uses Kitten UI's Avatar component instead
 * @param {*} props, contains the following attributes:
 * - uri {String}
 * - imageStyle {object} optionnal
 * - onPress {function}
 * callback to be called when the user clicks on the image
 */
const CachedAvatar = (props) => {

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
        if (!imageData && props.uri) {
            loadImage();
        }
    }, []);

    return (
        <TouchableOpacity onPress={props.onPress} disabled={props.disabled}>
            <Avatar
                shape='square'
                size='medium'
                style={[props.imageStyle, {borderColor: theme['color-primary-default']}]}
                source={imageData ? {uri: imageData} : require('../../assets/menja.jpg')}
            />
        </TouchableOpacity>
    );
}
export default CachedAvatar;
