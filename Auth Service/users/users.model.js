import mongoose from "mongoose";

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
        await mongoose.connect(process.env.mongoURI);
        const user = await User.findOne({ username: username });
        mongoose.disconnect();
        return user;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

export const findAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw new Error(error);
    }
}

export const createUser = async (username, password, userType) => {
    try {
        const user = new User({
            username,
            password,
            userType
        });
        await mongoose.connect(process.env.mongoURI);
        await user.save();
        mongoose.disconnect();
        return user;
    } catch (error) {
        mongoose.disconnect();
        throw new Error(error);
    }
}

export const deleteUser = async (username) => {
    try {
        const users = await User.deleteOne({ username: username });
    } catch (error) {
        throw new Error(error);
    }
}