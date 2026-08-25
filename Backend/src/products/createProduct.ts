import type { Request, Response } from "express";
import Product from "../models/product.js";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      category,
      price,
      rating,
      reviewCount,
      imageAlt,
      colors,
      storageOptions,
      description,
      inStock,
      isDeal,
      discountPercent,
      dealDurationDays,
    } = req.body;

    if (!name || !category || !price || !imageAlt) {
      return res.status(400).json({
        success: false,
        message: "Name, category, price, and imageAlt are required",
      });
    }

    // Multer + CloudinaryStorage: har uploaded file ke .path pe Cloudinary URL hota hai
    const files = req.files as Express.Multer.File[] | undefined;
    const uploadedImageUrls = files ? files.map((file) => file.path) : [];

    if (uploadedImageUrls.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one product image is required",
      });
    }

    // Pehli image "main" image ban jati hai, poori list gallery ke liye
    const [mainImage] = uploadedImageUrls;

    // colors/storageOptions frontend se FormData mein JSON string ki tarah aayenge
    const parsedColors = colors ? JSON.parse(colors) : undefined;
    const parsedStorageOptions = storageOptions ? JSON.parse(storageOptions) : undefined;

    // Deal fields — FormData mein sab strings ki tarah aate hain
    const wantsDeal = isDeal === "true" || isDeal === true;

    let dealFields: {
      isDeal: boolean;
      discountPercent?: number;
      dealExpiresAt?: Date;
    } = { isDeal: false };

    if (wantsDeal) {
      const discount = Number(discountPercent);
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

      dealFields = {
        isDeal: true,
        discountPercent: discount,
        dealExpiresAt: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
      };
    }

    const product = await Product.create({
      name,
      category,
      price,
      rating: rating || 0,
      reviewCount: reviewCount || 0,
      imageAlt,
      image: mainImage,
      images: uploadedImageUrls,
      colors: parsedColors,
      storageOptions: parsedStorageOptions,
      description,
      inStock: inStock !== undefined ? inStock === "true" || inStock === true : true,
      ...dealFields,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: (error as Error).message,
    });
  }
};