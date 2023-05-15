import { Router } from "express";
import {
    addAnswerToQuestion, editQuestion, findAllQuestions, findQuestion,
    makeQuestion, removeAnswerFromQuestion, removeQuestion
} from "./questions.controller.js";

const router = Router();

router.get('/all', findAllQuestions);
router.get('/:questionID', findQuestion);
router.post('/create', makeQuestion);
router.post('/update', editQuestion);
router.post('/delete/:questionID', removeQuestion);
router.post('/answer/add', addAnswerToQuestion);
router.post('/answer/delete', removeAnswerFromQuestion);

export default router;