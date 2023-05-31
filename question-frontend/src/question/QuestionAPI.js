import axios from 'axios';
const baseURL = 'http://localhost:4001/questions';


export const createQuestion = async (obj) => {
    const {name, category, subcategory, mark, expectedTime, answers, correctAnswers} = obj
    let res;
    try {
        const URL = baseURL + '/create';
        res = await axios.post(URL, { name, category, subcategory, mark, expectedTime, answers, correctAnswers });
        return res.data;
    } catch (error) {
        throw Error(error.response.data.message);
    }
}

export const updateQuestion = async (obj) => {
    let res;
    try {
        const URL = baseURL + '/update';
        res = await axios.post(URL, obj);
        return res.data.updatedQuestion;
    } catch (error) {
        throw Error(error.response.data.message);
    }
}

export const getQuestionById = async (id) => {
    let res;
    try {
        const URL = baseURL + `/${id}`;
        res = await axios.get(URL);
        return res.data.question;
    } catch (error) {
        throw Error(error.response.data.message);
    }
}

export const getAllQuestions = async (pageNo) => {
    let res;
    try {
        const URL = baseURL + `?page=${pageNo}`;
        res = await axios.get(URL);
        return res.data.questions;
    } catch (error) {
        throw Error(error.response.data.message);
    }
}

export const getQuestionCount = async () => {
    let res;
    try {
        const URL = baseURL + `/count`;
        res = await axios.get(URL);
        return res.data;
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