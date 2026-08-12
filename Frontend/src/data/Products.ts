import { assets } from "../assets/assets"; 

export type ProductCategory =
  | "Smartphones"
  | "Laptops"
  | "Audio"
  | "Accessories";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  rating: number;
  reviewCount: number;
  imageAlt: string;
  image: string;
}

export const products: Product[] = [
  {
    id: "prod-1",
    name: "iPhone 15 Pro",
    category: "Smartphones",
    price: 1099,
    rating: 4.5,
    reviewCount: 128,
    imageAlt: "iPhone 15 Pro",
    image: assets.iphone,
  },
  {
    id: "prod-2",
    name: "Samsung Galaxy S24",
    category: "Smartphones",
    price: 899,
    rating: 4.6,
    reviewCount: 142,
    imageAlt: "Samsung Galaxy S24",
    image: assets.samsunggalaxy,
  },
  {
    id: "prod-3",
    name: "Google Pixel 9",
    category: "Smartphones",
    price: 799,
    rating: 4.5,
    reviewCount: 98,
    imageAlt: "Google Pixel 9",
    image: assets.googlepixel,
  },
  {
    id: "prod-4",
    name: "MacBook Air M2",
    category: "Laptops",
    price: 1199,
    rating: 4.6,
    reviewCount: 96,
    imageAlt: "MacBook Air M2",
    image: assets.macbook,
  },
  {
    id: "prod-5",
    name: "Dell XPS 15",
    category: "Laptops",
    price: 1399,
    rating: 4.7,
    reviewCount: 84,
    imageAlt: "Dell XPS 15",
    image: assets.laptop,
  },
  {
    id: "prod-6",
    name: "Sony WH-1000XM5",
    category: "Audio",
    price: 349,
    rating: 4.7,
    reviewCount: 64,
    imageAlt: "Sony WH-1000XM5",
    image: assets.dealHeadphones,
  },
  {
    id: "prod-7",
    name: "AirPods Pro 2",
    category: "Audio",
    price: 249,
    rating: 4.6,
    reviewCount: 156,
    imageAlt: "AirPods Pro 2",
    image: assets.airpods,
  },
  {
    id: "prod-8",
    name: "Apple Watch Series 9",
    category: "Accessories",
    price: 399,
    rating: 4.4,
    reviewCount: 42,
    imageAlt: "Apple Watch Series 9",
    image: assets.smartwatch,
  },
];

export const productCategoryFilters: Array<"All Products" | ProductCategory> = [
  "All Products",
  "Smartphones",
  "Laptops",
  "Audio",
  "Accessories",
];