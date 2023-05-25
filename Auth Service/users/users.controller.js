import User from "./users.model.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            message: `Found ${users.length} users`,
            users: users
        });
    } catch (error) {
        return next(error);
    }
}

export const getUser = async (req, res, next) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username: _.lowerCase(username) });
        res.status(200).json({
            message: `User Found Successfully`,
            user: user
        });
    } catch (error) {
        return next(error);
    }
}

export const updateUserType = async (req, res, next) => {
    const { username, userType } = req.body;
    try {
        const user = User.findOneAndUpdate({ username: username },
            { userType: userType },
            { new: true });

        res.status(200).json({
            message: `User Type Updated Successfully`,
            user: user
        });
    } catch (error) {
        return next(error);
    }
}

export const removeUser = async (req, res, next) => {
    const { username } = req.body;
    try {
        const user = await User.findOneAndDelete({ username: username });
        res.status(200).json({
            message: `User Deleted Successfully`,
            user: user
        });
    } catch (error) {
        return next(error);
    }
}