import type { Request, Response } from "express";
import Product from "../models/product.js";

export const getDealProductsAdmin = async (req: Request, res: Response) => {
  try {
    const now = new Date();

    // Lazy expiry: jinki 5 din wali deal guzar chuki hai unhe auto off kar dein
    await Product.updateMany(
      { isDeal: true, dealExpiresAt: { $lte: now } },
      {
        $set: { isDeal: false },
        $unset: { discountPercent: 1, dealExpiresAt: 1 },
      }
    );

    const deals = await Product.find({ isDeal: true }).sort({ dealExpiresAt: 1 });

    res.status(200).json({
      success: true,
      data: deals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch deals",
      error: (error as Error).message,
    });
  }
};