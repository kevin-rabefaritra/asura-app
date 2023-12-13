import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URI, REFRESH_TOKEN, TOKEN, savePreference } from "../components/services/PreferenceServices";
import UserSessionExpiredException from "../exceptions/UserSessionExpiredException";
import APIException from "../exceptions/APIException";

/**
 * Performs a HTTP request to the server
 * @param {String} url 
 * @param {String} method 
 * @param {Map} body 
 * @param {Boolean} passToken 
 * @returns {Promise}
 * @throws
 * UserSessionExpiredException
 * APIException
 */
export const callAPI = async (endpoint, method, body=null, passToken=false) => {
    console.log(`Calling ${method} ${endpoint} passToken=${passToken}`);
    let headers = {'Content-Type': 'application/json'};

    // Retrieve authorization and access token
    let _, stores = await AsyncStorage.multiGet([TOKEN, REFRESH_TOKEN]);

    // Add access token if required
    if (passToken) {
        headers['Authorization'] = `Basic ${stores[0][1]}`;
    }

    let response = await fetch(`${BASE_URI}/${endpoint}`, {method: method, headers: headers, body: body});
    console.log(`Returned status ${response.status}`);
    if (response.status >= 200 && response.status < 300) {
        return response; // Returns response as Promise
    }
    else if (response.status === 401) {
        // 401 Non authorized, need to refresh access token
        response = await fetch(`${BASE_URI}/token/renew`, "POST", headers, {'refreshToken': stores[1][1]})
        if (response.status === 200) {
            let json = await response.json();
            await savePreference(TOKEN, json.accessToken);
            return callAPI(url, method, body, passToken);
        }
        else if (response.status === 401) {
            // Refresh token has also expired, throw exception
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