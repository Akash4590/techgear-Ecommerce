import type { Request, Response } from "express";
import Product from "../models/product.js";

const DEAL_DURATION_MS = 5 * 24 * 60 * 60 * 1000; // 5 din

export const setProductDeal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isDeal, discountPercent } = req.body;

    if (isDeal && (!discountPercent || discountPercent <= 0 || discountPercent >= 100)) {
      return res.status(400).json({
        success: false,
        message: "Discount percent must be between 1 and 99 when marking as deal",
      });
    }

    const update = isDeal
      ? {
          $set: {
            isDeal: true,
            discountPercent,
            dealExpiresAt: new Date(Date.now() + DEAL_DURATION_MS),
          },
        }
      : {
          $set: { isDeal: false },
          $unset: { discountPercent: 1, dealExpiresAt: 1 },
        };

    const product = await Product.findByIdAndUpdate(id, update, { new: true });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: isDeal ? "Product marked as deal" : "Deal removed from product",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update deal status",
      error: (error as Error).message,
    });
  }
};