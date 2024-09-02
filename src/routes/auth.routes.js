import { Router } from "express";
import authController from "../controller/auth.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/verify', verifyToken, authController.verfySession);
router.get('/logout', verifyToken, authController.logout);


export default router;
