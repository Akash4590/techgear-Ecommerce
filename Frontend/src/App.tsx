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
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPassword from "./pages/ResetPassword";
import AccountPage from "./pages/AccountPage";
const App = () => {
  return (
    <Routes>

      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
     <Route path="/reset-password" element={<ResetPassword />}/>
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
      <Route path="/account" element={<AccountPage />} />
    </Routes>
  );
};

export default App;