/**
 * User-related functions
 */

import { BASE_URI } from "../components/services/PreferenceServices";


/**
 * Signs a user up
 * @param {*} url 
 * @param {*} username 
 * @param {*} fistName 
 * @param {*} lastName 
 * @param {*} email 
 * @param {*} password 
 * @returns Promise
 */
export function signUp(url, username, firstname, lastname, email, password) {
  return fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      first_name: firstname,
      last_name: lastname,
      email: email,
      password: password
    })
  })
}

/**
 * Signs a user in
 * @param {*} url 
 * @param {*} username 
 * @param {*} password 
 * @returns 
 */
export function signIn(url, username, password) {
  return fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
}

/**
 * Sample HTTP GET request for saying hello
 * @param {*} url 
 * @returns 
 */
export function sayHello() {
  return fetch(`${BASE_URI}/hello`);
}

/**
 * Search for user based on a keyword
 * @param {*} url 
 * @param {*} keyword 
 */
export function search(url, token, keyword) {
  console.log(`${url}${keyword} - ${token}`);
  return fetch(`${url}${keyword}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`
    },
  });
}

/**
 * Updates a user's basic info, including:
 * (1) birth date
 * (2) email address
 * (3) bio
 * @param {*} url 
 * @param {String} birthDate In ISO format (YYYY-MM-DD)
 * @param {String} email 
 * @param {String} bio 
 */
export function updateBasicInfo(url, token, birthDate, email, bio) {
  console.log(`POST ${url}`);
  return fetch(`${url}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`
    },
    body: JSON.stringify({
      birthday: birthDate,
      email: email,
      bio: bio,
    })
  });
}

/**
 * Fetches user basic info from the token
 * @param {String} url 
 * @param {String} token 
 */
export function getBasicInfo(url, token) {
  console.log(`GET ${url}`);
  return fetch(`${url}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`
    }
  });
}

/**
 * Updates a user password
 * @param {String} url 
 * @param {String} token 
 * @param {String} oldPassword 
 * @param {String} newPassword 
 */
export function updatePassword(url, token, oldPassword, newPassword) {
  console.log(`POST ${url}`);
  return fetch(`${url}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`
    },
    body: JSON.stringify({
      oldPassword: oldPassword,
      newPassword: newPassword,
    })
  });
}