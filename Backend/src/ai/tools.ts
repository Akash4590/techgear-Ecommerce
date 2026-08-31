
import Product from "../models/product.js";
import Order from "../models/Order.js";


export const searchProducts = async (query: string) => {
  // Remove common words that are not useful for product searching
  const stopWords = [
    "is",
    "are",
    "the",
    "a",
    "an",
    "do",
    "does",
    "you",
    "have",
    "has",
    "your",
    "available",
    "availability",
    "stock",
    "in",
    "on",
    "at",
    "for",
    "me",
    "please",
    "tell",
    "show",
    "give",
    "what",
    "how",
    "much",
    "price",
    "cost",
    "can",
    "i",
    "buy",
    "want",
    "to",
    "check",
    "currently",
  ];

  // Extract useful words from the user's message
  const words = query
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/gi, " ")
    .split(/\s+/)
    .filter((word) => word.length > 1 && !stopWords.includes(word));

  // If no useful search terms remain
  if (words.length === 0) {
    return [];
  }

  // Escape regex special characters
  const escapedWords = words.map((word) =>
    word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );

  // Search products using individual useful words
  const searchRegex = escapedWords.join("|");

  const products = await Product.find({
    $or: [
      {
        name: {
          $regex: searchRegex,
          $options: "i",
        },
      },
      {
        category: {
          $regex: searchRegex,
          $options: "i",
        },
      },
    ],
  })
    .limit(5)
    .select(
      "name price category rating stockQuantity isDeal discountPercent"
    );

  return products.map((p) => ({
    name: p.name,
    price: p.price,
    category: p.category,
    rating: p.rating,
    inStock: p.stockQuantity > 0,
    stockQuantity: p.stockQuantity,
    isDeal: p.isDeal,
    discountPercent: p.discountPercent,
  }));
};

// ---------------------------------------------------------
// Tool 2: Order Status
// ---------------------------------------------------------

export const getOrderStatus = async (
  orderIdFragment: string,
  userId: string
) => {
  // Only search orders belonging to the logged-in user
  const orders = await Order.find({
    user: userId,
  }).sort({
    createdAt: -1,
  });

  // Match the last part of the MongoDB ObjectId
  const matchedOrder = orders.find((o) =>
    o._id
      .toString()
      .toUpperCase()
      .endsWith(orderIdFragment.toUpperCase())
  );

  if (!matchedOrder) {
    return {
      found: false,
    };
  }

  return {
    found: true,
    orderId: `#${matchedOrder._id
      .toString()
      .slice(-8)
      .toUpperCase()}`,
    status: matchedOrder.status,
    totalAmount: matchedOrder.totalAmount,
    itemCount: matchedOrder.items.length,
    paymentMethod: matchedOrder.paymentMethod,
    orderedOn: matchedOrder.createdAt,
  };
};

// ---------------------------------------------------------
// Tool 3: Recent Orders
// ---------------------------------------------------------

export const getRecentOrders = async (userId: string) => {
  const orders = await Order.find({
    user: userId,
  })
    .sort({
      createdAt: -1,
    })
    .limit(3);

  return orders.map((o) => ({
    orderId: `#${o._id.toString().slice(-8).toUpperCase()}`,
    status: o.status,
    totalAmount: o.totalAmount,
    orderedOn: o.createdAt,
  }));
};
