import { Router } from "express";
import { createPaymentIntent } from "../payments/createPaymentIntent.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/create-intent", authMiddleware, createPaymentIntent);

export default router;