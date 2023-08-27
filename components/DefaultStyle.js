import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    title: {
        fontFamily: 'RobotoCondensed-Bold',
        fontSize: 36,
        textTransform: 'uppercase'
    },
    heading: {
        fontFamily: 'RobotoCondensed-Bold',
        fontSize: 28,
        textTransform: 'uppercase'
    },
    loading: {
        zIndex: 1,
        backgroundColor: '#FFFFFF',
        opacity: 0.7,
        height: '100%',
        width: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    }
});