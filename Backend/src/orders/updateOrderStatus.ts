import type { Request, Response } from "express";
import Order from "../models/Order.js";
import { sendOrderShippedEmail, sendOrderDeliveredEmail } from "../config/mailer.js";

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true }).populate(
      "user",
      "name email"
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Email trigger — status ke hisaab se customer ko notify karna
    const customer = order.user as unknown as { name: string; email: string };

    console.log("Status update:", status, "| Customer email:", customer?.email);

    try {
      if (status === "shipped" && customer?.email) {
        await sendOrderShippedEmail(customer.email, customer.name, order.id);
        console.log("Shipped email sent to:", customer.email);
      }

      if (status === "delivered" && customer?.email) {
        await sendOrderDeliveredEmail(customer.email, customer.name, order.id, order.items);
        console.log("Delivered email sent to:", customer.email);
      }
    } catch (emailError) {
      console.error("Failed to send order status email:", emailError);
    }

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