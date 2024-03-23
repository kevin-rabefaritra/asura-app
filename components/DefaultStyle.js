import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    title: {
        fontFamily: 'PixeloidSans',
        fontSize: 36,
        textTransform: 'uppercase'
    },
    heading: {
        fontSize: 28,
    },
    subtitle: {
        fontSize: 20
    },
    pixel: {
        fontFamily: 'PixeloidSans',
    },
    loadingContainer: {
        zIndex: 1,
        opacity: 0.7,
        height: '100%',
        width: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },
    full: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    modalBackdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
});