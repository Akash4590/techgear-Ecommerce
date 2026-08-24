import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/product.js";

dotenv.config();

const products = [
  { name: "iPhone 15 Pro", category: "Smartphones", price: 1099, rating: 4.5, reviewCount: 128, imageAlt: "iPhone 15 Pro", image: "/images/iphone.png" },
  { name: "Samsung Galaxy S24", category: "Smartphones", price: 899, rating: 4.6, reviewCount: 142, imageAlt: "Samsung Galaxy S24", image: "/images/samsunggalaxy.png" },
  { name: "Google Pixel 9", category: "Smartphones", price: 799, rating: 4.5, reviewCount: 98, imageAlt: "Google Pixel 9", image: "/images/googlepixel.png" },
  { name: "MacBook Air M2", category: "Laptops", price: 1199, rating: 4.6, reviewCount: 96, imageAlt: "MacBook Air M2", image: "/images/macbook.png" },
  { name: "Dell XPS 15", category: "Laptops", price: 1399, rating: 4.7, reviewCount: 84, imageAlt: "Dell XPS 15", image: "/images/laptop.png" },
  { name: "Sony WH-1000XM5", category: "Audio", price: 349, rating: 4.7, reviewCount: 64, imageAlt: "Sony WH-1000XM5", image: "/images/dealHeadphones.png" },
  { name: "AirPods Pro 2", category: "Audio", price: 249, rating: 4.6, reviewCount: 156, imageAlt: "AirPods Pro 2", image: "/images/airpods.png" },
  { name: "Apple Watch Series 9", category: "Accessories", price: 399, rating: 4.4, reviewCount: 42, imageAlt: "Apple Watch Series 9", image: "/images/smartwatch.png" },

  { name: "iPhone 15 Pro Max", category: "Smartphones", price: 1199, rating: 4.8, reviewCount: 128, imageAlt: "iPhone 15 Pro Max", image: "/images/shopiphone.png", isDeal: true, discountPercent: 15 },
  { name: "MacBook Air M3", category: "Laptops", price: 1099, rating: 4.9, reviewCount: 89, imageAlt: "MacBook Air M3", image: "/images/shopmacbook.png" },
  { name: "Sony WH-1000XM5", category: "Audio", price: 349, rating: 4.7, reviewCount: 56, imageAlt: "Sony WH-1000XM5 Headphones", image: "/images/shopsony.png", isDeal: true, discountPercent: 18 },
  { name: "Apple Watch Series 9", category: "Smartwatches", price: 399, rating: 4.7, reviewCount: 72, imageAlt: "Apple Watch Series 9", image: "/images/shopapplewatch.png" },
  { name: "AirPods Pro (2nd Gen)", category: "Audio", price: 249, rating: 4.8, reviewCount: 95, imageAlt: "AirPods Pro 2nd Generation", image: "/images/shopairpods.png" },
  { name: "Samsung Galaxy S24 Ultra", category: "Smartphones", price: 1049, rating: 4.6, reviewCount: 68, imageAlt: "Samsung Galaxy S24 Ultra", image: "/images/shopsamsung.png", isDeal: true, discountPercent: 12 },
  { name: "Dell XPS 13 Plus", category: "Laptops", price: 999, rating: 4.5, reviewCount: 42, imageAlt: "Dell XPS 13 Plus", image: "/images/shopdell.png" },
  { name: "Logitech G Pro X", category: "Accessories", price: 129, rating: 4.7, reviewCount: 78, imageAlt: "Logitech G Pro X Keyboard", image: "/images/shoplogitech.png", isDeal: true, discountPercent: 10 },

  { name: "iPhone 15", category: "Smartphones", price: 799, rating: 4.6, reviewCount: 114, imageAlt: "iPhone 15", image: "/images/shopiphone15.png" },
  { name: "iPhone 14 Pro", category: "Smartphones", price: 899, rating: 4.7, reviewCount: 96, imageAlt: "iPhone 14 Pro", image: "/images/shopiphonepro.png" },
  { name: "iPhone 14", category: "Smartphones", price: 699, rating: 4.5, reviewCount: 87, imageAlt: "iPhone 14", image: "/images/shopiphone.png" },
  { name: "Samsung Galaxy S23", category: "Smartphones", price: 699, rating: 4.6, reviewCount: 123, imageAlt: "Samsung Galaxy S23", image: "/images/shopsamsungs.png" },
  { name: "Samsung Galaxy S23 Ultra", category: "Smartphones", price: 899, rating: 4.7, reviewCount: 109, imageAlt: "Samsung Galaxy S23 Ultra", image: "/images/shopsamsung1.png" },
  { name: "Samsung Galaxy A55", category: "Smartphones", price: 449, rating: 4.5, reviewCount: 76, imageAlt: "Samsung Galaxy A55", image: "/images/shopsamsung.png" },
  { name: "Google Pixel 8 Pro", category: "Smartphones", price: 899, rating: 4.7, reviewCount: 91, imageAlt: "Google Pixel 8 Pro", image: "/images/shopgoogle.png" },
  { name: "Google Pixel 8", category: "Smartphones", price: 699, rating: 4.6, reviewCount: 84, imageAlt: "Google Pixel 8", image: "/images/shopgooglepixel.png" },
  { name: "Google Pixel 7a", category: "Smartphones", price: 499, rating: 4.4, reviewCount: 63, imageAlt: "Google Pixel 7a", image: "/images/shopiphone16.png" },
  { name: "OnePlus 12", category: "Smartphones", price: 799, rating: 4.6, reviewCount: 71, imageAlt: "OnePlus 12", image: "/images/shoponeplus.png" },
  { name: "Xiomi", category: "Smartphones", price: 599, rating: 4.5, reviewCount: 58, imageAlt: "OnePlus 12R", image: "/images/shopxiaomi.png" },
  { name: "Samsung Galaxy Z Flip 5", category: "Smartphones", price: 999, rating: 4.5, reviewCount: 67, imageAlt: "Samsung Galaxy Z Flip 5", image: "/images/samsunggalaxy.png" },

  { name: "MacBook Pro 14", category: "Laptops", price: 1599, rating: 4.9, reviewCount: 112, imageAlt: "MacBook Pro 14", image: "/images/shopmacbookpro.png", isDeal: true, discountPercent: 10 },
  { name: "MacBook Pro 16", category: "Laptops", price: 2499, rating: 4.8, reviewCount: 94, imageAlt: "MacBook Pro 16", image: "/images/shopmacbook1.png" },
  { name: "MacBook Air M1", category: "Laptops", price: 899, rating: 4.7, reviewCount: 135, imageAlt: "MacBook Air M1", image: "/images/shopmacbookair.png", isDeal: true, discountPercent: 20 },
  { name: "Dell XPS 15", category: "Laptops", price: 1399, rating: 4.7, reviewCount: 84, imageAlt: "Dell XPS 15", image: "/images/shopdell.png" },
  { name: "HP Spectre", category: "Laptops", price: 849, rating: 4.5, reviewCount: 72, imageAlt: "Dell Inspiron 16", image: "/images/shophp.png" },
  { name: "HP Spectre x360", category: "Laptops", price: 1299, rating: 4.6, reviewCount: 68, imageAlt: "HP Spectre x360", image: "/images/shophpsectre.png" },
  { name: "Lenovo ThinkPad X1", category: "Laptops", price: 1399, rating: 4.7, reviewCount: 61, imageAlt: "Lenovo ThinkPad X1", image: "/images/shoplenovo.png" },
  { name: "MacBook M1", category: "Laptops", price: 1799, rating: 4.8, reviewCount: 53, imageAlt: "ASUS ROG Zephyrus", image: "/images/shopmacbook1.png" },
  { name: "Acer Swift Go", category: "Laptops", price: 799, rating: 4.4, reviewCount: 47, imageAlt: "Acer Swift Go", image: "/images/shopmacbook.png" },
  { name: "Microsoft Surface Laptop", category: "Laptops", price: 1199, rating: 4.5, reviewCount: 55, imageAlt: "Microsoft Surface Laptop", image: "/images/laptop.png" },

  { name: "Bose QuietComfort Ultra", category: "Audio", price: 429, rating: 4.8, reviewCount: 88, imageAlt: "Bose QuietComfort Ultra", image: "/images/shopairpods.png" },
  { name: "Bose QuietComfort", category: "Audio", price: 349, rating: 4.7, reviewCount: 74, imageAlt: "Bose QuietComfort", image: "/images/shopairpods1.png" },
  { name: "AirPods 3rd Generation", category: "Audio", price: 179, rating: 4.6, reviewCount: 121, imageAlt: "AirPods 3rd Generation", image: "/images/shopairpods2.png" },
  { name: "AirPods Max", category: "Audio", price: 549, rating: 4.7, reviewCount: 82, imageAlt: "AirPods Max", image: "/images/shopairpods3.png", isDeal: true, discountPercent: 25 },
  { name: "Sony WF-1000XM5", category: "Audio", price: 299, rating: 4.7, reviewCount: 97, imageAlt: "Sony WF-1000XM5", image: "/images/shopairpods4.png" },
  { name: "JBL Live 660NC", category: "Audio", price: 199, rating: 4.5, reviewCount: 63, imageAlt: "JBL Live 660NC", image: "/images/shopsony.png" },
  { name: "JBL Tune 770NC", category: "Audio", price: 129, rating: 4.4, reviewCount: 52, imageAlt: "JBL Tune 770NC", image: "/images/shopsony1.png" },
  { name: "Beats Studio Pro", category: "Audio", price: 349, rating: 4.6, reviewCount: 71, imageAlt: "Beats Studio Pro", image: "/images/shopsony3.png" },
  { name: "Sennheiser Momentum 4", category: "Audio", price: 379, rating: 4.7, reviewCount: 66, imageAlt: "Sennheiser Momentum 4", image: "/images/shopsony6.png" },
  { name: "Anker Soundcore Q45", category: "Audio", price: 149, rating: 4.5, reviewCount: 59, imageAlt: "Anker Soundcore Q45", image: "/images/shopsony2.png" },

  { name: "Apple Magic Keyboard", category: "Accessories", price: 99, rating: 4.6, reviewCount: 74, imageAlt: "Apple Magic Keyboard", image: "/images/shopboard.png", isDeal: true, discountPercent: 10 },
  { name: "Logitech MX Keys", category: "Accessories", price: 119, rating: 4.7, reviewCount: 83, imageAlt: "Logitech MX Keys", image: "/images/shopboard1.png" },
  { name: "Logitech MX Master 3S", category: "Accessories", price: 99, rating: 4.8, reviewCount: 91, imageAlt: "Logitech MX Master 3S", image: "/images/shopboard2.png" },
  { name: "Apple Magic Mouse", category: "Accessories", price: 79, rating: 4.4, reviewCount: 62, imageAlt: "Apple Magic Mouse", image: "/images/shopboard3.png" },
  { name: "USB-C Hub 7-in-1", category: "Accessories", price: 49, rating: 4.5, reviewCount: 88, imageAlt: "USB-C Hub", image: "/images/shopboard4.png" },
  { name: "Anker USB-C Charger", category: "Accessories", price: 39, rating: 4.7, reviewCount: 103, imageAlt: "Anker USB-C Charger", image: "/images/shoplogitech.png" },
  { name: "MagSafe Charger", category: "Accessories", price: 39, rating: 4.6, reviewCount: 96, imageAlt: "MagSafe Charger", image: "/images/shopboard3.png" },
  { name: "Apple MagSafe Battery Pack", category: "Accessories", price: 99, rating: 4.3, reviewCount: 51, imageAlt: "Apple MagSafe Battery Pack", image: "/images/shopboard4.png" },
  { name: "Laptop Stand", category: "Accessories", price: 59, rating: 4.5, reviewCount: 47, imageAlt: "Laptop Stand", image: "/images/shopboard1.png" },
  { name: "Mechanical Gaming Keyboard", category: "Accessories", price: 129, rating: 4.7, reviewCount: 79, imageAlt: "Mechanical Gaming Keyboard", image: "/images/shopboard.png" },

  { name: "Apple Watch Series 10", category: "Smartwatches", price: 429, rating: 4.8, reviewCount: 93, imageAlt: "Apple Watch Series 10", image: "/images/shopwatch.png", isDeal: true, discountPercent: 15 },
  { name: "Apple Watch Ultra 2", category: "Smartwatches", price: 799, rating: 4.8, reviewCount: 72, imageAlt: "Apple Watch Ultra 2", image: "/images/shopwatch1.png" },
  { name: "Samsung Galaxy Watch 7", category: "Smartwatches", price: 329, rating: 4.6, reviewCount: 68, imageAlt: "Samsung Galaxy Watch 7", image: "/images/shopwatch2.png" },
  { name: "Samsung Galaxy Watch 6", category: "Smartwatches", price: 249, rating: 4.5, reviewCount: 59, imageAlt: "Samsung Galaxy Watch 6", image: "/images/shopwatch3.png" },
  { name: "Google Pixel Watch 2", category: "Smartwatches", price: 299, rating: 4.5, reviewCount: 61, imageAlt: "Google Pixel Watch 2", image: "/images/shopwatch4.png" },
  { name: "Garmin Venu 3", category: "Smartwatches", price: 449, rating: 4.7, reviewCount: 48, imageAlt: "Garmin Venu 3", image: "/images/shopwatch2.png" },
  { name: "Fitbit Sense 2", category: "Smartwatches", price: 249, rating: 4.4, reviewCount: 57, imageAlt: "Fitbit Sense 2", image: "/images/shopwatch1.png" },
  { name: "Amazfit GTR 4", category: "Smartwatches", price: 199, rating: 4.5, reviewCount: 43, imageAlt: "Amazfit GTR 4", image: "/images/shopwatch.png" },
];

const seedProducts = async () => {
  await mongoose.connect(process.env.MONGO_URI as string);
  console.log("Connected to MongoDB");

  await Product.deleteMany({}); // Purana data clear karo pehle
  await Product.insertMany(products);

  console.log(`${products.length} products seeded successfully`);
  process.exit(0);
};

seedProducts().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});