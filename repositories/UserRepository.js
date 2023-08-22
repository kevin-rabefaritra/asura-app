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
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      firstname: firstname,
      lastname: lastname,
      email: email,
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