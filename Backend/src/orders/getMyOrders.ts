import type { Response } from "express";
import Order from "../models/Order.js";
import type { AuthRequest } from "../middleware/authMiddleware.js";

export const getMyOrders = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await Order.find({ user: req.userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: (error as Error).message,
    });
  }
};