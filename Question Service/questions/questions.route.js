import { Router } from "express";
import {
    addAnswerToQuestion, editQuestion, findAllQuestions, findQuestion,
    makeQuestion, removeAnswerFromQuestion, removeQuestion
} from "./questions.controller.js";
import { verifyUserType } from "../middlewares/auth.js";
import userType from "../models/userType.js";

const router = Router();

router.get('/all',
    verifyUserType([userType.TEACHER, userType.ADMIN, userType.SUPER_ADMIN]),
    findAllQuestions);

router.get('/:questionID',
    findQuestion);

router.post('/create',
    verifyUserType([userType.TEACHER]),
    makeQuestion);

router.post('/update',
    verifyUserType([userType.TEACHER]),
    editQuestion);

router.post('/delete',
    verifyUserType([userType.ADMIN]),
    removeQuestion);

router.post('/answer/add',
    verifyUserType([userType.TEACHER]),
    addAnswerToQuestion);

router.post('/answer/delete',
    verifyUserType([userType.TEACHER]),
    removeAnswerFromQuestion);

export default router;