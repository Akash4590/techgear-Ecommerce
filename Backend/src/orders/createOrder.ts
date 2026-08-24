import type { Response } from "express";
import Order from "../models/Order.js";
import type { AuthRequest } from "../middleware/authMiddleware.js";

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { items, totalAmount, shippingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order must have at least one item",
      });
    }

    if (!shippingAddress) {
      return res.status(400).json({
        success: false,
        message: "Shipping address is required",
      });
    }

    const order = await Order.create({
      user: req.userId,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod: paymentMethod || "Cash on Delivery",
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: (error as Error).message,
    });
  }
};