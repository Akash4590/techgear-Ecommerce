import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import "./index.css";
import App from "./App.tsx";
import { ShopProvider } from "./context/ShopContext";
import { AuthProvider } from "./context/AuthContext";
import { stripePromise } from "./config/stripe";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ShopProvider>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </ShopProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);