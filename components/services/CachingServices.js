import { now, dateToInteger } from "../../helpers/date_helpers";
import { executeQuery, openDatabase } from "./DatabaseServices";

/**
 * Function used to get an image base64 data given its URI
 * @param {String} uri 
 */
export const fetchRawData = async (uri) => {
    console.log(`[fetchRawData] Fetching media ${uri}..`);
    let cachedImage = await fetchImageFromLocalDatabase(uri);
    if (cachedImage) {
        console.log(`[fetchRawData] Found image locally!`);
        return cachedImage.base64;
    }
    else {
        console.log(`[fetchRawData] Couldn't find image locally. Downloading..`);
        base64image = await getBase64FromURI(uri);
        if (base64image) {
            // Cache image
            await cacheImage(base64image, uri);
            return base64image;
        }
        else {
            console.log(`[fetchRawData] Unable to fetch image.`);
            return null;
        }
    }
};

/**
 * Fetches a base64 representation of an image given its URI
 * @param {String} uri 
 */
export const getBase64FromURI = async (uri) => {
    const response = await fetch(uri);
    if (response.status === 200) {
        const blob = await response.blob();
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64data = reader.result;
                resolve(base64data);
            };
        });
    }
    else {
        console.log(`[getBase64FromURI] status=${response.status}. Unable to fetch ${uri}.`);
        return null;
    }
}

/**
 * Caches an image with its corresponding URI
 * @param {*} base64data 
 * @param {*} uri 
 */
export const cacheImage = async (base64data, uri) => {
    const database = openDatabase();
    const currentDateTime = now();
    return executeQuery(
        database,
        "INSERT INTO CachedImage (base64, uri, created_at) VALUES (?, ?, ?);",
        [base64data, uri, dateToInteger(currentDateTime)]
    );
};

/**
 * Find a base64 representation from the URI in the local database
 * @param {String} uri 
 */
export const fetchImageFromLocalDatabase = async (uri) => {
    const database = openDatabase();
    let resultSet = await executeQuery(database, "SELECT * FROM CachedImage WHERE URI = ?", [uri]);
    return resultSet && resultSet.rows._array.length > 0 ? resultSet.rows._array[0] : null;
};