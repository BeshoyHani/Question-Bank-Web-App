import axios from 'axios';
import httpError from '../../Auth Service/models/customError.js';
import database from '../config/database.js';
import userType from './../models/userType.js';

const QUESTION_SERVICE_URL = 'http://localhost:4001/questions';
const User_SERVICE_URL = 'http://localhost:4000/users';

export const createExam = async (req, res, next) => {
    const creatorID = req.user.userID;
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
}


export const startExam = async (req, res, next) => {
    const { examID } = req.params;
    const { userID } = req.user;
    try {
        const client = await database.connect();
        const examID_SQL = `SELECT e.id, e.passing_score FROM exam_student es INNER JOIN exam e ON es.examID=e.id AND es.examID=($1) AND es.stdID=($2);`;
        const questionIDs_SQL = `SELECT eq.questionid FROM exam_question eq WHERE eq.examID=($1);`;
        let result = await client.query(examID_SQL, [examID, userID]);
        const id = result.rows[0].id;
        const passing_score = result.rows[0].passing_score;
        if (id === undefined)
            throw new httpError('You are not assigned to this exam', 404);
        result = (await client.query(questionIDs_SQL, [id])).rows;
        const questionIDs = result.map(q => q.questionid);

        let response
        try {
            response = await axios.get(`${QUESTION_SERVICE_URL}/set`, {
                params: {
                    qIDs: questionIDs
                }
            });
        } catch (error) {
            console.log(error)
        }
        result = response.data.questions;
        const questions = result.map(q => ({
            _id: q._id,
            name: q.name,
            description: q.description,
            answers: q.answers,
            duration: q.expectedTime
        }))


        res.status(200).json({
            message: `Questions retrieved Successfully`,
            questions,
            passing_score
        });
        const start_exam_SQL = 'UPDATE exam_student SET is_started=true WHERE stdid=($1) AND examID=($2)';
        await client.query(start_exam_SQL, [userID, examID]);
    } catch (error) {
        console.log(error)
        return next(error);
    }
}


export const submitExam = async (req, res, next) => {
    const { examID, questions } = req.body;
    const { userID } = req.user;
    try {
        const qIDs = questions.map(q => q._id);
        const response = await axios.get(`${QUESTION_SERVICE_URL}/set`, {
            params: {
                qIDs: qIDs
            }
        });
        const originalQuestions = response.data.questions;
        let score = 0;
        originalQuestions.forEach((q, index) => {
            let counter = 0;
            q.correctAnswers.forEach(ans => {
                let found = questions[index].selectedAnswers?.find(answer => answer === ans);
                counter += found ? 1 : 0;
            });
            if (counter === q.correctAnswers.length)
                score += q.mark;
        });

        const client = await database.connect();
        const SQL = `UPDATE exam_student SET score=($1) WHERE stdid=($2) AND examID=($3)`;
        await client.query(SQL, [score, userID, examID]);
        res.status(200).json({
            message: 'Exam Submitted Successfully',
            score: score
        });
    } catch (error) {
        return next(error);
    }

}

export const getExamList = async (req, res, next) => {
    try {
        const { type } = req.params;
        const { userID } = req.user;
        const client = await database.connect();
        let SQL = ``, result;
        switch (type) {
            case userType.STUDENT:
                SQL = `SELECT e.*, es.score, es.start_time, es.is_started FROM exam e 
                INNER JOIN exam_student es ON e.id=es.examid AND es.stdid=($1);`;
                result = await client.query(SQL, [userID]);
                break;
            case userType.TEACHER:
                SQL = `SELECT * FROM exam WHERE creatorid=($1);`;
                result = await client.query(SQL, [userID]);
                break;

            case userType.ADMIN || userType.SUPER_ADMIN:
                SQL = `SELECT * FROM exam`;
                result = await client.query(SQL);
                break;
        }
        const exams = result.rows;
        res.status(200)
            .json({
                message: `Found ${result.rowCount} Exam(s)`,
                exams: exams
            });
    } catch (error) {
        console.log(error)
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
                IDs: IDs.length ? IDs : ['0']
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