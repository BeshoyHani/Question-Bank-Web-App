import axios from 'axios';
axios.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem('access_token') || '';
const baseURL = 'http://localhost:4001/question';


export const createQuestion = async (name, category, subcategory, mark, expectedTime, answers, correctAnswers) => {
    let res;
    try {
        const URL = baseURL + '/create';
        res = await axios.post(URL, { name, category, subcategory, mark, expectedTime, answers, correctAnswers });
        return res.data;
    } catch (error) {
        throw Error(error.response.data.message);
    }
}

export const getAllQuestions = async () => {
    let res;
    try {
        const URL = baseURL + '/all';
        res = await axios.get(URL);
        console.log(res.data.questions)
        return res.data.questions;
    } catch (error) {
        throw Error(error.response.data.message);
    }
}

export const deleteQuestion = async (id) => {
    let res;
    try {
        const URL = baseURL + '/delete';
        res = await axios.post(URL, { id });
        console.log(res.data.questions)
        return res.data.question;
    } catch (error) {
        throw Error(error.response.data.message);
    }
}