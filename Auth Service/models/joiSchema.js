import Joi from 'joi';
import userType from './userType.js';

const minLength = 3;
const maxLength = 15;

const loginSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(minLength)
        .max(maxLength)
        .required(),

    password: Joi.string()
        .alphanum()
        .min(minLength)
        .max(maxLength)
        .allow('')
});

const signupSchema = loginSchema.keys({
    userType: Joi.string().valid(...Object.values(userType))
});

const userSchema = Joi.object({
    username: signupSchema.extract('username').required(),
});

const updateUserSchema = Joi.object({
    username: signupSchema.extract('username'),
    userType: signupSchema.extract('userType').required()
});

export {
    loginSchema,
    signupSchema,
    userSchema,
    updateUserSchema
};