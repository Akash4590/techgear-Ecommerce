import { assets } from "../assets/assets";

export type ProductCategory =
  | "Smartphones"
  | "Laptops"
  | "Audio"
  | "Accessories"
  | "Smartwatches";

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
  // =========================
  // EXISTING PRODUCTS
  // =========================

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

  // =========================
  // SHOP PAGE PRODUCTS
  // =========================

  {
    id: "shop-1",
    name: "iPhone 15 Pro Max",
    category: "Smartphones",
    price: 1199,
    rating: 4.8,
    reviewCount: 128,
    imageAlt: "iPhone 15 Pro Max",
    image: assets.shopiphone,
  },

  {
    id: "shop-2",
    name: "MacBook Air M3",
    category: "Laptops",
    price: 1099,
    rating: 4.9,
    reviewCount: 89,
    imageAlt: "MacBook Air M3",
    image: assets.shopmacbook,
  },

  {
    id: "shop-3",
    name: "Sony WH-1000XM5",
    category: "Audio",
    price: 349,
    rating: 4.7,
    reviewCount: 56,
    imageAlt: "Sony WH-1000XM5 Headphones",
    image: assets.shopsony,
  },

  {
    id: "shop-4",
    name: "Apple Watch Series 9",
    category: "Smartwatches",
    price: 399,
    rating: 4.7,
    reviewCount: 72,
    imageAlt: "Apple Watch Series 9",
    image: assets.shopapplewatch,
  },

  {
    id: "shop-5",
    name: "AirPods Pro (2nd Gen)",
    category: "Audio",
    price: 249,
    rating: 4.8,
    reviewCount: 95,
    imageAlt: "AirPods Pro 2nd Generation",
    image: assets.shopairpods,
  },

  {
    id: "shop-6",
    name: "Samsung Galaxy S24 Ultra",
    category: "Smartphones",
    price: 1049,
    rating: 4.6,
    reviewCount: 68,
    imageAlt: "Samsung Galaxy S24 Ultra",
    image: assets.shopsamsung,
  },

  {
    id: "shop-7",
    name: "Dell XPS 13 Plus",
    category: "Laptops",
    price: 999,
    rating: 4.5,
    reviewCount: 42,
    imageAlt: "Dell XPS 13 Plus",
    image: assets.shopdell,
  },

  {
    id: "shop-8",
    name: "Logitech G Pro X",
    category: "Accessories",
    price: 129,
    rating: 4.7,
    reviewCount: 78,
    imageAlt: "Logitech G Pro X Keyboard",
    image: assets.shoplogitech,
  },
];

export const productCategoryFilters: Array<
  "All Products" | ProductCategory
> = [
  "All Products",
  "Smartphones",
  "Laptops",
  "Audio",
  "Accessories",
  "Smartwatches",
];