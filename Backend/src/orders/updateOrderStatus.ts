import type { Request, Response } from "express";
import Order from "../models/Order.js";
import { getIO } from "../config/socket.js";

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }
    const io = getIO();
    io.to(`user:${order.user.toString()}`).emit("order-status-updated", {
      orderId: order._id.toString(),
      status: order.status,
      updatedAt: order.updatedAt,
    });
    io.to("admins").emit("admin-order-status-updated", {
      orderId: order._id.toString(),
      status: order.status,
      updatedAt: order.updatedAt,
    });

    res.status(200).json({
      success: true,
      message: "Order status updated",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: (error as Error).message,
    });
  }
};