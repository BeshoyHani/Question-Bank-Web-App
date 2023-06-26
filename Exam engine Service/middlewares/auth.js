import axios from "axios";

const URL = 'http://localhost:4000/auth/verify';

export const verifyUserCredentials = async (req, res, next) => {
    axios.defaults.headers.Authorization = req.headers.authorization;
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
       return next(error);
    });
}