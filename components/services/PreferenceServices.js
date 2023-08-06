import AsyncStorage from '@react-native-async-storage/async-storage';

export const THEME = 'theme';
export const SESSION = 'session';

export const savePreference = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
        return true;
    }
    catch (e) {
        // Unable to save the value
        return false;
    }
}

export const getPreference = async (key, defaultValue = null) => {
    try {
        const result = await AsyncStorage.getItem(key);
        if (result !== null) {
            return result;
        }
        else {
            return defaultValue;
        }
    }
    catch (e) {
        // Unable to get the value
        return defaultValue;
    }
}