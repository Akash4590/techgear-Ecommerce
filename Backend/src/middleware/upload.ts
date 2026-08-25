import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: "techgear/products",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 1000, height: 1000, crop: "limit" }],
  }),
});

// Ek product ki multiple images upload karne ke liye (max 5)
export const uploadProductImages = multer({ storage }).array("images", 5);