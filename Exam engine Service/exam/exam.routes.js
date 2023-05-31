import { Router } from "express";
import { assignExam, createExam, getAssignedStudents, getExamList, startExam } from "./exam.controller.js";
import validateReqParameters from "../middlewares/validateRequestInputs.js";
import errorHandler from "../middlewares/errorHandeling.js";

const examRouter = Router();

examRouter.post('/create', validateReqParameters('createExamSchema'), createExam);
examRouter.post('/assign', validateReqParameters('assignExamSchema'), assignExam);
examRouter.post('/start', validateReqParameters('startExam'), startExam);
examRouter.get('/', getExamList);
examRouter.get('/:examID/students', getAssignedStudents);

examRouter.use(errorHandler);

export default examRouter;