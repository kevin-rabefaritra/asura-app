/**
 * String related helpers
 */


/**
 * Checks if the value only contains alpha characters (and spaces)
 * @param {String} value 
 * @returns bool
 */
export function isAlpha(value) {
    return !/[^a-zA-Z ]/.test(value);
}

/**
 * Checks if the value is a valid email
 * @param {String} value 
 * @returns 
 */
export function isEmail(value) {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
}