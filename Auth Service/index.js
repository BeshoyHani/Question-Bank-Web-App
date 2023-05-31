import express from 'express';
import dotenv from 'dotenv';
import authRouter from './auth/auth.routes.js';
import userRouter from './users/users.routes.js';
import mongoose from 'mongoose';
import cors from 'cors';
import errorHandler from './middlewares/errorHandeling.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.mongoURI).then(() => {
        console.log(`Server Started and listens to ${process.env.PORT}`);
    });
})