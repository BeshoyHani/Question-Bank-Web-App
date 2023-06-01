import { Router } from "express";
import { assignExam, createExam, getAssignedStudents, getExamList, startExam, submitExam } from "./exam.controller.js";
import validateReqParameters from "../middlewares/validateRequestInputs.js";
import errorHandler from "../middlewares/errorHandeling.js";

const examRouter = Router();

examRouter.post('/create', validateReqParameters('createExamSchema'), createExam);
examRouter.post('/assign', validateReqParameters('assignExamSchema'), assignExam);
examRouter.post('/submit', validateReqParameters('submitExamSchema'), submitExam);
examRouter.get('/start/:examID', startExam);
examRouter.get('/:type', getExamList);
examRouter.get('/:examID/students', getAssignedStudents);

examRouter.use(errorHandler);

export default examRouter;