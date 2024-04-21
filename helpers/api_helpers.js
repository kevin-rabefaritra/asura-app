import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URI, REFRESH_TOKEN, TOKEN, savePreference } from "../components/services/PreferenceServices";
import UserSessionExpiredException from "../exceptions/UserSessionExpiredException";
import APIException from "../exceptions/APIException";
import UserNotSignedInException from "../exceptions/UserNotSignedInException";

/**
 * Performs a HTTP request to the server
 * If status code 401 is returned when getting a new access token, redirect the
 * user to the sign in screen.
 * @param {String} endpoint 
 * @param {String} method 
 * @param {Map} body 
 * @param {Boolean} passToken 
 * @returns {Promise}
 * @throws
 * UserSessionExpiredException
 * APIException
 */
export async function callAPI(endpoint, method, body=null, passToken=false) {
    console.log(`[callAPI] Calling ${method} ${BASE_URI}/${endpoint} passToken=${passToken}`);
    if (body) {
        console.log(`[callAPI] body: ${JSON.stringify(body)}`);
    }
    let headers = {'Content-Type': 'application/json'};

    // Retrieve authorization and access token
    let _, stores = await AsyncStorage.multiGet([TOKEN, REFRESH_TOKEN]);

    // Add access token if required
    if (passToken) {
        let token = stores[0][1];
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        else {
            // Token is requested to be passed but is empty
            throw new UserNotSignedInException();
        }
    }

    let requestBody = body ? JSON.stringify(body) : null;
    let response = await fetch(`${BASE_URI}/${endpoint}`, {method: method, headers: headers, body: requestBody});
    console.log(`[callAPI] Returned status ${response.status}`);
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    else if (response.status === 401) {
        // 401 Non authorized, need to refresh access token
        console.log("[callAPI] Refreshing token..");
        response = await fetch(`${BASE_URI}/token/renew`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({'refreshToken': stores[1][1]})
        });
        
        if (response.status === 200) {
            console.log("[callAPI] Refreshing session ok.");
            let json = await response.json();
            await savePreference(TOKEN, json.accessToken);
            return callAPI(endpoint, method, body, passToken);
        }
        else if ([401, 404].includes(response.status)) {
            console.log("[callAPI] Refreshing session failed.");
            // Refresh token has also expired, request user to sign in again
            throw new UserSessionExpiredException();
        }
        else {
            // We throw any other status code
            throw new APIException(response.status);
        }
    }
    else {
        throw new APIException(response.status);
    }
}