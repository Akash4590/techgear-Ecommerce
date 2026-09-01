import { Router } from "express";
import { createReview } from "../reviews/createReview.js";
import { getProductReviews } from "../reviews/getProductReviews.js";
import { checkCanReview } from "../reviews/checkCanReview.js";
import { getAllReviewsAdmin } from "../reviews/getAllReviewsAdmin.js";
import { updateReviewStatus } from "../reviews/updateReviewStatus.js";
import { deleteReview } from "../reviews/deleteReview.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/Adminmiddleware.js";

const router = Router();

router.get("/product/:productId", getProductReviews);
router.post("/", authMiddleware, createReview);
router.get("/can-review/:productId", authMiddleware, checkCanReview);

// Admin routes
router.get("/admin/all", authMiddleware, adminMiddleware, getAllReviewsAdmin);
router.put("/admin/:id/status", authMiddleware, adminMiddleware, updateReviewStatus);
router.delete("/admin/:id", authMiddleware, adminMiddleware, deleteReview);

export default router;