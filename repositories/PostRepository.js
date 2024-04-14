import { BASE_URI } from "../components/services/PreferenceServices";
import { callAPI } from "../helpers/api_helpers";

/**
 * Fetch Posts from server
 * @param {number} page 
 */
export function getPosts(page=1) {
    return callAPI(`posts?page=${page}`, 'GET', null, true);
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
 * Returns the share URI given a Post UUID
 * @param {String} postUuid 
 */
export function getPostShareUri(postUuid) {
    return `${BASE_URI}/posts/share/${postUuid}`;
}