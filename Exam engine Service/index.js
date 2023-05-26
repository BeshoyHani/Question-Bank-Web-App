import express from 'express';
import dotenv from 'dotenv';
import errorHandler from './../Auth Service/middlewares/errorHandeling.js';
import examRouter from './exam/exam.routes.js';

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(examRouter);

app.use(errorHandler);
app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);
})