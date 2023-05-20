import { Router } from "express";
import { verifyUserCredintials, verifyUserType } from "../middlewares/verifyUser.js";
import userType from "../models/userType.js";
import { getAllUsers, getUser, removeUser, updateUserType } from "./users.controller.js";
const userRouter = Router();

userRouter.get('/all',
    verifyUserCredintials,
    getAllUsers);

userRouter.get('/:username', verifyUserCredintials, getUser);
userRouter.post('/update',
    verifyUserCredintials,
    verifyUserType([userType.ADMIN, userType.SUPER_ADMIN]),
    updateUserType);

userRouter.post('/delete',
    verifyUserCredintials,
    verifyUserType([userType.ADMIN, userType.SUPER_ADMIN]),
    removeUser);

export default userRouter;