import Joi from 'joi';

const minLength = 3;
const maxLength = 15;

const questionSchema = Joi.object({
    name: Joi.string()
        .min(minLength)
        .required(),

    category: Joi.string()
        .min(minLength)
        .required(),

    subcategory: Joi.string(),

    mark: Joi.number()
        .min(0)
        .max(1000)
        .required(),

    expectedTime: Joi.date().required(),

    correctAnswers: Joi.array()
        .items(Joi.string()
        ),

    answers: Joi.array()
        .items(Joi.object({
            id: Joi.number().required(),
            _id: Joi.string(),
            name: Joi.string(),
            description: Joi.string()
        }))
}).unknown(true);

const questionIDSchema = Joi.object({
    id: Joi.string().required()
});
export {
    questionSchema,
    questionIDSchema
};