/**
 * User-related functions
 */
import { EMAIL, NAME, REFRESH_TOKEN, TOKEN, USERNAME, UUID, removePreference } from "../components/services/PreferenceServices";
import { callAPI } from "../helpers/api_helpers";


/**
 * Signs a user up
 * @param {String} username 
 * @param {String} fistName 
 * @param {String} lastName 
 * @param {String} email 
 * @param {String} password 
 * @returns Promise
 */
export function signUp(username, firstname, lastname, email, password) {
  return callAPI("users/", "POST", {
      username: username,
      first_name: firstname,
      last_name: lastname,
      email: email,
      password: password
    }, true);
}

/**
 * Signs a user in
 * @param {String} username 
 * @param {String} password 
 * @returns 
 */
export function signIn(username, password) {
  return callAPI("users/signin", "POST", {
    username: username,
    password: password
  });
}

/**
 * Sample HTTP GET request for saying hello
 * @returns 
 */
export function sayHello() {
  return callAPI("hello", "GET");
}

/**
 * Search for user based on a keyword
 * @param {String} keyword 
 */
export function search(keyword) {
  return callAPI(`users/search/${keyword}`, "GET", null, true);
}

/**
 * Updates a user's basic info, including:
 * (1) birth date
 * (2) email address
 * (3) bio
 * @param {String} birthDate In ISO format (YYYY-MM-DD)
 * @param {String} email 
 * @param {String} bio 
 */
export function updateBasicInfo(birthDate, email, bio) {
  return callAPI("users/profile/basic", "POST", {
      birthday: birthDate,
      email: email,
      bio: bio,
    }, true);
}

/**
 * Fetches user basic info from the token
 */
export function getBasicInfo() {
  return callAPI("users/profile/basic", "GET", null, true);
}

/**
 * Updates a user password
 * @param {String} oldPassword 
 * @param {String} newPassword 
 */
export function updatePassword(oldPassword, newPassword) {
  return callAPI("users/password/update", "POST", {
    oldPassword: oldPassword,
    newPassword: newPassword,
  }, true);
}

/**
 * Signs a user out
 */
export function signOut() {
  removePreference(TOKEN, REFRESH_TOKEN, USERNAME, UUID, NAME, EMAIL);
}