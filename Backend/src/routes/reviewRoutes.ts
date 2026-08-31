import { Router } from "express";
import { createReview } from "../reviews/createReview.js";
import { getProductReviews } from "../reviews/getProductReviews.js";
import { checkCanReview } from "../reviews/checkCanReview.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/product/:productId", getProductReviews); 
router.post("/", authMiddleware, createReview); 
router.get("/can-review/:productId", authMiddleware, checkCanReview);

export default router;