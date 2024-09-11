import { Router } from "express";
import chatController from "../controller/chat.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = Router();

router.get('/get-messages/:id', verifyToken, chatController.getMessages);
router.post('/send-message', verifyToken, chatController.sendMessage);
router.delete('/delete-messages/:id', verifyToken, chatController.deleteMessages);
router.put('/update-messages/:id', verifyToken, chatController.updateMessages);
router.post('/save-messages/:id', verifyToken, chatController.saveMessages);

export default router;