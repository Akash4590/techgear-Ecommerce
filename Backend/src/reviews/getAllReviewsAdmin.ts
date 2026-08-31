import type { Request, Response } from "express";
import Review from "../models/Review.js";

export const getAllReviewsAdmin = async (req: Request, res: Response) => {
  try {
    const status = req.query.status as string | undefined;
    const filter = status && status !== "all" ? { status } : {};

    const reviews = await Review.find(filter)
      .populate("user", "name email")
      .populate("product", "name image")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: (error as Error).message,
    });
  }
};