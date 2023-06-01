import HttpError from '../models/customError.js';
import Question from './questions.model.js';

const resultsPerPage = 10;

export const createQuestion = async (req, res, next) => {
    const { name, category, subcategory, mark, expectedTime, answers, correctAnswers } = req.body;
    const createdBy = req.user.userID;
    const created_at = new Date();
    try {
        const question = new Question({
            name,
            category,
            subcategory,
            mark,
            expectedTime,
            correctAnswers,
            createdBy,
            created_at,
            answers
        });
        const savedQuestion = await question.save();
        res.status(200).json({ message: 'Question Created Successfully', question: savedQuestion });
    } catch (error) {
        return next(error);
    }
}

export const getQuestion = async (req, res, next) => { //params
    const { questionID } = req.params;
    try {
        const question = await Question.findById(questionID);
        res.status(200).json({ message: 'Found 1 Question', question });
    } catch (error) {
        return next(error);
    }
}

export const getSetOfQuestion = async (req, res, next) => {
    const { qIDs } = req.query;
    try {
        const questions = await Question.find({ _id: { $in: qIDs } });
        res.status(200).json({ message: `Found ${questions.length} Question`, questions });
    } catch (error) {
        return next(error);
    }
}

export const getAllQuestions = async (req, res, next) => { //params for pageNo & query for quesries
    let { page, category = '', creator = '', qIDs } = req.query;
    page = Math.max(1, page);
    try {
        const questions = qIDs?.length > 0 ?
            await Question.find({
                _id: { $in: qIDs }
            }) :
            await Question.find(
                {
                    $or: [
                        { category: { "$regex": category, "$options": "i" } },
                        { createdBy: creator },
                    ]
                },
                null,
                { limit: resultsPerPage, skip: (page - 1) * resultsPerPage });
        res.status(200).json({ message: `Found ${questions.length} Question(s)`, questions });
    } catch (error) {
        return next(error);
    }
}

export const getQuestionsCount = async (req, res, next) => {
    try {
        const count = await Question.count({});
        res.status(200).json({
            message: `Found ${count} Question(s)`,
            count: count,
            questionsPerPage: resultsPerPage
        });
    } catch (error) {
        return next(error);
    }
}

export const updateQuestion = async (req, res, next) => { //params
    const { id, name, category, subcategory, mark, expectedTime, answers, correctAnswers } = req.body;
    const userID = req.user.userID;
    try {
        const question = await Question.findById(id);
        if (question.createdBy !== userID) {
            throw new HttpError('Unauthorized Access', 401);
        }
        const updatedQuestion = await Question.findByIdAndUpdate(id,
            {
                $set: {
                    name,
                    category,
                    subcategory,
                    mark,
                    expectedTime,
                    correctAnswers,
                    answers
                }
            },
            { new: true });
        res.status(200).json({ message: 'Question Updated Successfully', updatedQuestion });
    } catch (error) {
        return next(error);
    }
}

export const deleteQuestion = async (req, res, next) => { //params
    const { id } = req.body;
    try {
        const question = await Question.findByIdAndDelete(id);
        res.status(200).json({ message: 'Question Deleted Successfully', question });
    } catch (error) {
        return next(error);
    }
}