import { Router } from "express";
import { login, signup, verify } from "./auth.controller.js";
import { verifyKeycloakToken, verifyUserCredintials } from "../middlewares/verifyUser.js";
import validateReqParameters from "../middlewares/validateRequestInputs.js";
const authRouter = Router();

authRouter.post('/login', verifyKeycloakToken, validateReqParameters('loginSchema'), login);
authRouter.post('/signup', verifyKeycloakToken, validateReqParameters('signupSchema'), verifyUserCredintials, signup);
authRouter.post('/verify', verifyUserCredintials, verify)

export default authRouter;