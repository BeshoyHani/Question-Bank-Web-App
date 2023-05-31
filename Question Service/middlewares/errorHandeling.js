import CustomError from "../models/customError.js";

export default function errorHandler(err, req, res, next) {
    let httpStatusCode = 500;
    let message = "Internal Server Error";

    if (err instanceof CustomError) {
        httpStatusCode = err.httpStatusCode;
        message = err.message;
    } else {
        if (process.env.ENV !== "prod") {
            if (typeof err === "string") {
                message = err;
            } else if (err instanceof Error) {
                message = err.message;
            }
        }
    }

    let stackTrace = undefined;
    if (process.env.ENV !== "prod") {
        stackTrace = err.stack;
    }

    console.error(err);
    res.status(httpStatusCode).json({
        error: {
            message: message,
            timestamp: err.timestamp || undefined,
            stackTrace: stackTrace,
        },
    });

    return next(err);
}
