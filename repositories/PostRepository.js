import { callAPI } from "../helpers/api_helpers";

/**
 * Fetch Posts from server
 * @param {number} page 
 */
export function getPosts(page=1) {
    return callAPI(`posts?page=${page}`, 'GET', null, true);
}

export function reactToPost(uuid, score) {
    let body = {
        score: score
    };
    return callAPI(`posts/react/${uuid}`, 'POST', body, true);
}