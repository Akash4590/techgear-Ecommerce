import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import WishlistPage from "./pages/WishlistPage";
import CartPage from "./pages/CartPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Checkout from "./pages/Checkout";
import OrderSuccessPage from "./pages/Ordersuccesspage";
import Orderspage from "./pages/Orderspage"
import DealsPage from "./pages/DealsPage";
import AboutPage from "./pages/About";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/ordersuccess" element={<OrderSuccessPage />} />
      <Route path="/order" element={<Orderspage />} />
      <Route path="/deals" element={<DealsPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
};

export default App;