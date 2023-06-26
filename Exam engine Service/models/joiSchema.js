import Joi from 'joi';

const minLength = 3;
const maxLength = 15;

const createExamSchema = Joi.object({
    name: Joi.string()
        .min(minLength)
        .max(maxLength)
        .required(),

    passing_score: Joi.number()
        .min(5)
        .max(1000)
        .required(),

    duration: Joi.number()
        .min(0.5)
        .max(10)
        .required(),

    questions: Joi.array()
        .items(Joi.string())
        .required()
});

const assignExamSchema = Joi.object({
    examID: Joi.number()
        .required(),

    stdIDs: Joi.array()
        .items(Joi.string())
        .required(),

    start_time: Joi.date()
        .required()
});

const startExam = Joi.object({
    stdID: Joi.string().required()
});

const submitExamSchema = Joi.object({
    examID: Joi.string().required(),
    questions: Joi.array().required()
});

export {
    createExamSchema,
    assignExamSchema,
    startExam,
    submitExamSchema
};