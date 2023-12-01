import AsyncStorage from "@react-native-async-storage/async-storage";
import { EXPIRES_ON, TOKEN } from "./PreferenceServices";

/**
 * Wrapper for POST REST API calls
 * If token is provided, we check the expiration date and renew it
 * @param {*} url 
 * @param {*} headers 
 * @param {*} body 
 * @returns 
 */
export function post(url, headers, body = null) {
    // Check if token is - potentially - provided
    if ('Authorization' in headers) {
        // If token is provided, check their validity in local storage
        AsyncStorage.multiGet([TOKEN, EXPIRES_ON], (error, items) => {
            if (items.length === 2) {
                const token = items[0][1];
                const expirationDate = items[0][1];
                if (token && expirationDate) {
                    // Check if expiration date has already passed
                }
                else {
                    // Token or expiration date is null, need to renew token
                    
                }
            }
        });
    }
    return fetch(url, {
        method: "POST",
        headers: headers,
        body: body
    });
}

function renewToken(token) {
    return fetch(url, {
        method: "POST",
        headers: headers,
        body: body
    });
}