import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";

import Controller from "../controller/transactions.controller.js";

const router = Router();

router.post("/create", verifyToken, Controller.createTransaction);
router.get("/get/:id", verifyToken, Controller.getTransactions);

export default router;
