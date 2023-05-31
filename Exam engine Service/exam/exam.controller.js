import axios from 'axios';
import httpError from '../../Auth Service/models/customError.js';
import database from '../config/database.js';

const QUESTION_SERVICE_URL = 'http://localhost:4001/questions';
const User_SERVICE_URL = 'http://localhost:4000/users';

export const createExam = async (req, res, next) => {
    const  creatorID  = req.user.userID;
    const { name, passing_score, duration, questions } = req.body;
    try {
        const client = await database.connect();
        const SQL1 = `INSERT INTO exam(creatorID, name, passing_score, duration) VALUES ($1, $2, $3, $4);`
        const SQL2 = `SELECT id FROM exam WHERE name=($1)`;
        const SQL3 = `INSERT INTO exam_question(examID, questionID) 
                      SELECT ($1), question
                      FROM unnest(ARRAY[$2::VARCHAR[]]) question`;
        try {
            await client.query('BEGIN');
            try {
                await client.query(SQL1, [creatorID, name, passing_score, duration]);
                const result = await client.query(SQL2, [name]);
                const id = result.rows[0].id;
                await client.query(SQL3, [id, questions]);
                await client.query('COMMIT');
            } catch (error) {
                await client.query('ROLLBACK');
                return next(new httpError(error, 500));
            }
        } finally {
            client.release();
        }

        res.status(200).json({
            message: 'Exam Created Succesfully'
        })
    } catch (error) {
        return next(new httpError(`Creating Exam Faild!`, 500));
    }
}


export const assignExam = async (req, res, next) => {
    const { examID, stdIDs, start_time } = req.body;
    try {
        const client = await database.connect();
        const SQL = `INSERT INTO exam_student(examID, start_time, stdID)  SELECT ($1), ($2), std
                     FROM unnest(ARRAY[$3::VARCHAR[]]) std`;
        await client.query(SQL, [examID, start_time, stdIDs]);

        res.status(200).json({
            message: 'Exam Assigned Succesfully'
        });
    } catch (error) {
        return next(error);
    }
    res.end()
}


export const startExam = async (req, res, next) => {
    const {examID} = req.params;
    const { stdID } = req.body;
    try {
        const client = await database.connect();
        const examID_SQL = `SELECT e.id FROM exam_student es INNER JOIN exam e ON es.examID=e.id AND es.examID=($1) AND es.stdID=($2);`;
        const questionIDs_SQL = `SELECT eq.questionid FROM exam_question eq WHERE eq.examID=($1);`;
        let result = await client.query(examID_SQL, [examID, stdID]);
        const id = result.rows[0].id;
        if (id === undefined)
            throw new httpError('You are not assigned to this exam', 404);
        result = (await client.query(questionIDs_SQL, [id])).rows;
        const questionIDs = result.map(q => q.questionid);

        /*
        to be continued after configure question service
         */
        const response = await axios.get(`${QUESTION_SERVICE_URL}`, {
            params: {
                qIDs: questionIDs
            }
        });
        result = response.data.questions;
        const questions = result.map(q => ({
            _id: q._id,
            name: q.name,
            description: q.description,
            answers: q.answers
        }))
        res.status(200).json({
            message: `Questions retrieved Successfully`,
            questions
        });
    } catch (error) {
        return next(new httpError(`Oops! Someting went Wrong. Please try again`, 500));
    }
}


export const submitExam = async (req, res, next) => {
    const { questions } = req.body;
    try {
        const qIDs = questions.map(q => q._id);
        const response = await axios.get(`${QUESTION_SERVICE_URL}`, {
            params: {
                qIDs: qIDs
            }
        });
        const originalQuestions = response.data.questions;
        /*
        to be continued after frontend
        */

        res.status(200).json({
            message: 'Exam Submitted Successfully',
            score: 80
        });
    } catch (error) {
        return next(error);
    }

}

export const getExamList = async (req, res, next) => {
    try {
        const client = await database.connect();
        const SQL = `SELECT * FROM exam`;
        const result = await client.query(SQL);
        const exams = result.rows;
        res.status(200)
            .json({
                message: `Found ${result.rowCount} Exam(s)`,
                exams: exams
            });
    } catch (error) {
        return next(error);
    }
}

export const getAssignedStudents = async (req, res, next) => {
    try {
        const { examID } = req.params;
        const client = await database.connect();
        const SQL = `SELECT stdid AS id FROM exam_student WHERE examid=($1)`;
        const result = await client.query(SQL, [examID]);
        const stdIDs = result.rows;
        const IDs = stdIDs.map(std => std.id);

        const response = await axios.get(User_SERVICE_URL, {
            params: {
                IDs:  IDs.length? IDs : ['0']
            }
        })
        const students = response.data.users.map(std => std.username);
        res.status(200)
            .json({
                message: `Found ${result.rowCount} Student(s)`,
                students: students
            });
    } catch (error) {
        return next(error); 
    }
}