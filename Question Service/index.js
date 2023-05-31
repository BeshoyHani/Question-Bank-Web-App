import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import questionRouter from "./questions/questions.route.js";
import cors from 'cors';
import { verifyUserCredentials } from "./middlewares/auth.js";
import errorHandler from "./middlewares/errorHandeling.js";
dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/questions', verifyUserCredentials, questionRouter);
app.use(errorHandler);

app.listen(PORT, () => {
    mongoose.connect(process.env.mongoURI).then(() => {
        console.log(`Server started and listens on port ${PORT}`);
    });
})