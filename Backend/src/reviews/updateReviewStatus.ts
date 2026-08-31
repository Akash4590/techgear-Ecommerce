import type { Request, Response } from "express";
import Review from "../models/Review.js";
import Product from "../models/product.js";

const recalculateProductRating = async (productId: string) => {
  const approvedReviews = await Review.find({ product: productId, status: "approved" });
  const avgRating =
    approvedReviews.length > 0
      ? approvedReviews.reduce((sum, r) => sum + r.rating, 0) / approvedReviews.length
      : 0;

  await Product.findByIdAndUpdate(productId, {
    rating: Math.round(avgRating * 10) / 10,
    reviewCount: approvedReviews.length,
  });
};

export const updateReviewStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const review = await Review.findByIdAndUpdate(id, { status }, { new: true });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // Naya: status change hone ke baad product rating dobara calculate karo
    await recalculateProductRating(review.product.toString());

    res.status(200).json({
      success: true,
      message: `Review ${status}`,
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update review status",
      error: (error as Error).message,
    });
  }
};