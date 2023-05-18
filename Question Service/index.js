import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import questionRouter from "./questions/questions.route.js";
import cors from 'cors';
import { verifyUserCredentials } from "./middlewares/auth.js";
dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/question', verifyUserCredentials, questionRouter);

app.listen(PORT, () => {
    mongoose.connect(process.env.mongoURI).then(() => {
        console.log(`Server started and listens on port ${PORT}`);
    });
})