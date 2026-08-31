import type { Response } from "express";
import Review from "../models/Review.js";
import Order from "../models/Order.js";
import type { AuthRequest } from "../middleware/authMiddleware.js";

export const checkCanReview = async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.params;

    const existingReview = await Review.findOne({
      product: productId,
      user: req.userId,
    });

    const qualifyingOrder = await Order.findOne({
      user: req.userId,
      "items.productId": productId,
    });

    res.status(200).json({
      success: true,
      data: {
        hasReviewed: !!existingReview,
        hasPurchased: !!qualifyingOrder, // Naya
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