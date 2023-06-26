import mongoose from "mongoose";
import HttpError from "../models/customError.js";

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
        // minLength: [8, 'Password is too short, the length must be at least 8']
    }
});

const User = mongoose.model('user', userSchema);
export default User;