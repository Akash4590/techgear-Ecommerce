import type { Response } from "express";
import Review from "../models/Review.js";
import Product from "../models/product.js";
import Order from "../models/Order.js";
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

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Naya: check karo user ne is product ko kabhi order kiya hai (kisi bhi status mein)
    const qualifyingOrder = await Order.findOne({
      user: req.userId,
      "items.productId": productId,
    }).sort({ createdAt: -1 });

    if (!qualifyingOrder) {
      return res.status(403).json({
        success: false,
        message: "Only customers who purchased this product can leave a review",
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

    const review = await Review.create({
      product: productId,
      user: req.userId,
      order: qualifyingOrder._id,
      rating,
      comment,
    });

    // Sirf "approved" reviews rating calculation mein count hon
    const approvedReviews = await Review.find({ product: productId, status: "approved" });
    const avgRating =
      approvedReviews.length > 0
        ? approvedReviews.reduce((sum, r) => sum + r.rating, 0) / approvedReviews.length
        : 0;

    product.rating = Math.round(avgRating * 10) / 10;
    product.reviewCount = approvedReviews.length;
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