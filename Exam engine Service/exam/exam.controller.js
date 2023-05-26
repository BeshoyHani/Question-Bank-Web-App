import httpError from '../../Auth Service/models/customError.js';
import database from '../config/database.js';

export const createExam = async (req, res, next) => {
    const { creatorID } = req.user || 'gghghg';
    const { name, passing_score, duration, questions } = req.body;
    try {
        const client = await database.connect();
        const SQL1 = `INSERT INTO exam(creatorID, name, passing_score, duration) VALUES ($1, $2, $3, $4);`
        const SQL2 = `SELECT id FROM exam WHERE name=($1)`;
        const SQL3 = `INSERT INTO exam_question(examID, questionID) 
                      SELECT ($1), question
                      FROM unnest(ARRAY[$2::BIGINT[]]) question`;
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
        return next(new httpError(error, 500));
    }
}