import type { Request, Response } from "express";
import Product from "../models/product.js";

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData: Record<string, unknown> = { ...req.body };

    // Agar admin ne naya images select kiya hai, unhe upload/replace kar dein
    const files = req.files as Express.Multer.File[] | undefined;
    if (files && files.length > 0) {
      const uploadedImageUrls = files.map((file) => file.path);
      const [mainImage] = uploadedImageUrls;
      updateData.image = mainImage;
      updateData.images = uploadedImageUrls;
    }

    // colors/storageOptions FormData mein JSON string ki tarah aa sakti hain
    if (typeof updateData.colors === "string") {
      updateData.colors = JSON.parse(updateData.colors);
    }
    if (typeof updateData.storageOptions === "string") {
      updateData.storageOptions = JSON.parse(updateData.storageOptions);
    }

    // ===== Stock quantity handling =====
    // FormData se string aati hai, Number mein convert karo aur inStock auto-sync karo
    if (updateData.stockQuantity !== undefined) {
      const qty = Number(updateData.stockQuantity) || 0;
      updateData.stockQuantity = qty;
      updateData.inStock = qty > 0;
    }

    // ===== Deal fields handling =====
    const wantsDeal = updateData.isDeal === "true" || updateData.isDeal === true;
    const dealDurationDays = updateData.dealDurationDays;

    // Ye raw fields ab updateData se hata dein, inhe neeche manually set/unset karenge
    delete updateData.isDeal;
    delete updateData.discountPercent;
    delete updateData.dealDurationDays;

    let mongoUpdate: Record<string, unknown> = { $set: { ...updateData } };

    if (wantsDeal) {
      const discount = Number(req.body.discountPercent);
      const days = Number(dealDurationDays);

      if (!discount || discount <= 0 || discount >= 100) {
        return res.status(400).json({
          success: false,
          message: "Discount percent must be between 1 and 99 when setting a deal",
        });
      }

      if (!days || days <= 0) {
        return res.status(400).json({
          success: false,
          message: "Deal duration must be a positive number of days",
        });
      }

      mongoUpdate.$set = {
        ...(mongoUpdate.$set as Record<string, unknown>),
        isDeal: true,
        discountPercent: discount,
        dealExpiresAt: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
      };
    } else {
      mongoUpdate.$set = {
        ...(mongoUpdate.$set as Record<string, unknown>),
        isDeal: false,
      };
      mongoUpdate.$unset = { discountPercent: 1, dealExpiresAt: 1 };
    }

    const product = await Product.findByIdAndUpdate(id, mongoUpdate, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: (error as Error).message,
    });
  }
};