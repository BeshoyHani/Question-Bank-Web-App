
import Jwt from 'jsonwebtoken';
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
            res.status(401).json({ message: 'Unauthorized Access' });
        } else
            return next();
    };
}

const decodeToken = (auth) => {
    const token = auth.split(' ')[1];
    const data = Jwt.verify(token, process.env.TOKEN_SECRET);
    return data;
}