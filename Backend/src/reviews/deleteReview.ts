import type { Request, Response } from "express";
import Review from "../models/Review.js";
import Product from "../models/product.js";

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const review = await Review.findByIdAndDelete(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // Naya: rating recalculate karo delete hone ke baad
    const approvedReviews = await Review.find({ product: review.product, status: "approved" });
    const avgRating =
      approvedReviews.length > 0
        ? approvedReviews.reduce((sum, r) => sum + r.rating, 0) / approvedReviews.length
        : 0;

    await Product.findByIdAndUpdate(review.product, {
      rating: Math.round(avgRating * 10) / 10,
      reviewCount: approvedReviews.length,
    });

    res.status(200).json({
      success: true,
      message: "Review deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete review",
      error: (error as Error).message,
    });
  }
};