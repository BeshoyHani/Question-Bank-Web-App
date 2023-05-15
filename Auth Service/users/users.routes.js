import { Router } from "express";
import { login, signup, verify } from "./users.controller.js";
import { verifyUser } from "../middlewares/verifyUser.js";
const router = Router();

router.post('/login', login);
router.post('/signup', verifyUser, signup);
router.post('/verify', verifyUser, verify)

export default router;