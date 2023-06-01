import axios from 'axios';
const baseURL = 'http://localhost:4002/exams';

export const createExam = async (obj) => {
    let res;
    try {
        const URL = baseURL + '/create';
        res = await axios.post(URL, obj);
        return res.data.message;
    } catch (error) {
        throw Error(error.response.data.error.message);
    }
}

export const getExams = async (type) => {
    let res;
    try {
        const URL = baseURL + `/${type}`;
        res = await axios.get(URL);
        return res.data.exams;
    } catch (error) {
        throw Error(error.response.data.message);
    }
}

export const assignExam = async (examID, examDate, stdIDs) => {
    let res;
    try {
        const URL = baseURL + `/assign`;
        res = await axios.post(URL, {
            examID: examID,
            stdIDs: stdIDs,
            start_time: examDate
        });
        return res.data.message;
    } catch (error) {
        throw Error(error.response.data.message);
    }
}

export const getAssignedStudents = async (examID) => {
    let res;
    try {
        const URL = baseURL + `/${examID}/students`;
        res = await axios.get(URL);
        return res.data.students;
    } catch (error) {
        throw Error(error.response.data.message);
    }
}

export const takeExam = async (examID) => {
    let res;
    try {
        const URL = baseURL + `/start/${examID}`;
        res = await axios.get(URL);
        const { questions, passing_score } = res.data;
        return { questions, passing_score };
    } catch (error) {
        throw Error(error.response);
    }
}

export const submitExam = async (questions) => {
    let res;
    try {
        const URL = baseURL + `/submit`;
        res = await axios.post(URL, { questions });
        return res.data.score;
    } catch (error) {
        throw Error(error.response);
    }
}