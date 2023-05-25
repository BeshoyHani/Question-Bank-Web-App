import mongoose from "mongoose";
import HttpError from './../models/http-error.js';

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


// export const addnewAnswer = async (questionID, answerID, answerName, answerDescription) => {
//     const answer = new answerSchema({
//         id: answerID,
//         name: answerName,
//         description: answerDescription
//     });

//     try {
//         const question = await Question.findByIdAndUpdate(questionID, { $push: { answers: answer } });
//         return question;
//     } catch (error) {
//         throw new HttpError(error.message, 500);
//     }
// }

// export const deleteAnswer = async (questionID, answerID) => {
//     try {
//         const question = await Question.findByIdAndUpdate(questionID, { $pull: { answers: { id: answerID } } });
//         return question;
//     } catch (error) {
//         throw new HttpError(error.message, 500);
//     }
// }
