import { BASE_URI } from "../components/services/PreferenceServices";
import { callAPI } from "../helpers/api_helpers";

/**
 * Fetch Posts from server
 * @param {number} page 
 */
export function getPosts(page=1) {
    return callAPI(`posts?page=${page}`, 'GET', null, false);
}

/**
 * Add a score to a Post
 * @param {*} uuid 
 * @param {*} score 
 * @returns 
 */
export function reactToPost(uuid, score) {
    let body = {
        score: score
    };
    return callAPI(`posts/react/${uuid}`, 'POST', body, true);
}

/**
 * Search for user/posts based on a keyword
 * @param {String} keyword 
 */
export function search(keyword, page) {
    return callAPI(`search/${keyword}?page=${page}`, "GET", null, false);
}