import { assets } from "../assets/assets";

export type ProductCategory =
  | "Smartphones"
  | "Laptops"
  | "Audio"
  | "Accessories"
  | "Smartwatches";

export interface ColorOption {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  rating: number;
  reviewCount: number;
  imageAlt: string;
  image: string;
  images?: string[];
  colors?: ColorOption[];
  storageOptions?: string[];
  description?: string;
  inStock?: boolean;
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
    storageOptions: ["128GB", "256GB", "512GB", "1TB"],
    colors: [
      { name: "Natural Titanium", hex: "#E3E0D8" },
      { name: "Blue Titanium", hex: "#3B4657" },
      { name: "White Titanium", hex: "#F0F0E8" },
      { name: "Black Titanium", hex: "#3C3C3E" },
    ],
    description:
      "Forged from titanium and featuring the powerful A17 Pro chip, the iPhone 15 Pro delivers a pro-level camera system, a customizable Action button, and USB-C connectivity in our lightest Pro design yet.",
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
    storageOptions: ["128GB", "256GB", "512GB"],
    colors: [
      { name: "Onyx Black", hex: "#171717" },
      { name: "Marble Gray", hex: "#7D7D7D" },
      { name: "Cobalt Violet", hex: "#6B5B95" },
      { name: "Amber Yellow", hex: "#E8B923" },
    ],
    description:
      "The Samsung Galaxy S24 combines a stunning Dynamic AMOLED display with Galaxy AI features, a versatile triple-camera system, and all-day battery life in a sleek, durable aluminum frame.",
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
    storageOptions: ["128GB", "256GB", "512GB"],
    colors: [
      { name: "Obsidian", hex: "#1B1B1B" },
      { name: "Porcelain", hex: "#F1EDE6" },
      { name: "Wintergreen", hex: "#B6C4B6" },
      { name: "Peony", hex: "#E8B4C0" },
    ],
    description:
      "Google Pixel 9 brings the best of Google AI to your pocket, with an advanced computational photography system, a clean Android experience, and industry-leading software support.",
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
    storageOptions: ["256GB", "512GB", "1TB"],
    colors: [
      { name: "Midnight", hex: "#1E2129" },
      { name: "Starlight", hex: "#F0E5D3" },
      { name: "Space Gray", hex: "#57595B" },
      { name: "Silver", hex: "#E3E4E5" },
    ],
    description:
      "Strikingly thin and fast, the MacBook Air M2 features a fanless design, a brilliant Liquid Retina display, and up to 18 hours of battery life — built for everyday productivity on the go.",
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
    storageOptions: ["512GB", "1TB", "2TB"],
    colors: [
      { name: "Platinum Silver", hex: "#C7CACB" },
      { name: "Graphite", hex: "#4B4B4B" },
    ],
    description:
      "The Dell XPS 15 pairs a stunning InfinityEdge display with powerful performance, making it an ideal choice for creative professionals who need reliable power in a premium, compact chassis.",
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
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Silver", hex: "#D8D9D6" },
      { name: "Midnight Blue", hex: "#263248" },
    ],
    description:
      "Industry-leading noise cancellation meets exceptional sound quality in the Sony WH-1000XM5. Enjoy up to 30 hours of battery life and crystal-clear calls with precise voice pickup technology.",
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
    colors: [{ name: "White", hex: "#FFFFFF" }],
    description:
      "AirPods Pro (2nd generation) deliver up to 2x more Active Noise Cancellation, Adaptive Transparency, and Personalized Spatial Audio for an immersive listening experience wherever you go.",
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
    colors: [
      { name: "Midnight", hex: "#1E2129" },
      { name: "Starlight", hex: "#F0E5D3" },
      { name: "Silver", hex: "#E3E4E5" },
      { name: "(PRODUCT)RED", hex: "#B1050E" },
    ],
    description:
      "Apple Watch Series 9 introduces the powerful S9 chip, a brighter display, and the new double tap gesture — helping you stay connected, active, and healthy every single day.",
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
    storageOptions: ["128GB", "256GB", "512GB", "1TB"],
    colors: [
      { name: "Natural Titanium", hex: "#E3E0D8" },
      { name: "Blue Titanium", hex: "#3B4657" },
      { name: "White Titanium", hex: "#F0F0E8" },
      { name: "Black Titanium", hex: "#3C3C3E" },
    ],
    description:
      "The iPhone 15 Pro Max features a 6.7-inch Super Retina XDR display, a 5x Telephoto camera, and the A17 Pro chip — engineered for the ultimate pro mobile photography and gaming experience.",
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
    storageOptions: ["256GB", "512GB", "1TB"],
    colors: [
      { name: "Midnight", hex: "#1E2129" },
      { name: "Starlight", hex: "#F0E5D3" },
      { name: "Space Gray", hex: "#57595B" },
      { name: "Silver", hex: "#E3E4E5" },
    ],
    description:
      "Supercharged by the M3 chip, the MacBook Air delivers exceptional performance and battery life in an incredibly thin and light design, perfect for work, creativity, and everything in between.",
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
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Silver", hex: "#D8D9D6" },
      { name: "Midnight Blue", hex: "#263248" },
    ],
    description:
      "Experience the next level of quiet with the Sony WH-1000XM5, featuring two processors and eight microphones for unprecedented noise cancellation and superior call clarity.",
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
    colors: [
      { name: "Midnight", hex: "#1E2129" },
      { name: "Starlight", hex: "#F0E5D3" },
      { name: "Silver", hex: "#E3E4E5" },
      { name: "(PRODUCT)RED", hex: "#B1050E" },
    ],
    description:
      "Track your fitness, stay connected, and manage your health with Apple Watch Series 9 — featuring an always-on Retina display and advanced health sensors in a durable, stylish design.",
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
    colors: [{ name: "White", hex: "#FFFFFF" }],
    description:
      "AirPods Pro (2nd generation) offer richer audio, smarter noise cancellation, and a redesigned charging case with Find My support — the ultimate everyday wireless earbuds.",
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
    storageOptions: ["256GB", "512GB", "1TB"],
    colors: [
      { name: "Titanium Black", hex: "#2B2B2B" },
      { name: "Titanium Gray", hex: "#8A8A8A" },
      { name: "Titanium Violet", hex: "#7A6C8E" },
      { name: "Titanium Yellow", hex: "#D8C36B" },
    ],
    description:
      "The Samsung Galaxy S24 Ultra features a built-in S Pen, a titanium frame, and a 200MP camera system with Galaxy AI, redefining what's possible on a premium Android flagship.",
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
    storageOptions: ["512GB", "1TB"],
    colors: [
      { name: "Platinum Silver", hex: "#C7CACB" },
      { name: "Graphite", hex: "#4B4B4B" },
    ],
    description:
      "The Dell XPS 13 Plus features a futuristic capacitive touch function row, a stunning edge-to-edge display, and a compact aluminum chassis built for modern mobile productivity.",
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
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "White", hex: "#F5F5F5" },
    ],
    description:
      "Engineered with pro gamers, the Logitech G Pro X keyboard offers hot-swappable mechanical switches, a compact tenkeyless design, and durable aircraft-grade materials for competitive play.",
  },
  {
    id: "shop-9",
    name: "iPhone 15",
    category: "Smartphones",
    price: 799,
    rating: 4.6,
    reviewCount: 114,
    imageAlt: "iPhone 15",
    image: assets.shopiphone15,
    storageOptions: ["128GB", "256GB", "512GB"],
    colors: [
      { name: "Black", hex: "#3A3A3C" },
      { name: "Blue", hex: "#5E7C9B" },
      { name: "Green", hex: "#A9BFA8" },
      { name: "Yellow", hex: "#F1E2A0" },
      { name: "Pink", hex: "#F0D0D6" },
    ],
    description:
      "iPhone 15 features Dynamic Island, a 48MP Main camera, and USB-C — all wrapped in a durable color-infused glass and aluminum design that feels as good as it looks.",
  },
  {
    id: "shop-10",
    name: "iPhone 14 Pro",
    category: "Smartphones",
    price: 899,
    rating: 4.7,
    reviewCount: 96,
    imageAlt: "iPhone 14 Pro",
    image: assets.shopiphonepro,
    storageOptions: ["128GB", "256GB", "512GB", "1TB"],
    colors: [
      { name: "Deep Purple", hex: "#4A3C57" },
      { name: "Gold", hex: "#E8DCC0" },
      { name: "Silver", hex: "#E3E4E5" },
      { name: "Space Black", hex: "#2B2B2C" },
    ],
    description:
      "iPhone 14 Pro introduces Dynamic Island, an Always-On display, and a 48MP camera with next-level detail — powered by the industry-leading A16 Bionic chip.",
  },
  {
    id: "shop-11",
    name: "iPhone 14",
    category: "Smartphones",
    price: 699,
    rating: 4.5,
    reviewCount: 87,
    imageAlt: "iPhone 14",
    image: assets.shopiphone,
    storageOptions: ["128GB", "256GB", "512GB"],
    colors: [
      { name: "Midnight", hex: "#1E2129" },
      { name: "Starlight", hex: "#F0E5D3" },
      { name: "Blue", hex: "#7B9EC0" },
      { name: "(PRODUCT)RED", hex: "#B1050E" },
      { name: "Purple", hex: "#C5B4D9" },
    ],
    description:
      "iPhone 14 delivers essential upgrades to the most important parts of iPhone — an advanced camera system, super-fast performance, and all-day battery life.",
  },
  {
    id: "shop-12",
    name: "Samsung Galaxy S23",
    category: "Smartphones",
    price: 699,
    rating: 4.6,
    reviewCount: 123,
    imageAlt: "Samsung Galaxy S23",
    image: assets.shopsamsungs,
    storageOptions: ["128GB", "256GB"],
    colors: [
      { name: "Phantom Black", hex: "#1B1B1B" },
      { name: "Cream", hex: "#EDE6D6" },
      { name: "Green", hex: "#7C9B7E" },
      { name: "Lavender", hex: "#C9BFE0" },
    ],
    description:
      "The Samsung Galaxy S23 packs a powerful Snapdragon 8 Gen 2 processor and a refined camera system into a compact, comfortable design built for everyday performance.",
  },
  {
    id: "shop-13",
    name: "Samsung Galaxy S23 Ultra",
    category: "Smartphones",
    price: 899,
    rating: 4.7,
    reviewCount: 109,
    imageAlt: "Samsung Galaxy S23 Ultra",
    image: assets.shopsamsung1,
    storageOptions: ["256GB", "512GB", "1TB"],
    colors: [
      { name: "Phantom Black", hex: "#1B1B1B" },
      { name: "Green", hex: "#7C9B7E" },
      { name: "Cream", hex: "#EDE6D6" },
      { name: "Lavender", hex: "#C9BFE0" },
    ],
    description:
      "Samsung Galaxy S23 Ultra combines a built-in S Pen, a 200MP camera, and a durable titanium-reinforced frame for the ultimate creative and productivity powerhouse.",
  },
  {
    id: "shop-14",
    name: "Samsung Galaxy A55",
    category: "Smartphones",
    price: 449,
    rating: 4.5,
    reviewCount: 76,
    imageAlt: "Samsung Galaxy A55",
    image: assets.shopsamsung,
    storageOptions: ["128GB", "256GB"],
    colors: [
      { name: "Awesome Navy", hex: "#2B3A55" },
      { name: "Awesome Lilac", hex: "#C8B8D8" },
      { name: "Awesome Lime", hex: "#C6D96A" },
    ],
    description:
      "The Samsung Galaxy A55 offers a vibrant Super AMOLED display, a reliable multi-camera setup, and long-lasting battery life at a price built for everyday value.",
  },
  {
    id: "shop-15",
    name: "Google Pixel 8 Pro",
    category: "Smartphones",
    price: 899,
    rating: 4.7,
    reviewCount: 91,
    imageAlt: "Google Pixel 8 Pro",
    image: assets.shopgoogle,
    storageOptions: ["128GB", "256GB", "512GB"],
    colors: [
      { name: "Obsidian", hex: "#1B1B1B" },
      { name: "Porcelain", hex: "#F1EDE6" },
      { name: "Bay", hex: "#5A7A8C" },
    ],
    description:
      "Google Pixel 8 Pro is powered by Google Tensor G3, unlocking advanced AI photography features, a stunning Super Actua display, and 7 years of software updates.",
  },
  {
    id: "shop-16",
    name: "Google Pixel 8",
    category: "Smartphones",
    price: 699,
    rating: 4.6,
    reviewCount: 84,
    imageAlt: "Google Pixel 8",
    image: assets.shopgooglepixel,
    storageOptions: ["128GB", "256GB"],
    colors: [
      { name: "Obsidian", hex: "#1B1B1B" },
      { name: "Hazel", hex: "#7A7A6A" },
      { name: "Rose", hex: "#E8C4C4" },
    ],
    description:
      "Google Pixel 8 delivers helpful AI features, a stunning display, and an advanced camera in a compact, durable design — with years of guaranteed feature and security updates.",
  },
  {
    id: "shop-17",
    name: "Google Pixel 7a",
    category: "Smartphones",
    price: 499,
    rating: 4.4,
    reviewCount: 63,
    imageAlt: "Google Pixel 7a",
    image: assets.shopiphone16,
    storageOptions: ["128GB"],
    colors: [
      { name: "Charcoal", hex: "#3C3C3C" },
      { name: "Sea", hex: "#A6C0C6" },
      { name: "Snow", hex: "#F0EDE6" },
      { name: "Coral", hex: "#E8927C" },
    ],
    description:
      "Google Pixel 7a brings flagship-level camera features and the helpful, personalized experience of Pixel to an accessible price point, without compromising on core performance.",
  },
  {
    id: "shop-18",
    name: "OnePlus 12",
    category: "Smartphones",
    price: 799,
    rating: 4.6,
    reviewCount: 71,
    imageAlt: "OnePlus 12",
    image: assets.shoponeplus,
    storageOptions: ["256GB", "512GB"],
    colors: [
      { name: "Flowy Emerald", hex: "#2F6B57" },
      { name: "Silky Black", hex: "#1C1C1C" },
    ],
    description:
      "OnePlus 12 features a Hasselblad-tuned camera system, blazing-fast 100W charging, and a top-tier Snapdragon processor — built for speed in every sense of the word.",
  },
  {
    id: "shop-19",
    name: "Xiomi",
    category: "Smartphones",
    price: 599,
    rating: 4.5,
    reviewCount: 58,
    imageAlt: "OnePlus 12R",
    image: assets.shopxiaomi,
    storageOptions: ["128GB", "256GB"],
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Blue", hex: "#4A6FA5" },
      { name: "White", hex: "#F0F0F0" },
    ],
    description:
      "This Xiaomi flagship delivers a premium AMOLED display, a versatile camera array, and fast charging technology, offering excellent performance at a competitive price.",
  },
  {
    id: "shop-20",
    name: "Samsung Galaxy Z Flip 5",
    category: "Smartphones",
    price: 999,
    rating: 4.5,
    reviewCount: 67,
    imageAlt: "Samsung Galaxy Z Flip 5",
    image: assets.samsunggalaxy,
    storageOptions: ["256GB", "512GB"],
    colors: [
      { name: "Mint", hex: "#B8D8C8" },
      { name: "Graphite", hex: "#3C3C3C" },
      { name: "Cream", hex: "#EDE6D6" },
      { name: "Lavender", hex: "#C9BFE0" },
    ],
    description:
      "Samsung Galaxy Z Flip 5 introduces a larger Flex Window cover screen and a refined hinge design, blending pocket-friendly style with genuine flagship performance.",
  },

  // Laptops
  {
    id: "shop-21",
    name: "MacBook Pro 14",
    category: "Laptops",
    price: 1599,
    rating: 4.9,
    reviewCount: 112,
    imageAlt: "MacBook Pro 14",
    image: assets.shopmacbookpro,
    storageOptions: ["512GB", "1TB", "2TB"],
    colors: [
      { name: "Space Black", hex: "#1E1E1E" },
      { name: "Silver", hex: "#E3E4E5" },
    ],
    description:
      "The MacBook Pro 14-inch, powered by the M3 Pro chip, delivers extraordinary performance for demanding workflows, with a stunning Liquid Retina XDR display and all-day battery life.",
  },
  {
    id: "shop-22",
    name: "MacBook Pro 16",
    category: "Laptops",
    price: 2499,
    rating: 4.8,
    reviewCount: 94,
    imageAlt: "MacBook Pro 16",
    image: assets.shopmacbook1,
    storageOptions: ["512GB", "1TB", "2TB"],
    colors: [
      { name: "Space Black", hex: "#1E1E1E" },
      { name: "Silver", hex: "#E3E4E5" },
    ],
    description:
      "MacBook Pro 16-inch is the ultimate pro laptop, offering exceptional performance for the most demanding creative and technical workflows on a massive Liquid Retina XDR display.",
  },
  {
    id: "shop-23",
    name: "MacBook Air M1",
    category: "Laptops",
    price: 899,
    rating: 4.7,
    reviewCount: 135,
    imageAlt: "MacBook Air M1",
    image: assets.shopmacbookair,
    storageOptions: ["256GB", "512GB"],
    colors: [
      { name: "Space Gray", hex: "#57595B" },
      { name: "Gold", hex: "#E8DCC0" },
      { name: "Silver", hex: "#E3E4E5" },
    ],
    description:
      "The original MacBook Air M1 redefined what a laptop could do — fanless, silent, and remarkably fast, it remains an excellent everyday companion for work and study.",
  },
  {
    id: "shop-24",
    name: "Dell XPS 15",
    category: "Laptops",
    price: 1399,
    rating: 4.7,
    reviewCount: 84,
    imageAlt: "Dell XPS 15",
    image: assets.shopdell,
    storageOptions: ["512GB", "1TB", "2TB"],
    colors: [
      { name: "Platinum Silver", hex: "#C7CACB" },
      { name: "Graphite", hex: "#4B4B4B" },
    ],
    description:
      "The Dell XPS 15 pairs a stunning InfinityEdge display with powerful performance, making it an ideal choice for creative professionals who need reliable power in a premium, compact chassis.",
  },
  {
    id: "shop-25",
    name: "HP Spectre",
    category: "Laptops",
    price: 849,
    rating: 4.5,
    reviewCount: 72,
    imageAlt: "Dell Inspiron 16",
    image: assets.shophp,
    storageOptions: ["512GB", "1TB"],
    colors: [
      { name: "Nightfall Black", hex: "#1A1A1A" },
      { name: "Nocturne Blue", hex: "#2A3A55" },
    ],
    description:
      "HP Spectre combines a striking gem-cut design with solid everyday performance, offering a premium look and feel for users who want style alongside substance.",
  },
  {
    id: "shop-26",
    name: "HP Spectre x360",
    category: "Laptops",
    price: 1299,
    rating: 4.6,
    reviewCount: 68,
    imageAlt: "HP Spectre x360",
    image: assets.shophpsectre,
    storageOptions: ["512GB", "1TB"],
    colors: [
      { name: "Nightfall Black", hex: "#1A1A1A" },
      { name: "Nocturne Blue", hex: "#2A3A55" },
    ],
    description:
      "HP Spectre x360 is a versatile 2-in-1 convertible laptop, offering a gorgeous OLED display, all-day battery life, and the flexibility to work, watch, and create in any mode.",
  },
  {
    id: "shop-27",
    name: "Lenovo ThinkPad X1",
    category: "Laptops",
    price: 1399,
    rating: 4.7,
    reviewCount: 61,
    imageAlt: "Lenovo ThinkPad X1",
    image: assets.shoplenovo,
    storageOptions: ["512GB", "1TB"],
    colors: [{ name: "Black", hex: "#1A1A1A" }],
    description:
      "The Lenovo ThinkPad X1 Carbon is a business-class laptop built for durability and security, featuring a lightweight carbon-fiber chassis and legendary ThinkPad keyboard.",
  },
  {
    id: "shop-28",
    name: "MacBook M1",
    category: "Laptops",
    price: 1799,
    rating: 4.8,
    reviewCount: 53,
    imageAlt: "ASUS ROG Zephyrus",
    image: assets.shopmacbook1,
    storageOptions: ["256GB", "512GB"],
    colors: [
      { name: "Space Gray", hex: "#57595B" },
      { name: "Gold", hex: "#E8DCC0" },
      { name: "Silver", hex: "#E3E4E5" },
    ],
    description:
      "This MacBook with the M1 chip delivers a powerful blend of speed and efficiency, ideal for creative professionals and everyday multitasking alike.",
  },
  {
    id: "shop-29",
    name: "Acer Swift Go",
    category: "Laptops",
    price: 799,
    rating: 4.4,
    reviewCount: 47,
    imageAlt: "Acer Swift Go",
    image: assets.shopmacbook,
    storageOptions: ["512GB"],
    colors: [{ name: "Pure Silver", hex: "#D6D6D6" }],
    description:
      "Acer Swift Go is a lightweight, budget-friendly laptop that doesn't compromise on essentials — a sharp display, solid performance, and a durable aluminum design.",
  },
  {
    id: "shop-30",
    name: "Microsoft Surface Laptop",
    category: "Laptops",
    price: 1199,
    rating: 4.5,
    reviewCount: 55,
    imageAlt: "Microsoft Surface Laptop",
    image: assets.laptop,
    storageOptions: ["256GB", "512GB"],
    colors: [
      { name: "Platinum", hex: "#C7CACB" },
      { name: "Sandstone", hex: "#C8A88A" },
      { name: "Matte Black", hex: "#1A1A1A" },
    ],
    description:
      "Microsoft Surface Laptop combines elegant design with a vibrant PixelSense touchscreen and reliable Windows performance, ideal for productivity on the move.",
  },

  // Audio
  {
    id: "shop-31",
    name: "Bose QuietComfort Ultra",
    category: "Audio",
    price: 429,
    rating: 4.8,
    reviewCount: 88,
    imageAlt: "Bose QuietComfort Ultra",
    image: assets.shopairpods,
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "White Smoke", hex: "#E8E4DC" },
      { name: "Sandstone", hex: "#C8A88A" },
    ],
    description:
      "Bose QuietComfort Ultra headphones deliver the brand's best noise cancellation yet, paired with immersive spatial audio for an unmatched listening experience anywhere.",
  },
  {
    id: "shop-32",
    name: "Bose QuietComfort",
    category: "Audio",
    price: 349,
    rating: 4.7,
    reviewCount: 74,
    imageAlt: "Bose QuietComfort",
    image: assets.shopairpods1,
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "White Smoke", hex: "#E8E4DC" },
    ],
    description:
      "Bose QuietComfort headphones are renowned for world-class noise cancellation and all-day comfort, making them a trusted choice for travel and daily commutes.",
  },
  {
    id: "shop-33",
    name: "AirPods 3rd Generation",
    category: "Audio",
    price: 179,
    rating: 4.6,
    reviewCount: 121,
    imageAlt: "AirPods 3rd Generation",
    image: assets.shopairpods2,
    colors: [{ name: "White", hex: "#FFFFFF" }],
    description:
      "AirPods (3rd generation) feature Spatial Audio, a contoured design for all-day comfort, and sweat and water resistance — built for an active lifestyle.",
  },
  {
    id: "shop-34",
    name: "AirPods Max",
    category: "Audio",
    price: 549,
    rating: 4.7,
    reviewCount: 82,
    imageAlt: "AirPods Max",
    image: assets.shopairpods3,
    colors: [
      { name: "Space Gray", hex: "#57595B" },
      { name: "Silver", hex: "#E3E4E5" },
      { name: "Sky Blue", hex: "#A6C4D6" },
      { name: "Pink", hex: "#E8C4C4" },
      { name: "Green", hex: "#A9BFA8" },
    ],
    description:
      "AirPods Max deliver high-fidelity audio with Active Noise Cancellation and Spatial Audio, wrapped in a premium design with breathable mesh ear cushions.",
  },
  {
    id: "shop-35",
    name: "Sony WF-1000XM5",
    category: "Audio",
    price: 299,
    rating: 4.7,
    reviewCount: 97,
    imageAlt: "Sony WF-1000XM5",
    image: assets.shopairpods4,
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Silver", hex: "#D8D9D6" },
    ],
    description:
      "Sony WF-1000XM5 earbuds bring industry-leading noise cancellation into a smaller, more comfortable design, with exceptional sound quality and all-day battery life.",
  },
  {
    id: "shop-36",
    name: "JBL Live 660NC",
    category: "Audio",
    price: 199,
    rating: 4.5,
    reviewCount: 63,
    imageAlt: "JBL Live 660NC",
    image: assets.shopsony,
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Blue", hex: "#3A5A8C" },
      { name: "White", hex: "#F5F5F5" },
    ],
    description:
      "JBL Live 660NC headphones deliver JBL's signature deep bass sound along with adaptive noise cancellation, offering great value for everyday listening.",
  },
  {
    id: "shop-37",
    name: "JBL Tune 770NC",
    category: "Audio",
    price: 129,
    rating: 4.4,
    reviewCount: 52,
    imageAlt: "JBL Tune 770NC",
    image: assets.shopsony1,
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Blue", hex: "#3A5A8C" },
      { name: "White", hex: "#F5F5F5" },
    ],
    description:
      "JBL Tune 770NC combines active noise cancellation with JBL Pure Bass sound in a lightweight, foldable design built for long listening sessions.",
  },
  {
    id: "shop-38",
    name: "Beats Studio Pro",
    category: "Audio",
    price: 349,
    rating: 4.6,
    reviewCount: 71,
    imageAlt: "Beats Studio Pro",
    image: assets.shopsony3,
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Navy", hex: "#2A3A55" },
      { name: "Sandstone", hex: "#C8A88A" },
      { name: "White", hex: "#F5F5F5" },
    ],
    description:
      "Beats Studio Pro headphones offer custom acoustic architecture, adaptive noise cancellation, and seamless compatibility across both iOS and Android devices.",
  },
  {
    id: "shop-39",
    name: "Sennheiser Momentum 4",
    category: "Audio",
    price: 379,
    rating: 4.7,
    reviewCount: 66,
    imageAlt: "Sennheiser Momentum 4",
    image: assets.shopsony6,
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "White", hex: "#F5F5F5" },
      { name: "Graphite", hex: "#4B4B4B" },
    ],
    description:
      "Sennheiser Momentum 4 Wireless delivers audiophile-grade sound quality, adaptive noise cancellation, and an industry-leading 60-hour battery life.",
  },
  {
    id: "shop-40",
    name: "Anker Soundcore Q45",
    category: "Audio",
    price: 149,
    rating: 4.5,
    reviewCount: 59,
    imageAlt: "Anker Soundcore Q45",
    image: assets.shopsony2,
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Blue", hex: "#3A5A8C" },
    ],
    description:
      "Anker Soundcore Q45 offers premium noise cancellation and rich, customizable sound via the Soundcore app, delivering flagship features at an accessible price.",
  },

  // Accessories
  {
    id: "shop-41",
    name: "Apple Magic Keyboard",
    category: "Accessories",
    price: 99,
    rating: 4.6,
    reviewCount: 74,
    imageAlt: "Apple Magic Keyboard",
    image: assets.shopboard,
    colors: [
      { name: "White", hex: "#F5F5F5" },
      { name: "Black", hex: "#1A1A1A" },
    ],
    description:
      "Apple Magic Keyboard offers a comfortable, responsive typing experience with a scissor mechanism and rechargeable battery, seamlessly pairing with all your Apple devices.",
  },
  {
    id: "shop-42",
    name: "Logitech MX Keys",
    category: "Accessories",
    price: 119,
    rating: 4.7,
    reviewCount: 83,
    imageAlt: "Logitech MX Keys",
    image: assets.shopboard1,
    colors: [
      { name: "Graphite", hex: "#3C3C3C" },
      { name: "Pale Gray", hex: "#D6D6D0" },
    ],
    description:
      "Logitech MX Keys is a premium wireless keyboard with smart illumination, stable multi-device connectivity, and perfect stroke keys for a superior typing experience.",
  },
  {
    id: "shop-43",
    name: "Logitech MX Master 3S",
    category: "Accessories",
    price: 99,
    rating: 4.8,
    reviewCount: 91,
    imageAlt: "Logitech MX Master 3S",
    image: assets.shopboard2,
    colors: [
      { name: "Graphite", hex: "#3C3C3C" },
      { name: "Pale Gray", hex: "#D6D6D0" },
    ],
    description:
      "Logitech MX Master 3S delivers ultra-precise tracking, quiet clicks, and an 8K DPI sensor, making it the go-to mouse for professionals and power users.",
  },
  {
    id: "shop-44",
    name: "Apple Magic Mouse",
    category: "Accessories",
    price: 79,
    rating: 4.4,
    reviewCount: 62,
    imageAlt: "Apple Magic Mouse",
    image: assets.shopboard3,
    colors: [
      { name: "White", hex: "#F5F5F5" },
      { name: "Black", hex: "#1A1A1A" },
    ],
    description:
      "Apple Magic Mouse features a Multi-Touch surface for intuitive gestures, a sleek low-profile design, and effortless pairing with your Mac.",
  },
  {
    id: "shop-45",
    name: "USB-C Hub 7-in-1",
    category: "Accessories",
    price: 49,
    rating: 4.5,
    reviewCount: 88,
    imageAlt: "USB-C Hub",
    image: assets.shopboard4,
    colors: [
      { name: "Space Gray", hex: "#57595B" },
      { name: "Silver", hex: "#E3E4E5" },
    ],
    description:
      "This 7-in-1 USB-C Hub expands your laptop's connectivity with HDMI, USB-A, SD card, and fast-charging pass-through ports, all in one compact adapter.",
  },
  {
    id: "shop-46",
    name: "Anker USB-C Charger",
    category: "Accessories",
    price: 39,
    rating: 4.7,
    reviewCount: 103,
    imageAlt: "Anker USB-C Charger",
    image: assets.shoplogitech,
    colors: [
      { name: "White", hex: "#F5F5F5" },
      { name: "Black", hex: "#1A1A1A" },
    ],
    description:
      "Anker's compact USB-C charger delivers fast, safe charging for phones, tablets, and laptops, backed by Anker's trusted safety and reliability standards.",
  },
  {
    id: "shop-47",
    name: "MagSafe Charger",
    category: "Accessories",
    price: 39,
    rating: 4.6,
    reviewCount: 96,
    imageAlt: "MagSafe Charger",
    image: assets.shopboard3,
    colors: [{ name: "White", hex: "#F5F5F5" }],
    description:
      "The MagSafe Charger snaps perfectly into place for fast, effortless wireless charging on any MagSafe-compatible iPhone.",
  },
  {
    id: "shop-48",
    name: "Apple MagSafe Battery Pack",
    category: "Accessories",
    price: 99,
    rating: 4.3,
    reviewCount: 51,
    imageAlt: "Apple MagSafe Battery Pack",
    image: assets.shopboard4,
    colors: [{ name: "White", hex: "#F5F5F5" }],
    description:
      "The Apple MagSafe Battery Pack attaches magnetically to your iPhone for convenient on-the-go charging, with seamless power sharing and Find My integration.",
  },
  {
    id: "shop-49",
    name: "Laptop Stand",
    category: "Accessories",
    price: 59,
    rating: 4.5,
    reviewCount: 47,
    imageAlt: "Laptop Stand",
    image: assets.shopboard1,
    colors: [
      { name: "Silver", hex: "#E3E4E5" },
      { name: "Space Gray", hex: "#57595B" },
    ],
    description:
      "This ergonomic aluminum laptop stand raises your screen to eye level and improves airflow, helping reduce neck strain during long work sessions.",
  },
  {
    id: "shop-50",
    name: "Mechanical Gaming Keyboard",
    category: "Accessories",
    price: 129,
    rating: 4.7,
    reviewCount: 79,
    imageAlt: "Mechanical Gaming Keyboard",
    image: assets.shopboard,
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "White", hex: "#F5F5F5" },
    ],
    description:
      "This mechanical gaming keyboard features per-key RGB lighting, durable tactile switches, and a rapid response rate built for competitive gaming performance.",
  },

  // Smartwatches
  {
    id: "shop-51",
    name: "Apple Watch Series 10",
    category: "Smartwatches",
    price: 429,
    rating: 4.8,
    reviewCount: 93,
    imageAlt: "Apple Watch Series 10",
    image: assets.shopwatch,
    colors: [
      { name: "Jet Black", hex: "#1A1A1A" },
      { name: "Rose Gold", hex: "#D9B8A8" },
      { name: "Silver", hex: "#E3E4E5" },
    ],
    description:
      "Apple Watch Series 10 features a larger, thinner design with an even brighter display, advanced health tracking, and faster charging for your everyday routine.",
  },
  {
    id: "shop-52",
    name: "Apple Watch Ultra 2",
    category: "Smartwatches",
    price: 799,
    rating: 4.8,
    reviewCount: 72,
    imageAlt: "Apple Watch Ultra 2",
    image: assets.shopwatch1,
    colors: [
      { name: "Natural Titanium", hex: "#E3E0D8" },
      { name: "Black Titanium", hex: "#3C3C3E" },
    ],
    description:
      "Apple Watch Ultra 2 is built for extreme adventures, featuring a rugged titanium case, the brightest Apple display ever, and precision dual-frequency GPS.",
  },
  {
    id: "shop-53",
    name: "Samsung Galaxy Watch 7",
    category: "Smartwatches",
    price: 329,
    rating: 4.6,
    reviewCount: 68,
    imageAlt: "Samsung Galaxy Watch 7",
    image: assets.shopwatch2,
    colors: [
      { name: "Graphite", hex: "#3C3C3C" },
      { name: "Cream", hex: "#EDE6D6" },
      { name: "Green", hex: "#7C9B7E" },
    ],
    description:
      "Samsung Galaxy Watch 7 delivers advanced sleep and fitness tracking, a vivid Super AMOLED display, and seamless integration with the Galaxy ecosystem.",
  },
  {
    id: "shop-54",
    name: "Samsung Galaxy Watch 6",
    category: "Smartwatches",
    price: 249,
    rating: 4.5,
    reviewCount: 59,
    imageAlt: "Samsung Galaxy Watch 6",
    image: assets.shopwatch3,
    colors: [
      { name: "Graphite", hex: "#3C3C3C" },
      { name: "Gold", hex: "#E8DCC0" },
      { name: "Silver", hex: "#E3E4E5" },
    ],
    description:
      "Samsung Galaxy Watch 6 offers comprehensive health tracking, a sleek rotating bezel design, and reliable all-day battery life for an active lifestyle.",
  },
  {
    id: "shop-55",
    name: "Google Pixel Watch 2",
    category: "Smartwatches",
    price: 299,
    rating: 4.5,
    reviewCount: 61,
    imageAlt: "Google Pixel Watch 2",
    image: assets.shopwatch4,
    colors: [
      { name: "Matte Black", hex: "#1A1A1A" },
      { name: "Polished Silver", hex: "#E3E4E5" },
      { name: "Champagne Gold", hex: "#E8DCC0" },
    ],
    description:
      "Google Pixel Watch 2 combines Fitbit's advanced health features with a beautifully domed design and deep Google app integration for a smarter wrist companion.",
  },
  {
    id: "shop-56",
    name: "Garmin Venu 3",
    category: "Smartwatches",
    price: 449,
    rating: 4.7,
    reviewCount: 48,
    imageAlt: "Garmin Venu 3",
    image: assets.shopwatch2,
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Ivory", hex: "#F0EDE6" },
      { name: "Slate", hex: "#57595B" },
    ],
    description:
      "Garmin Venu 3 offers comprehensive fitness and wellness tracking, built-in workouts, and up to 14 days of battery life for serious athletes and everyday users alike.",
  },
  {
    id: "shop-57",
    name: "Fitbit Sense 2",
    category: "Smartwatches",
    price: 249,
    rating: 4.4,
    reviewCount: 57,
    imageAlt: "Fitbit Sense 2",
    image: assets.shopwatch1,
    colors: [
      { name: "Graphite", hex: "#3C3C3C" },
      { name: "Platinum", hex: "#C7CACB" },
      { name: "Lunar White", hex: "#F0EDE6" },
    ],
    description:
      "Fitbit Sense 2 tracks stress, heart health, and sleep around the clock, offering actionable insights to help you build healthier daily habits.",
  },
  {
    id: "shop-58",
    name: "Amazfit GTR 4",
    category: "Smartwatches",
    price: 199,
    rating: 4.5,
    reviewCount: 43,
    imageAlt: "Amazfit GTR 4",
    image: assets.shopwatch,
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Silver", hex: "#E3E4E5" },
    ],
    description:
      "Amazfit GTR 4 delivers robust fitness tracking, a bright AMOLED display, and up to 14 days of battery life, offering excellent smartwatch value.",
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