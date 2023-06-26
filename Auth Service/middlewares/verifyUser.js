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

export const verifyKeycloakToken = (req, res, next) => {
    try {
        const auth_header = req.headers.authorization || req.body.token;
        const token = auth_header.split(' ')[1];
        const public_key = `-----BEGIN PUBLIC KEY-----\n${process.env.PUBLIC_KEY}\n-----END PUBLIC KEY-----`;
        const data = Jwt.verify(token, public_key, {
            algorithms: ['RS256']
        });
        next();
    } catch (error) {
        return next(new httpError(error, 401));
    }
}

export const verifyUserType = (types) => {
    return (req, res, next) => {
        const user = types.find(type => req.user.userType === type);
        if (!user) {
            const error = new httpError('Unauthorized Access, Your role doesn\'t allow to perform such operation', 401);
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