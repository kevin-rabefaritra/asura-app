/**
 * User-related functions
 */


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
export function sayHello(url) {
  return fetch(url)
}