import { useNavigate, useLocation, Navigate } from "react-router-dom";
import {
  Check,
  Package,
  Calendar,
  CreditCard,
  Wallet,
  ShieldCheck,
  Truck,
  MapPin,
  Headphones,
  ShoppingBag,
} from "lucide-react";
import { assets } from "../../assets/assets";
import type { CartItem } from "../../context/ShopContext";

interface ShippingInfo {
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

interface OrderData {
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

const OrderSuccessContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state as OrderData | null;

  if (!orderData) {
    return <Navigate to="/" replace />;
  }

  const {
    orderId,
    orderDate,
    paymentMethod,
    shipping,
    items,
    subtotal,
    discount,
    shippingCost,
    total,
  } = orderData;

  const estimatedStart = new Date();
  estimatedStart.setDate(estimatedStart.getDate() + 4);
  const estimatedEnd = new Date();
  estimatedEnd.setDate(estimatedEnd.getDate() + 8);
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const deliverySteps = [
    { label: "Order Confirmed", date: orderDate, done: true },
    { label: "Processing", date: orderDate, done: true },
    {
      label: "Shipped",
      date: `Expected ${dateFormatter.format(estimatedStart)}`,
      done: false,
    },
    {
      label: "Delivered",
      date: `Expected ${dateFormatter.format(estimatedEnd)}`,
      done: false,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left: Success message + illustration */}
        <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
            <div>
              <div className="relative mb-6 h-20 w-20">
                <span className="absolute -left-3 top-1 h-2 w-2 rounded-full bg-orange-400" />
                <span className="absolute -left-1 top-10 h-1.5 w-1.5 rounded-full bg-green-400" />
                <span className="absolute left-8 -top-3 h-2 w-2 rotate-45 bg-[#4F46E5]" />
                <span className="absolute right-0 top-2 h-1.5 w-1.5 rounded-full bg-blue-400" />
                <span className="absolute right-2 top-12 h-1 w-1 rounded-full bg-yellow-400" />
                <span className="absolute right-10 -top-2 h-1 w-1 rounded-full bg-purple-400" />
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
                  <Check size={32} className="text-white" strokeWidth={3} />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-[#0B0B14] mb-2">
                Order Placed Successfully!
              </h1>
              <p className="text-sm text-gray-500 mb-6">
                Thank you for shopping with TechGear.
                <br />
                We've received your order and it's now being processed.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/shop")}
                  className="flex items-center gap-2 rounded-lg bg-[#4F46E5] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#4338CA] transition-colors cursor-pointer"
                >
                  <ShoppingBag size={16} /> Continue Shopping
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/order")}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:border-gray-300 transition-colors cursor-pointer"
                >
                  <Package size={16} />
                  View My Orders
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <img
                src={assets.ordersucces}
                alt="Order success illustration"
                className="w-full max-w-[280px]"
              />
            </div>
          </div>
        </div>

        {/* Right: Order Details */}
        <div className="lg:col-span-1 space-y-4">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-bold text-[#0B0B14] mb-4">
              Order Details
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-[#4F46E5]">
                  <Package size={15} />
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-gray-500">Order ID</span>
                  <span className="font-semibold text-[#4F46E5]">
                    {orderId}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-[#4F46E5]">
                  <Calendar size={15} />
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-gray-500">Order Date</span>
                  <span className="font-medium text-[#0B0B14]">
                    {orderDate}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-[#4F46E5]">
                  <CreditCard size={15} />
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-gray-500">Payment Method</span>
                  <span className="font-medium text-[#0B0B14]">
                    {paymentMethod}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-[#4F46E5]">
                  <Wallet size={15} />
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <span className="text-gray-500">Total Amount</span>
                  <span className="font-semibold text-green-600">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-lg bg-green-50 p-4">
              <ShieldCheck size={18} className="text-green-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-green-800">
                  Your order is confirmed
                </p>
                <p className="text-xs text-green-700 mt-0.5">
                  You will receive an email confirmation shortly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left: Delivery timeline + shipping + help */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-[#4F46E5]">
                <Truck size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#0B0B14]">
                    Estimated Delivery
                  </h3>
                  <span className="text-sm font-semibold text-green-600">
                    {dateFormatter.format(estimatedStart)} -{" "}
                    {dateFormatter.format(estimatedEnd)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  We'll notify you when your order is on the way.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              {deliverySteps.map((step, index) => (
                <div key={step.label} className="flex flex-1 items-start">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        step.done
                          ? "bg-green-500"
                          : "border-2 border-gray-200 bg-white"
                      }`}
                    >
                      {step.done && (
                        <Check size={16} className="text-white" strokeWidth={3} />
                      )}
                    </div>
                    <p className="mt-2 text-xs font-semibold text-[#0B0B14] text-center">
                      {step.label}
                    </p>
                    <p className="text-[11px] text-gray-400 text-center">
                      {step.date}
                    </p>
                  </div>

                  {index !== deliverySteps.length - 1 && (
                    <div
                      className={`mt-4 h-0.5 flex-1 border-t-2 border-dashed ${
                        step.done ? "border-green-400" : "border-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-[#4F46E5]">
                  <MapPin size={16} />
                </div>
                <h3 className="text-sm font-bold text-[#0B0B14] pt-1.5">
                  Shipping Address
                </h3>
              </div>
              <div className="pl-12 text-sm text-gray-500 space-y-0.5">
                <p>
                  {shipping.firstName} {shipping.lastName}
                </p>
                <p>
                  {shipping.address}
                  {shipping.apartment ? `, ${shipping.apartment}` : ""}
                </p>
                <p>
                  {shipping.city}, {shipping.state} {shipping.zip}
                </p>
                <p>{shipping.country}</p>
                {shipping.phone && <p>{shipping.phone}</p>}
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-[#4F46E5]">
                  <Headphones size={16} />
                </div>
                <h3 className="text-sm font-bold text-[#0B0B14] pt-1.5">
                  Need Help?
                </h3>
              </div>
              <p className="pl-12 text-sm text-gray-500 mb-4">
                If you have any questions, our support team is here to help.
              </p>
              <div className="pl-12">
                <button
                  type="button"
                  className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-[#4F46E5] hover:border-gray-300 transition-colors"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-[#0B0B14]">
                Order Summary
              </h2>
              <span className="text-sm font-medium text-[#4F46E5]">
                {items.length} {items.length === 1 ? "Item" : "Items"}
              </span>
            </div>

            <div className="space-y-4 mb-5">
              {items.map(({ product, quantity }) => (
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
                <span className="text-gray-500">Subtotal</span>
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
                  -${discount.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="mt-4 border-t border-gray-100 pt-4 flex items-center justify-between">
              <span className="font-bold text-[#0B0B14]">Total</span>
              <span className="text-xl font-bold text-[#0B0B14]">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessContent;