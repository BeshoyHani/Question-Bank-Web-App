import axios from "axios";

const URL = 'http://localhost:4000/verify';

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
        res.status(error.response.status).json({message: error.response.data.message});
    });
}

export const verifyUserType = ([types]) => {
    return (req, res, next) => {
        types.forEach(type => {
            if (req.user.userType !== type) {
                res.status(401).json({ message: 'Unauthorized Access' });
                return;
            }
        });
        next();
    }
}