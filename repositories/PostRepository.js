import { callAPI } from "../helpers/api_helpers";

/**
 * Fetch Posts from server
 * @param {number} page 
 */
export function getPosts(page=0) {
    return callAPI(`posts`, 'GET', null, true);
}