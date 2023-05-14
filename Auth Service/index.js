import express from 'express';
import dotenv from 'dotenv';
import router from './users/users.routes.js';
import mongoose from 'mongoose';

dotenv.config();
const app = express();

app.use(express.json());
app.use(router);
app.use((error, req, res, next) => {
        return next(error);
});

app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.mongoURI).then(() => {
        console.log(`Server Started and listens to ${process.env.PORT}`);
    });
})