import type { Request, Response } from "express";
import Order from "../models/Order.js";
import User from "../models/user.js";
import Product from "../models/product.js";

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalOrders = await Order.countDocuments();
    const deliveredOrders = await Order.countDocuments({ status: "delivered" });
    const cancelledOrders = await Order.countDocuments({ status: "cancelled" });
    const pendingOrders = await Order.countDocuments({
      status: { $in: ["pending", "processing"] },
    });
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments({ role: "user" });

    const orders = await Order.find();
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    const recentOrders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        totalOrders,
        deliveredOrders,
        cancelledOrders,
        pendingOrders,
        totalProducts,
        totalRevenue,
        totalUsers,
        recentOrders,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats",
      error: (error as Error).message,
    });
  }
};