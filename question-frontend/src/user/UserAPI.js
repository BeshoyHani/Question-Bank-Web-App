import axios from 'axios';
const baseURL = 'http://localhost:4000/users';

export const getAllUsers = async (type) => {
    let res;
    try {
        const URL = baseURL + (type ? `?type=${type}` : '/');
        res = await axios.get(URL);
        return res.data.users;
    } catch (error) {
        throw Error(error.response.data.error);
    }
}

export const getCurrentUser = async (username) => {
    let res;
    try {
        const URL = baseURL + `/${username}`;
        res = await axios.get(URL);
        if (res.data.user.username !== username) {
            throw new Error('You aren\'t allowed to View this User Info');
        }
        return res.data.user;
    } catch (error) {
        console.log(error)
        throw Error(error.response.data.error.message);
    }
}

export const changeUserType = async (username, userType) => {
    let res;
    try {
        const URL = baseURL + '/update';
        res = await axios.post(URL, {
            username,
            userType
        });
        return res.data.user;
    } catch (error) {
        throw Error(error.response.data.error);
    }
}

export const deleteUser = async (username) => {
    let res;
    try {
        const URL = baseURL + '/delete';
        res = await axios.post(URL, {
            username
        });
        return res.data.user;
    } catch (error) {
        console.log(error.response.data)
        throw Error(error.response.data.error.message);
    }
}
