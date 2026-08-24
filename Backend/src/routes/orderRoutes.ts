import { Router } from "express";
import { createOrder } from "../orders/createOrder.js";
import { getMyOrders } from "../orders/getMyOrders.js";
import { getAllOrders } from "../orders/getAllOrders.js";
import { updateOrderStatus } from "../orders/updateOrderStatus.js";
import { getDashboardStats } from "../orders/getDashboardStats.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/Adminmiddleware.js";

const router = Router();


router.post("/", authMiddleware, createOrder);
router.get("/my-orders", authMiddleware, getMyOrders);


router.get("/admin/all", authMiddleware, adminMiddleware, getAllOrders);
router.put("/admin/:id/status", authMiddleware, adminMiddleware, updateOrderStatus);
router.get("/admin/stats", authMiddleware, adminMiddleware, getDashboardStats);

export default router;