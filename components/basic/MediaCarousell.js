import { Button, Layout, Text, ViewPager } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import CachedImage from './CachedImage';

/**
 * Used to display multiple media in a carousell
 * @param {*} props contains:
 * - media {Array<String>}
 * Contains an array of media URLs that will be displayed
 */
const MediaCarousell = (props) => {

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    return (
        <ViewPager 
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}>
            { 
                props.media.map((item, key) => (
                    <CachedImage
                        key={key} // key is used by React internally
                        uri={item}
                        style={styles.pageContainer}
                    />
                ))
            }
        </ViewPager>
    );
};
export default MediaCarousell;

const styles = StyleSheet.create({
    pageContainer: {
        height: 192,
        marginEnd: 8
    }
});