/**
 * Returns true or false whether a date is correct
 * @param {string} value 
 */
export function isDateValid(value) {
    return !isNaN(new Date(value));
}

export function now() {
    return new Date();
}

/**
 * Returns an integer representation of a Date
 * @param {Date} date 
 * @returns 
 */
export function dateToInteger(date) {
    return `${date.getFullYear()}${date.getUTCMonth()}${date.getUTCDay()}${date.getUTCHours()}${date.getUTCMinutes()}`;
}