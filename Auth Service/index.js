import express from 'express';
import dotenv from 'dotenv';
import router from './users/users.routes.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(router);
app.use((error, req, res, next) => {
    next(error);
});

app.listen(process.env.PORT, () => {
    console.log(`Server Started and listens to ${process.env.PORT}`);
})