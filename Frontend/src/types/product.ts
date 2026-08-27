export interface Product {
  _id: string;
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  image?: string;
  imageAlt?: string;
  images: string[];
  stock: number;
  stockQuantity?: number;
  inStock?: boolean;
  rating: number;
  reviewsCount: number;
  reviewCount?: number;
  colors?: { name: string; hex: string }[];
  storageOptions?: string[];
  isFeatured: boolean;
  isDeal: boolean;
  discount: number;
  discountPercent?: number;
  createdAt: string;
  updatedAt: string;
}