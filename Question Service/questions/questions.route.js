import { Router } from "express";
import {
    createQuestion,
    deleteQuestion,
    getAllQuestions,
    getQuestion,
    getQuestionsCount,
    getSetOfQuestion,
    updateQuestion
} from "./questions.controller.js";
import { verifyUserType } from "../middlewares/auth.js";
import userType from "../models/userType.js";
import validateReqParameters from "../middlewares/validateRequestInputs.js";
import { questionIDSchema, questionSchema } from "../models/joiSchema.js";

const router = Router();

router.get('/',
    verifyUserType([userType.TEACHER, userType.ADMIN, userType.SUPER_ADMIN]),
    getAllQuestions);

router.get('/set',
    getSetOfQuestion);

router.get('/count',
    verifyUserType([userType.TEACHER, userType.ADMIN, userType.SUPER_ADMIN]),
    getQuestionsCount);

router.get('/:questionID',
    validateReqParameters('questionIDSchema', 'params'),
    getQuestion);


router.post('/create',
    validateReqParameters('questionSchema'),
    verifyUserType([userType.TEACHER]),
    createQuestion);

router.post('/update',
    validateReqParameters('questionSchema'),
    verifyUserType([userType.TEACHER]),
    updateQuestion);

router.post('/delete',
    validateReqParameters('questionIDSchema'),
    verifyUserType([userType.ADMIN]),
    deleteQuestion);

// router.post('/answer/add',
//     verifyUserType([userType.TEACHER]),
//     addAnswerToQuestion);

// router.post('/answer/delete',
//     verifyUserType([userType.TEACHER]),
//     removeAnswerFromQuestion);

export default router;