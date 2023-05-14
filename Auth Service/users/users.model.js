import mongoose from "mongoose";
import HttpError from "../models/http-error.js";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minLength: [3, 'Username is too short, the length must be at least 3'],
    },

    userType: {
        type: String,
        required: true,
        enum: {
            values: ['STUDENT', 'TEACHER', 'ADMIN'],
            message: '{VALUE} is not supported'
        }
    },

    password: {
        type: String,
        required: true,
        minLength: [8, 'Password is too short, the length must be at least 8']
    }
});

const User = mongoose.model('user', userSchema);

export const findUser = async (username) => {
    try {
        const user = await User.findOne({ username: username });
        return user;
    } catch (error) {
        throw new HttpError(error.message, 500);
    }
}

export const findAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw new HttpError(error.message, 500);
    }
}

export const createUser = async (username, password, userType) => {
    try {
        const user = new User({
            username,
            password,
            userType
        });
        await user.save();
        return user;
    } catch (error) {
        throw new HttpError(error.message, 500);
    }
}

export const deleteUser = async (username) => {
    try {
        const users = await User.deleteOne({ username: username });
    } catch (error) {
        throw new HttpError(error.message, 500);
    }
}