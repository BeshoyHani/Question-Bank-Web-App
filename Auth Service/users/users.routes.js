import { Router } from "express";
import { verifyUserCredintials, verifyUserType } from "../middlewares/verifyUser.js";
import userType from "../models/userType.js";
import { getAllUsers, getUser, removeUser, updateUserType } from "./users.controller.js";
import validateReqParameters from "../middlewares/validateRequestInputs.js";
const userRouter = Router();

userRouter.get('/all',
    validateReqParameters('userScema'),
    verifyUserCredintials,
    getAllUsers);

userRouter.get('/:username', validateReqParameters('userScema'), verifyUserCredintials, getUser);

userRouter.post('/update',
    validateReqParameters('updateUserScema'),
    verifyUserCredintials,
    verifyUserType([userType.ADMIN, userType.SUPER_ADMIN]),
    updateUserType);

userRouter.post('/delete',
    validateReqParameters('userScema'),
    verifyUserCredintials,
    verifyUserType([userType.ADMIN, userType.SUPER_ADMIN]),
    removeUser);

export default userRouter;