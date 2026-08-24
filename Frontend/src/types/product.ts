export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  images: string[];
  stock: number;
  rating: number;
  reviewsCount: number;
  isFeatured: boolean;
  isDeal: boolean;
  discount: number;
  createdAt: string;
  updatedAt: string;
}