import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Product } from "../types/product";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  email: string;
}

export interface Order {
  orderId: string;
  orderDate: string;
  paymentMethod: string;
  deliveryMethod: "standard" | "express";
  shipping: ShippingInfo;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
}

interface ShopContextType {
  cartItems: CartItem[];
  wishlistItems: Product[];
  orders: Order[];

  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;

  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;

  isInWishlist: (productId: string) => boolean;
  isInCart: (productId: string) => boolean;

  addOrder: (order: Order) => void;

  cartCount: number;
  wishlistCount: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const CART_STORAGE_KEY = "techgear_cart";
const WISHLIST_STORAGE_KEY = "techgear_wishlist";
const ORDERS_STORAGE_KEY = "techgear_orders";

const loadFromStorage = <T,>(key: string, fallback: T): T => {
  try {
    const stored = localStorage.getItem(key);

    return stored ? (JSON.parse(stored) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const ShopProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() =>
    loadFromStorage<CartItem[]>(CART_STORAGE_KEY, [])
  );

  const [wishlistItems, setWishlistItems] = useState<Product[]>(() =>
    loadFromStorage<Product[]>(WISHLIST_STORAGE_KEY, [])
  );

  const [orders, setOrders] = useState<Order[]>(() =>
    loadFromStorage<Order[]>(ORDERS_STORAGE_KEY, [])
  );

  // =========================
  // SAVE CART
  // =========================

  useEffect(() => {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  // =========================
  // SAVE WISHLIST
  // =========================

  useEffect(() => {
    localStorage.setItem(
      WISHLIST_STORAGE_KEY,
      JSON.stringify(wishlistItems)
    );
  }, [wishlistItems]);

  // =========================
  // SAVE ORDERS
  // =========================

  useEffect(() => {
    localStorage.setItem(
      ORDERS_STORAGE_KEY,
      JSON.stringify(orders)
    );
  }, [orders]);

  // =========================
  // ADD TO CART
  // =========================

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.product._id === product._id
      );

      if (existing) {
        return prev.map((item) =>
          item.product._id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          product,
          quantity: 1,
        },
      ];
    });
  };

  // =========================
  // REMOVE FROM CART
  // =========================

  const removeFromCart = (productId: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => item.product._id !== productId
      )
    );
  };

  // =========================
  // UPDATE CART QUANTITY
  // =========================

  const updateCartQuantity = (
    productId: string,
    delta: number
  ) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product._id === productId
          ? {
              ...item,
              quantity: Math.max(
                1,
                item.quantity + delta
              ),
            }
          : item
      )
    );
  };

  // =========================
  // CLEAR CART
  // =========================

  const clearCart = () => {
    setCartItems([]);
  };

  // =========================
  // ADD TO WISHLIST
  // =========================

  const addToWishlist = (product: Product) => {
    setWishlistItems((prev) => {
      const exists = prev.find(
        (item) => item._id === product._id
      );

      if (exists) {
        return prev;
      }

      return [...prev, product];
    });
  };

  // =========================
  // REMOVE FROM WISHLIST
  // =========================

  const removeFromWishlist = (productId: string) => {
    setWishlistItems((prev) =>
      prev.filter(
        (item) => item._id !== productId
      )
    );
  };

  // =========================
  // CHECK WISHLIST
  // =========================

  const isInWishlist = (productId: string) =>
    wishlistItems.some(
      (item) => item._id === productId
    );

  // =========================
  // CHECK CART
  // =========================

  const isInCart = (productId: string) =>
    cartItems.some(
      (item) => item.product._id === productId
    );

  // =========================
  // ADD ORDER
  // =========================

  const addOrder = (order: Order) => {
    setOrders((prev) => [
      order,
      ...prev,
    ]);
  };

  // =========================
  // CART COUNT
  // =========================

  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // =========================
  // PROVIDER
  // =========================

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        wishlistItems,
        orders,

        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,

        addToWishlist,
        removeFromWishlist,

        isInWishlist,
        isInCart,

        addOrder,

        cartCount,
        wishlistCount: wishlistItems.length,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

// =========================
// USE SHOP HOOK
// =========================

export const useShop = () => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error(
      "useShop must be used within a ShopProvider"
    );
  }

  return context;
};