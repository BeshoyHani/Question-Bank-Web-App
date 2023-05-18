import axios from "axios";

const URL = 'http://localhost:4000/auth/verify';

export const verifyUserCredentials = async (req, res, next) => {
    axios({
        method: 'post',
        url: URL,
        headers: {
            Authorization: req.headers.authorization
        }
    }).then((response) => {
        const data = response.data;
        req.user = data.user;
        next();
    }).catch(error => {
        res.status(error.response.status || 401).json({ message: error.response.data.message });
    });
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