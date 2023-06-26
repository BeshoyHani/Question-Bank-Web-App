import axios from 'axios';
const baseURL = 'http://localhost:4000/auth';
axios.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem('access_token');

export const login = async (username, password) => {
    let res;
    try {
        const URL = baseURL + '/login';
        res = await axios.post(URL, { username, password }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access_token')
            }
        });
        localStorage.setItem('access_token', res.data.token);
        localStorage.setItem('user-type', res.data.userType);
        localStorage.setItem('username', res.data.username);
        axios.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem('access_token');
        return res.data;
    } catch (error) {
        throw Error(error.response.data.error.message);
    }
}


export const signup = async (username, userType, password) => {
    let res;
    try {
        const URL = baseURL + '/signup';
        res = await axios.post(URL, { username, userType, password }, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access_token')
            }
        });
        return res.data;
    } catch (error) {
        throw Error(error.response.data.error.message);
    }
}