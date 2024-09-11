import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";

import Controller from "../controller/transactions.controller.js";

// Rutas de la API de transacciones.
const router = Router();

router.post("/create", verifyToken, Controller.createTransaction);
router.put("/update/:id", verifyToken, Controller.updateTransaction);
router.put("/delete/:id", verifyToken, Controller.deleteTransaction);
router.get("/get/:id", verifyToken, Controller.getTransactions);

export default router;
