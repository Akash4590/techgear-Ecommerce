import type { Request, Response } from "express";
import Product from "../models/product.js";

// CREATE PRODUCT
export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      price,
      category,
      brand,
      images,
      stock,
      rating,
      reviewsCount,
      isFeatured,
      isDeal,
      discount,
    } = req.body;

    if (!name || !description || price === undefined || !category || !brand) {
      return res.status(400).json({
        success: false,
        message: "Name, description, price, category, and brand are required",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      brand,
      images: images || [],
      stock: stock || 0,
      rating: rating || 0,
      reviewsCount: reviewsCount || 0,
      isFeatured: isFeatured || false,
      isDeal: isDeal || false,
      discount: discount || 0,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: (error as Error).message,
    });
  }
};

// GET ALL PRODUCTS
export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: (error as Error).message,
    });
  }
};

// GET SINGLE PRODUCT
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: (error as Error).message,
    });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: (error as Error).message,
    });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: (error as Error).message,
    });
  }
};