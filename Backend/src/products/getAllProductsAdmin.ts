import type { Request, Response } from "express";
import Product from "../models/product.js";

export const getAllProductsAdmin = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const search = (req.query.search as string) || "";
    const filter = search
      ? { name: { $regex: search, $options: "i" } }
      : {};

    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: products,
      pagination: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: (error as Error).message,
    });
  }
};