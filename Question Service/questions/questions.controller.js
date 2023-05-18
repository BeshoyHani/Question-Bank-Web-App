import HttpError from '../models/http-error.js';
import {
    createQuestion, getAllQuestions, getQuestionById,
    updateQuestion, deleteQuestion, addnewAnswer, deleteAnswer
} from './questions.model.js';

export const makeQuestion = async (req, res) => {
    const { name, category, subcategory, mark, expectedTime, answers, correctAnswers } = req.body;
    const createdBy = req.user.userID;
    try {
        const question = await createQuestion(name, category, subcategory, mark, expectedTime, correctAnswers, createdBy, answers);
        res.status(200).json({ message: 'Question Created Successfully', question });
    } catch (error) {
        res.status(error.code).json({ message: error.message });
    }
}

export const findQuestion = async (req, res) => { //params
    const { questionID } = req.params;
    try {
        const question = await getQuestionById(questionID);
        res.status(200).json({ message: 'Found 1 Question', question });
    } catch (error) {
        res.status(error.code).json({ message: error.message });
    }
}

export const findAllQuestions = async (req, res) => { //params for pageNo & query for quesries
    const { pageNo } = req.params;
    const { category, createdBy } = req.query;
    try {
        const questions = await getAllQuestions(category, createdBy, pageNo);
        res.status(200).json({ message: `Found ${questions.length} Question(s)`, questions });
    } catch (error) {
        res.status(error.code).json({ message: error.message });
    }
}

export const editQuestion = async (req, res) => { //params
    const { id, name, category, subcategory, mark, expectedTime } = req.body;
    const userID = req.user.userID;
    try {
        const question = await getQuestionById(id);
        if (question.createdBy !== userID) {
            throw new HttpError('Unauthorized Access', 401);
        }
        const updatedQuestion = await updateQuestion(id, name, category, subcategory, mark, expectedTime);
        res.status(200).json({ message: 'Question Updated Successfully', updatedQuestion });
    } catch (error) {
        res.status(error.code).json({ message: error.message });
    }
}

export const removeQuestion = async (req, res) => { //params
    const { id } = req.body;
    try {
        const question = await deleteQuestion(id);
        res.status(200).json({ message: 'Question Deleted Successfully', question });
    } catch (error) {
        res.status(error.code).json({
            message: error.message,
            question: question
        });
    }
}

export const addAnswerToQuestion = async (req, res) => {
    const { questionID, answerID, answerName, answerDescription } = req.body;
    const userID = req.user.userID;
    try {
        const question = await getQuestionById(id);
        if (question.createdBy !== userID) {
            throw new HttpError('Unauthorized Access', 401);
        }
        const updatedQuestion = await addnewAnswer(questionID, answerID, answerName, answerDescription);
        res.status(200).json({ message: 'Answer Added Successfully', updatedQuestion });
    } catch (error) {
        res.status(error.code).json({ message: error.message });
    }
}

export const removeAnswerFromQuestion = async (req, res) => {
    const { questionID, answerID } = req.body;
    const userID = req.user.userID;
    try {
        const question = await getQuestionById(id);
        if (question.createdBy !== userID) {
            throw new HttpError('Unauthorized Access', 401);
        }
        const updatedQuestion = await deleteAnswer(questionID, answerID);
        res.status(200).json({ message: 'Answer Deleted Successfully', updatedQuestion });
    } catch (error) {
        res.status(error.code).json({ message: error.message });
    }
}