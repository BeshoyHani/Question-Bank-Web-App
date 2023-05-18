import axios from 'axios';
axios.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem('access_token') || '';
const baseURL = 'http://localhost:4000/auth';


export const login = async (username, password) => {
    let res;
    try {
        const URL = baseURL + '/login';
        res = await axios.post(URL, { username, password });
        axios.defaults.headers.Authorization = res.data.token;
        localStorage.setItem('access_token', res.data.token);
        localStorage.setItem('user-type', res.data.userType);
        localStorage.setItem('username', res.data.username);
        return res.data;
    } catch (error) {
        throw Error(error.response.data.error);
    }
}


export const signup = async (username, userType, password) => {
    let res;
    try {
        const URL = baseURL + '/signup';
        res = await axios.post(URL, { username, userType, password });
        console.log(res)
        return res.data;
    } catch (error) {
        throw Error(error.response.data.error);
    }
}