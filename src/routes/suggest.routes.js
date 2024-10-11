import { Router } from "express";
import { verifyToken, verifyTokenAdmin } from "../middlewares/verifyToken.js";
import suggestController from "../controller/suggest.controller.js";

const router = Router();

router.post('/create', verifyToken, suggestController.insertSuggest);
router.get('/get/:user_id', verifyToken, suggestController.getSuggest);

router.get('/get-all', verifyTokenAdmin, suggestController.getAllSuggest);

router.delete('/delete/:user_id/:id', verifyToken, suggestController.deleteSuggest);
router.put('/update/:id', verifyToken, suggestController.updateSuggest);

export default router