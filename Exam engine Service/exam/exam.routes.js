import { Router } from "express";
import { createExam } from "./exam.controller.js";

const examRouter = Router();

examRouter.post('/create', createExam);

export default examRouter;