import { createUser, findUser } from "./users.model.js";
import bcrypt from 'bcrypt';
import Jwt from "jsonwebtoken";
import HttpError from "../models/http-error.js";

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await findUser(username);
        if (!user) {
            throw new HttpError('User doesn\'t exist', 404);
        }
        const hashed_pwd = user.password;
        const is_correct_pwd = await bcrypt.compare(password, hashed_pwd);
        if (is_correct_pwd) {
            const token = Jwt.sign({
                userID: user._id,
                username: user.username,
                userType: user.userType
            }, process.env.TOKEN_SECRET,
                {
                    expiresIn: '1h'
                });
            res.status(200).json({
                userType: user.userType,
                token: token
            });
        } else {
            const error = new HttpError('Password is not correct', 401);
            res.status(error.code).json({ error: error.message });
        }
    } catch (error) {
        res.status(error.code).json({ error: error.message });
    }
}

export const signup = async (req, res) => {
    const { username, password, userType } = req.body;
    try {
        const salt_rounds = +(process.env.SALT_ROUNDS);
        const hashed_pwd = await bcrypt.hash(password, salt_rounds);
        const user = await createUser(username, hashed_pwd, userType);
        const token = Jwt.sign({
            userID: user._id,
            username: user.username,
            userType: user.userType
        }, process.env.TOKEN_SECRET,
            {
                expiresIn: '1h'
            });
        res.status(200).json({
            userType: user.userType,
            token: token
        });

    } catch (error) {
        res.status(error.code).json({ error: error.message });
    }
}