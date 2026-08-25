import { Router } from "express";
import Product from "../models/product.js";
import { createProduct } from "../products/createProduct.js";
import { updateProduct } from "../products/updateProduct.js";
import { deleteProduct } from "../products/deleteProduct.js";
import { setProductDeal } from "../products/setProductDeal.js";
import { getAllProductsAdmin } from "../products/getAllProductsAdmin.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/Adminmiddleware.js";
import { uploadProductImages } from "../middleware/upload.js";
import { getDealProductsAdmin } from "../products/getDealProductsAdmin.js";

const router = Router();

// Public routes — shop page ke liye (jo pehle se the)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
});

// Public — active deals (Deals page ke liye). /:id se pehle honi zaroori hai.
router.get("/deals", getDealProductsAdmin);

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: (error as Error).message });
  }
});

// Admin routes — sab authMiddleware + adminMiddleware ke peeche
router.get("/admin/all", authMiddleware, adminMiddleware, getAllProductsAdmin);
router.post("/admin/create", authMiddleware, adminMiddleware, uploadProductImages, createProduct);
router.put("/admin/:id", authMiddleware, adminMiddleware, uploadProductImages, updateProduct);
router.delete("/admin/:id", authMiddleware, adminMiddleware, deleteProduct);
router.put("/admin/:id/deal", authMiddleware, adminMiddleware, setProductDeal);
router.get("/admin/deals", authMiddleware, adminMiddleware, getDealProductsAdmin);

export default router;