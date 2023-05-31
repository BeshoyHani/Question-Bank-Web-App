import mongoose from "mongoose";
import HttpError from '../models/customError.js';

const resultsPerPage = 1;

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
export default Question;