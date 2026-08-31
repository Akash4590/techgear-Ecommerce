import type { Response } from "express";
import Order from "../models/Order.js";
import Product from "../models/product.js";
import User from "../models/user.js";
import { sendOrderConfirmationEmail } from "../config/mailer.js";
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

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.name}`,
        });
      }

      if (product.stockQuantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough stock for "${product.name}". Only ${product.stockQuantity} left.`,
        });
      }
    }

    const order = await Order.create({
      user: req.userId,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod: paymentMethod || "Cash on Delivery",
    });

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (product) {
        product.stockQuantity -= item.quantity;
        product.inStock = product.stockQuantity > 0;
        await product.save();
      }
    }

    // Order confirmation email — user ke account se email/naam nikal ke bhejte hain
    // (shippingAddress mein email field nahi hai, isliye account email use karte hain)
    try {
      const user = await User.findById(req.userId);
      if (user?.email) {
        await sendOrderConfirmationEmail(user.email, user.name, order.id, totalAmount, items);
      }
    } catch (emailError) {
      // Email fail hone se order creation fail nahi hona chahiye — sirf log karo
      console.error("Failed to send order confirmation email:", emailError);
    }

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