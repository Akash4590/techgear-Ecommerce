import type { Response } from "express";
import Review from "../models/Review.js";
import type { AuthRequest } from "../middleware/authMiddleware.js";

export const checkCanReview = async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.params;

    const existingReview = await Review.findOne({
      product: productId,
      user: req.userId,
    });

    res.status(200).json({
      success: true,
      data: {
        hasReviewed: !!existingReview,
        review: existingReview || null,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to check review status",
      error: (error as Error).message,
    });
  }
};