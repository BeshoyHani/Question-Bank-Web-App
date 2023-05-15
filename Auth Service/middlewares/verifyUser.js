
import  Jwt  from 'jsonwebtoken';
export const verifyUser = (req, res, next) => {
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

const decodeToken = (auth) => {
    const token = auth.split(' ')[1];
    const data = Jwt.verify(token, process.env.TOKEN_SECRET);
    return data;
}