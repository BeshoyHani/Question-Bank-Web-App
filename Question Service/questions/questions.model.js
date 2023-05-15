import mongoose from "mongoose";
import HttpError from './../models/http-error.js';

const resultsPerPage = 10;

const answerSchema = {
    id: String,
    name: String,
    description: String
};


const questionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    subcategory: {
        type: String
    },
    mark: {
        type: Number,
        min: 0,
        max: 100
    },
    expectedTime: {
        type: Number
    },
    correctAnswers: {
        type: [answerSchema.id]
    },
    createdBy: {
        type: String
    },
    created_at: {
        type: Date
    },
    answers: {
        type: [answerSchema]
    }
});

const Question = mongoose.model('question', questionSchema);

export const createQuestion = async (name, category, subcategory, mark, expectedTime, correctAnswers, createdBy, answers) => {
    try {
        const created_at = new Date();
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
        return savedQuestion;
    } catch (error) {
        throw new HttpError(error.message, 500);
    }
}

export const getQuestionById = async (id) => {
    try {
        const question = Question.findById(id);
        return question;
    } catch (error) {
        throw new HttpError(error.message, 500);
    }
}

export const getAllQuestions = async (category='', creator='', pageNo) => {
    try {
        const questions = Question.find(
            {
                $or: [
                    { category: { "$regex": category, "$options": "i" } },
                    { createdBy: creator },
                ]
            },
            null,
            { limit: resultsPerPage, skip: (pageNo - 1) * resultsPerPage });
        return questions;
    } catch (error) {
        throw new HttpError(error.message, 500);
    }
}

export const addnewAnswer = async (questionID, answerID, answerName, answerDescription) => {
    const answer = new answerSchema({
        id: answerID,
        name: answerName,
        description: answerDescription
    });

    try {
        const question = await Question.findByIdAndUpdate(questionID, { $push: { answers: answer } });
        return question;
    } catch (error) {
        throw new HttpError(error.message, 500);
    }
}

export const deleteAnswer = async (questionID, answerID) => {
    try {
        const question = await Question.findByIdAndUpdate(questionID, { $pull: { answers: { id: answerID } } });
        return question;
    } catch (error) {
        throw new HttpError(error.message, 500);
    }
}

export const updateQuestion = async (id, name, category, subcategory, mark, expectedTime) => {
    try {
        const question = Question.findByIdAndUpdate(id,
            {
                $set: {
                    name,
                    category,
                    subcategory,
                    mark,
                    expectedTime
                }
            },
            { new: true });
        return question;
    } catch (error) {
        throw new HttpError(error.message, 500);
    }
}

export const deleteQuestion = async (id) => {
    try {
        await Question.findByIdAndDelete(id);
        return;
    } catch (error) {
        throw new HttpError(error.message, 500);
    }
}