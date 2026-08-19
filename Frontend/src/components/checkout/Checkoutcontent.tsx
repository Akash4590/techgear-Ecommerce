import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Pencil,
  CheckCircle2,
  Truck,
  Rocket,
  CreditCard,
  Lock,
  ShieldCheck,
  RotateCcw,
  Award,
} from "lucide-react";
import { useShop } from "../../context/ShopContext";

type DeliveryMethod = "standard" | "express";
type PaymentMethod = "card" | "paypal" | "applepay" | "googlepay";

const stateOptionsByCountry: Record<string, string[]> = {
  "United States": [
    "California",
    "New York",
    "Texas",
    "Florida",
    "Illinois",
    "Washington",
  ],
  Canada: ["Ontario", "Quebec", "British Columbia", "Alberta", "Manitoba"],
  "United Kingdom": ["England", "Scotland", "Wales", "Northern Ireland"],
  Pakistan: [
    "Punjab",
    "Sindh",
    "Khyber Pakhtunkhwa",
    "Balochistan",
    "Islamabad Capital Territory",
    "Gilgit-Baltistan",
  ],
};

const CheckoutContent = () => {
  const { cartItems, clearCart, addOrder } = useShop();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");

  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("standard");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

  const availableStates = country ? stateOptionsByCountry[country] ?? [] : [];

  const handleCountryChange = (value: string) => {
    setCountry(value);
    setState("");
  };

  const paymentMethodLabels: Record<PaymentMethod, string> = {
    card: "Credit / Debit Card",
    paypal: "PayPal",
    applepay: "Apple Pay",
    googlepay: "Google Pay",
  };

  const handlePlaceOrder = () => {
    if (
      !email ||
      !firstName ||
      !lastName ||
      !address ||
      !city ||
      !state ||
      !zip ||
      !country
    ) {
      alert("Please fill in all required fields before placing your order.");
      return;
    }

    const orderId = `TG-${new Date().getFullYear()}-${Math.floor(
      10000 + Math.random() * 90000
    )}`;

    const orderDate = new Date().toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

    const orderData = {
      orderId,
      orderDate,
      paymentMethod: paymentMethodLabels[paymentMethod],
      deliveryMethod,
      shipping: {
        firstName,
        lastName,
        address,
        apartment,
        city,
        state,
        zip,
        country,
        phone,
        email,
      },
      items: cartItems,
      subtotal,
      discount: appliedDiscount,
      shippingCost,
      total,
    };

    addOrder(orderData);
    navigate("/ordersuccess", { state: orderData });
    clearCart();
  };

  const discount = 50;
  const expressShippingCost = 12.99;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const appliedDiscount = subtotal > 0 ? Math.min(discount, subtotal) : 0;
  const shippingCost = deliveryMethod === "express" ? expressShippingCost : 0;
  const total = subtotal - appliedDiscount + shippingCost;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        {/* Contact Information */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#4F46E5] text-xs font-semibold text-white">
                1
              </span>
              <h2 className="text-base font-bold text-[#0B0B14]">
                Contact Information
              </h2>
            </div>
            <button
              type="button"
              className="flex items-center gap-1.5 text-sm font-medium text-[#4F46E5] hover:text-[#4338CA] cursor-pointer"
            >
              <Pencil size={14} />
              Edit
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john.doe@example.com"
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 pr-10 text-sm text-[#0B0B14] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
                />
                <CheckCircle2
                  size={18}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 pr-10 text-sm text-[#0B0B14] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
                />
                <CheckCircle2
                  size={18}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#4F46E5] text-xs font-semibold text-white">
                2
              </span>
              <h2 className="text-base font-bold text-[#0B0B14]">
                Shipping Address
              </h2>
            </div>
            <button
              type="button"
              className="flex items-center gap-1.5 text-sm font-medium text-[#4F46E5] hover:text-[#4338CA] cursor-pointer"
            >
              <Pencil size={14} />
              Edit
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-[#0B0B14] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1.5">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-[#0B0B14] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1.5">
                Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Tech Street"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-[#0B0B14] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1.5">
                Apartment, suite, etc. (optional)
              </label>
              <input
                type="text"
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
                placeholder="Apt 4B"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-[#0B0B14] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1.5">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="San Francisco"
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-[#0B0B14] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">
                  State / Province
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  disabled={!country}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-[#0B0B14] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 disabled:bg-gray-50 disabled:text-gray-400 cursor-pointer"
                >
                  <option value="" disabled>
                    {country ? "Select State" : "Select Country first"}
                  </option>
                  {availableStates.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1.5">
                  ZIP / Postal Code
                </label>
                <input
                  type="text"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  placeholder="94107"
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-[#0B0B14] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1.5">
                Country
              </label>
              <select
                value={country}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-[#0B0B14] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 cursor-pointer"
              >
                <option value="" disabled>
                  Select Country
                </option>
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
                <option>Pakistan</option>
              </select>
            </div>
          </div>
        </div>

        {/* Delivery Method */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#4F46E5] text-xs font-semibold text-white">
                3
              </span>
              <h2 className="text-base font-bold text-[#0B0B14]">
                Delivery Method
              </h2>
            </div>
            <button type="button"
    className="flex items-center gap-1.5 text-sm font-medium text-[#4F46E5] hover:text-[#4338CA] cursor-pointer">
              <Pencil size={14} />
              Edit
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setDeliveryMethod("standard")}
              className={`cursor-pointer flex items-start gap-3 rounded-lg border p-4 text-left transition-colors ${
                deliveryMethod === "standard"
                  ? "border-[#4F46E5] ring-1 ring-[#4F46E5]"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <span
                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                  deliveryMethod === "standard"
                    ? "border-[#4F46E5]"
                    : "border-gray-300"
                }`}
              >
                {deliveryMethod === "standard" && (
                  <span className="h-2 w-2 rounded-full bg-[#4F46E5]" />
                )}
              </span>

              <Truck size={18} className="text-gray-500 mt-0.5" />

              <div>
                <p className="text-sm font-semibold text-[#0B0B14]">
                  Standard Shipping
                </p>
                <p className="text-sm font-medium text-green-600">Free</p>
                <p className="text-xs text-gray-400">
                  Delivery in 5-7 business days
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setDeliveryMethod("express")}
              className={` cursor-pointer flex items-start gap-3 rounded-lg border p-4 text-left transition-colors ${
                deliveryMethod === "express"
                  ? "border-[#4F46E5] ring-1 ring-[#4F46E5]"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <span
                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                  deliveryMethod === "express"
                    ? "border-[#4F46E5]"
                    : "border-gray-300"
                }`}
              >
                {deliveryMethod === "express" && (
                  <span className="h-2 w-2 rounded-full bg-[#4F46E5]" />
                )}
              </span>

               <Truck size={18} className="text-gray-500 mt-0.5" />

              <div>
                <p className="text-sm font-semibold text-[#0B0B14]">
                  Express Shipping
                </p>
                <p className="text-sm font-medium text-[#0B0B14]">
                  ${expressShippingCost.toFixed(2)}
                </p>
                <p className="text-xs text-gray-400">
                  Delivery in 2-3 business days
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Payment Method */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-3 mb-5 cursor-pointer">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#4F46E5] text-xs font-semibold text-white">
              4
            </span>
            <h2 className="text-base font-bold text-[#0B0B14]">
              Payment Method
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <button
              type="button"
              onClick={() => setPaymentMethod("card")}
              className={`col-span-2 flex flex-col gap-2 rounded-lg border p-4 text-left transition-colors ${
                paymentMethod === "card"
                  ? "border-[#4F46E5] ring-1 ring-[#4F46E5]"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2 cursor-pointer">
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                    paymentMethod === "card"
                      ? "border-[#4F46E5]"
                      : "border-gray-300"
                  }`}
                >
                  {paymentMethod === "card" && (
                    <span className="h-2 w-2 rounded-full bg-[#4F46E5]" />
                  )}
                </span>
                <CreditCard size={18} className="text-gray-500" />
                <span className="text-sm font-semibold text-[#0B0B14]">
                  Credit / Debit Card
                </span>
              </div>
              <div className="flex items-center gap-2 pl-6 cursor-pointer">
                <div className="rounded border border-gray-200 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                  VISA
                </div>
                <div className="rounded border border-gray-200 px-2 py-0.5">
                  <div className="flex -space-x-1">
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-500" />
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-orange-400" />
                  </div>
                </div>
                <div className="rounded border border-gray-200 px-2 py-0.5 text-[10px] font-bold text-blue-900">
                  AMEX
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("paypal")}
              className={`flex items-center gap-2 rounded-lg border p-4 transition-colors ${
                paymentMethod === "paypal"
                  ? "border-[#4F46E5] ring-1 ring-[#4F46E5]"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
        <span className={`flex h-4 w-4 shrink-0 items-center justify-center cursor pointer rounded-full border-2 ${
                  paymentMethod === "paypal"
                    ? "border-[#4F46E5]"
                    : "border-gray-300"
                }`}>
                {paymentMethod === "paypal" && (
                  <span className="h-2 w-2 rounded-full bg-[#4F46E5]" />
                )}
              </span>
              <span className="text-sm font-semibold text-blue-800 cursor-pointer">
                PayPal
              </span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("applepay")}
              className={`flex items-center gap-2 rounded-lg border p-4  transition-colors ${
                paymentMethod === "applepay"
                  ? "border-[#4F46E5] ring-1 ring-[#4F46E5]"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                  paymentMethod === "applepay"
                    ? "border-[#4F46E5]"
                    : "border-gray-300"
                }`}
              >
                {paymentMethod === "applepay" && (
                  <span className="h-2 w-2 rounded-full bg-[#4F46E5]" />
                )}
              </span>
              <span className="text-sm font-semibold text-[#0B0B14] cursor-pointer">
                 Google Pay
              </span>
            </button>
          </div>

          <p className="mt-4 flex items-center gap-1.5 text-xs text-gray-400">
            <Lock size={12} />
            All transactions are secure and encrypted.
          </p>

          <button
            type="button"
            onClick={handlePlaceOrder}
            className="mt-5 flex w-full items-center justify-between rounded-lg bg-[#4F46E5] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#4338CA] cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Lock size={16} />
              Place Order
            </span>
            <span>${total.toFixed(2)}</span>
          </button>
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-[#0B0B14]">
              Order Summary
            </h2>
          </div>

          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">
              {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"} in Cart
            </p>
            <button
              type="button"
            className="text-sm font-medium text-[#4F46E5] hover:text-[#4338CA] cursor-pointer">
              Edit Cart
            </button>
          </div>

          <div className="space-y-4 mb-5">
            {cartItems.map(({ product, quantity }) => (
              <div key={product.id} className="flex items-start gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    className="h-full w-full object-contain p-1.5"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-semibold text-[#0B0B14]">
                    {product.name}
                  </p>
                  {product.colors && product.colors.length > 0 && (
                    <p className="text-xs text-gray-400">
                      {product.colors[0].name}
                    </p>
                  )}
                  <p className="text-xs text-gray-400">Qty: {quantity}</p>
                </div>

                <p className="text-sm font-semibold text-[#0B0B14]">
                  ${(product.price * quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-3 text-sm border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">
                Subtotal ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
              </span>
              <span className="font-medium text-[#0B0B14]">
                ${subtotal.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500">Shipping</span>
              <span
                className={`font-medium ${
                  shippingCost === 0 ? "text-green-600" : "text-[#0B0B14]"
                }`}
              >
                {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500">Discount</span>
              <span className="font-medium text-green-600">
                -${appliedDiscount.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="mt-4 border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#0B0B14]">Total</span>
              <span className="text-xl font-bold text-[#0B0B14]">
                ${total.toFixed(2)}
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-400">
              Taxes calculated at checkout
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-[#4F46E5]">
              <ShieldCheck size={16} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0B0B14]">
                Secure Checkout
              </p>
              <p className="text-xs text-gray-400">100% secure payment</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-[#4F46E5]">
              <RotateCcw size={16} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0B0B14]">
                30-Day Returns
              </p>
              <p className="text-xs text-gray-400">Hassle-free returns</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-[#4F46E5]">
              <Award size={16} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0B0B14]">
                1 Year Warranty
              </p>
              <p className="text-xs text-gray-400">Official warranty</p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm font-semibold text-[#0B0B14] mb-3">
            We Accept
          </p>
          <div className="flex items-center gap-2">
            <div className="rounded border border-gray-200 px-2.5 py-1.5 text-xs font-bold text-blue-700">
              VISA
            </div>
            <div className="rounded border border-gray-200 px-2.5 py-1.5">
              <div className="flex -space-x-1">
                <span className="inline-block h-3 w-3 rounded-full bg-red-500" />
                <span className="inline-block h-3 w-3 rounded-full bg-orange-400" />
              </div>
            </div>
            <div className="rounded border border-gray-200 px-2.5 py-1.5 text-xs font-bold text-blue-800">
              PayPal
            </div>
            <div className="rounded border border-gray-200 px-2.5 py-1.5 text-xs font-bold text-[#0B0B14]">
               Pay
            </div>
            <div className="rounded border border-gray-200 px-2.5 py-1.5 text-xs font-bold text-[#0B0B14]">
              G Pay
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutContent;