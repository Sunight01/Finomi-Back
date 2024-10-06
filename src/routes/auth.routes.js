import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import authController from "../controller/auth.controller.js";

// Rutas de la API de autenticación.
const router = Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/verify', verifyToken, authController.verfySession); // verifyToken es un middleware que verifica si la sesión está activa con el token de jwt.
router.put('/update/:id', verifyToken, authController.updateUser);
router.get('/logout', verifyToken, authController.logout);


export default router;
