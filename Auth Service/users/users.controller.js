import { deleteUser, findAllUsers, updateUser, findUser } from "./users.model.js"

export const getAllUsers = async (req, res) => {
    try {
        const users = await findAllUsers();
        res.status(200).json({
            message: `Found ${users.length} users`,
            users: users
        });
    } catch (error) {
        res.status(error.code).json({ error: error.message });
    }
}

export const getUser = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await findUser(username);
        res.status(200).json({
            message: `User Found Successfully`,
            user: user
        });
    } catch (error) {
        res.status(error.code).json({ error: error.message });
    }
}

export const updateUserType = async (req, res) => {
    const { username, userType } = req.body;
    try {
        const user = await updateUser(username, userType);
        res.status(200).json({
            message: `User Type Updated Successfully`,
            user: user
        });
    } catch (error) {
        res.status(error.code).json({ error: error.message });
    }
}

export const removeUser = async (req, res) => {
    const { username } = req.body;
    try {
        const user = await deleteUser(username);
        res.status(200).json({
            message: `User Deleted Successfully`,
            user: user
        });
    } catch (error) {
        res.status(error.code).json({ error: error.message });
    }
}