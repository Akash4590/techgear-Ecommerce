import type { Response } from "express";
import Review from "../models/Review.js";
import Product from "../models/product.js";
import type { AuthRequest } from "../middleware/authMiddleware.js";

export const createReview = async (req: AuthRequest, res: Response) => {
  try {
    const { productId, rating, comment } = req.body;

    if (!productId || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "Product, rating, and comment are required",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    // Check karo product exist karta hai
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check karo user ne pehle se review nahi diya
    const existingReview = await Review.findOne({ product: productId, user: req.userId });
    if (existingReview) {
      return res.status(409).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }

    // Review banao
    const review = await Review.create({
      product: productId,
      user: req.userId,
      rating,
      comment,
    });

    // Naya: product ki average rating aur reviewCount recalculate karo
    const allReviews = await Review.find({ product: productId });
    const avgRating =
      allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    product.rating = Math.round(avgRating * 10) / 10; // 1 decimal tak round
    product.reviewCount = allReviews.length;
    await product.save();

    const populatedReview = await review.populate("user", "name");

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      data: populatedReview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add review",
      error: (error as Error).message,
    });
  }
};