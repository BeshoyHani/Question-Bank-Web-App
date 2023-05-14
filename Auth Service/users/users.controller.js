import { createUser, findUser } from "./users.model.js";
import bcrypt from 'bcrypt';
import Jwt from "jsonwebtoken";

export const login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await findUser(username);
        const hashed_pwd = user.password;
        const is_correct_pwd = await bcrypt.compare(password, hashed_pwd);
        if (is_correct_pwd) {
            const token = Jwt.sign({
                userID: user._id,
                username: user.username,
                userType: user.userType
            }, process.env.TOKEN_SECRET);
            res.status(200).json({
                userType: user.userType,
                token: token
            });
        } else {
            return next('Password is not correct');
        }
    } catch (error) {
        return next(error);
    }
}

export const signup = async (req, res, next) => {
    const { username, password, userType } = req.body;
    try {
        const salt_rounds = +(process.env.SALT_ROUNDS);
        const hashed_pwd = await bcrypt.hash(password, salt_rounds);
        const user = await createUser(username, hashed_pwd, userType);
        const token = Jwt.sign({
            userID: user._id,
            username: user.username,
            userType: user.userType
        }, process.env.TOKEN_SECRET);
        res.status(200).json({
            userType: user.userType,
            token: token
        });

    } catch (error) {
        return next(error);
    }
}