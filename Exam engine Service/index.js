import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import errorHandler from './../Auth Service/middlewares/errorHandeling.js';
import examRouter from './exam/exam.routes.js';
import { verifyUserCredentials } from './middlewares/auth.js';

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/exams', verifyUserCredentials, examRouter);


app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);
})