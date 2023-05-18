import { Router } from "express";
import { login, signup, verify } from "./auth.controller.js";
import { verifyUserCredintials } from "../middlewares/verifyUser.js";
const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/signup', verifyUserCredintials, signup);
authRouter.post('/verify', verifyUserCredintials, verify)

export default authRouter;