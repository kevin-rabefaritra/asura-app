import AsyncStorage from '@react-native-async-storage/async-storage';


// Global values
export const BASE_URI = "http://asura.kianja.top/asura"

// Preference keys
export const THEME = 'theme';
export const TOKEN = 'token';
export const USERNAME = 'username';
export const UUID = 'uuid';
export const NAME = 'uname';
export const EMAIL = 'email';

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

export const removePreference = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    }
    catch (e) {
        // Unable to save the value
        return false;
    }
}