import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/Adminmiddleware.js";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", authMiddleware, adminMiddleware, createProduct);
router.put("/:id", authMiddleware, adminMiddleware, updateProduct);
router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);

export default router;