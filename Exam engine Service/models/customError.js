export default class CustomError extends Error {
    httpStatusCode;
    timestamp;

    constructor(message, httpStatusCode) {
        if (message) {
            super(message);
        } else {
            super("A generic error occurred!");
        }

        this.httpStatusCode = httpStatusCode;
        this.timestamp = new Date().toISOString();
        Error.captureStackTrace(this, this.constructor);
    }
}