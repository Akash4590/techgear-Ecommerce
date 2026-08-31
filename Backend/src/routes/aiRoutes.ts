import { Router } from "express";
import { chatWithAgent } from "../ai/chatWithAgent.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/chat", authMiddleware, chatWithAgent);

export default router;