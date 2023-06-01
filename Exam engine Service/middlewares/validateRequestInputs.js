import httpError from "../models/customError.js";
import * as validators from "../models/joiSchema.js";

export default function validateReqParameters(validator) {
    return (req, res, next) => {
        const { error } = validators[validator].validate(req.body);
        if (error === undefined) {
            next();
        }
        else {
            return next(new httpError(error, 400));
        }
    }
}