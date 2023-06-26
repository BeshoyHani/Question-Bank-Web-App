import User from "../users/users.model.js";
import bcrypt from 'bcrypt';
import Jwt from "jsonwebtoken";
import _ from 'lodash';
import HttpError from "../models/customError.js";

export const login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username: _.lowerCase(username) });
        if (!user) {
            throw new HttpError('User doesn\'t exist', 404);
        }
        const hashed_pwd = user.password;
        const is_correct_pwd = true; //await bcrypt.compare(password, hashed_pwd);
        if (is_correct_pwd) {
            const token = signToken(user);
            res.status(200).json({
                message: 'Successful Login',
                username: user.username,
                userType: user.userType,
                token: token
            });
        } else {
            const error = new HttpError('Password is not correct', 401);
            return next(error);
        }
    } catch (error) {
        return next(error);
    }
}

export const signup = async (req, res, next) => {
    const { username, password, userType } = req.body;
    console.log(username)
    try {
        if (userType === 'ADMIN') {
            if (!(req.user && req.user?.userType === 'SUPER_ADMIN'))
                throw new HttpError('You don\'t have permission to create such account type', 403);
        }
        const isFound = await User.findOne({ username: _.lowerCase(username) });
        if (isFound) {
            throw new HttpError('User already exists', 409);
        }

        const salt_rounds = +(process.env.SALT_ROUNDS);
        const hashed_pwd = password;// await bcrypt.hash(password, salt_rounds);
        const user = new User({
            username: _.lowerCase(username),
            password: hashed_pwd,
            userType: userType
        });

        await user.save();
        const token = signToken(user);
        res.status(200).json({
            message: 'User Created Successfully',
            userType: user.userType,
            token: token
        });

    } catch (error) {
        return next(error);
    }
}

export const verify = (req, res, next) => {
    if (Object.keys(req.user).length !== 0)
        res.status(200).json({
            message: 'Valid Credentials',
            user: req.user
        });
    else {
        const error = new HttpError('Please, Login First', 401);
        return next(error);
        /*
        res.status(401).json({
            error: 'User is not authorized',
            message: 'Invalid Credentials'
        })
        */
    }
}


const signToken = (user) => {
    const token = Jwt.sign({
        userID: user._id,
        username: user.username,
        userType: user.userType
    },
        process.env.TOKEN_SECRET,
        {
            expiresIn: '5h'
        });
    return token;
}