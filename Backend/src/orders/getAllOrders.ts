import type { Request, Response } from "express";
import Order from "../models/Order.js";

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

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