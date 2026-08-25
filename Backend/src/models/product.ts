import mongoose, { Schema, Document } from "mongoose";

export interface IColorOption {
  name: string;
  hex: string;
}

export interface IProduct extends Document {
  name: string;
  category: string;
  price: number;
  rating: number;
  reviewCount: number;
  imageAlt: string;
  image: string;
  images?: string[];
  colors?: IColorOption[];
  storageOptions?: string[];
  description?: string;
  inStock: boolean;
  isDeal: boolean;
  discountPercent?: number;
  dealExpiresAt?: Date; 
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    imageAlt: { type: String, required: true },
    image: { type: String, required: true },
    images: { type: [String] },
    colors: [{ name: String, hex: String }],
    storageOptions: { type: [String] },
    description: { type: String },
    inStock: { type: Boolean, default: true },
    isDeal: { type: Boolean, default: false },
    discountPercent: { type: Number },
    dealExpiresAt: { type: Date }, 
  },
  { timestamps: true }
);

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;