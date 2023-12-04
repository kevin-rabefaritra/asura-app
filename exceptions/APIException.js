/**
 * Used for general HTTP exceptions
 */
export default class APIException extends Error {
    constructor(statusCode, message=null) {
        super(message);
        this.statusCode = statusCode;
    }
}