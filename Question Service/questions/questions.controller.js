import HttpError from '../models/http-error.js';
import Question from './questions.model.js';

const resultsPerPage = 1;

export const makeQuestion = async (req, res) => {
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
        res.status(error.code).json({ message: error.message });
    }
}

export const findQuestion = async (req, res) => { //params
    const { questionID } = req.params;
    try {
        const question = await Question.findById(questionID);
        res.status(200).json({ message: 'Found 1 Question', question });
    } catch (error) {
        res.status(error.code).json({ message: error.message });
    }
}

export const findAllQuestions = async (req, res) => { //params for pageNo & query for quesries
    const { page } = req.query;
    const { category, createdBy } = req.query;
    try {
        const questions = Question.find(
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
        res.status(error.code).json({ message: error.message });
    }
}

export const findQuestionsCount = async (req, res) => {
    try {
        const count = await Question.count({});
        res.status(200).json({
            message: `Found ${data.count} Question(s)`,
            count: count,
            questionsPerPage: resultsPerPage
        });
    } catch (error) {
        console.log(error.message)
        res.status(error.code).json({ message: error.message });
    }
}

export const editQuestion = async (req, res) => { //params
    const { id, name, category, subcategory, mark, expectedTime, answers, correctAnswers } = req.body;
    const userID = req.user.userID;
    try {
        const question = await Question.findById(questionID);
        if (question.createdBy !== userID) {
            throw new HttpError('Unauthorized Access', 401);
        }
        const updatedQuestion = Question.findByIdAndUpdate(id,
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
        res.status(error.code || 500).json({ message: error.message });
    }
}

export const removeQuestion = async (req, res) => { //params
    const { id } = req.body;
    try {
        const question = await Question.findByIdAndDelete(id);
        res.status(200).json({ message: 'Question Deleted Successfully', question });
    } catch (error) {
        res.status(error.code).json({
            message: error.message,
            question: question
        });
    }
}

// export const addAnswerToQuestion = async (req, res) => {
//     const { questionID, answerID, answerName, answerDescription } = req.body;
//     const userID = req.user.userID;
//     try {
//         const question = await getQuestionById(id);
//         if (question.createdBy !== userID) {
//             throw new HttpError('Unauthorized Access', 401);
//         }
//         const updatedQuestion = await addnewAnswer(questionID, answerID, answerName, answerDescription);
//         res.status(200).json({ message: 'Answer Added Successfully', updatedQuestion });
//     } catch (error) {
//         res.status(error.code).json({ message: error.message });
//     }
// }

// export const removeAnswerFromQuestion = async (req, res) => {
//     const { questionID, answerID } = req.body;
//     const userID = req.user.userID;
//     try {
//         const question = await getQuestionById(id);
//         if (question.createdBy !== userID) {
//             throw new HttpError('Unauthorized Access', 401);
//         }
//         const updatedQuestion = await deleteAnswer(questionID, answerID);
//         res.status(200).json({ message: 'Answer Deleted Successfully', updatedQuestion });
//     } catch (error) {
//         res.status(error.code).json({ message: error.message });
//     }
// }