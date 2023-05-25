import { Router } from "express";
import { login, signup, verify } from "./auth.controller.js";
import { verifyUserCredintials } from "../middlewares/verifyUser.js";
import validateReqParameters from "../middlewares/validateRequestInputs.js";
const authRouter = Router();

authRouter.post('/login', validateReqParameters('loginSchema'), login);
authRouter.post('/signup', validateReqParameters('signupSchema'), verifyUserCredintials, signup);
authRouter.post('/verify', verifyUserCredintials, verify)

export default authRouter;