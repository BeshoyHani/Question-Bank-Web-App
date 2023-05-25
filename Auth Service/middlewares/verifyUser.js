import Jwt from 'jsonwebtoken';
import httpError from './../models/customError.js';
export const verifyUserCredintials = (req, res, next) => {
    try {
        const token = req.headers.authorization || req.body.token;
        const data = decodeToken(token);
        const { username, userID, userType } = data;
        req.user = {
            userID,
            username,
            userType
        };
        next();
    } catch (error) {
        req.user = {};
        next();
    }
}

export const verifyUserType = (types) => {
    return (req, res, next) => {
        const user = types.find(type => req.user.userType === type);
        if (!user) {
            const error = httpError('Unauthorized Access, Your role doesn\'t allow to perform such operation', 401);
            return next(error);
        } else
            return next();
    };
}

const decodeToken = (auth) => {
    const token = auth.split(' ')[1];
    const data = Jwt.verify(token, process.env.TOKEN_SECRET);
    return data;
}