import httpError from "../models/customError.js";
import * as validators from "../models/joiSchema.js";

export default function validateReqParameters(validator) {
    return (req, res, next) => {
        console.log(req.body)
        const { error } = validators[validator].validate(req.body);
        if (error === undefined) {
            next();
        }
        else {
            const err = new httpError(error, 400);
            return next(err);
        }
    }
}