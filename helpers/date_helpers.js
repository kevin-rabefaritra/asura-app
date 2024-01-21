/**
 * Returns true or false whether a date is correct
 * @param {string} value 
 */
export function isDateValid(value) {
    return !isNaN(new Date(value));
}