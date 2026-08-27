import { Minus, Plus, Trash2, ArrowLeft, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../../context/ShopContext";

const CART_WIDE_DISCOUNT_PERCENT = 10; // Store-wide extra discount %

const CartContent = () => {
  const { cartItems, updateCartQuantity, removeFromCart } = useShop();
  const navigate = useNavigate();

  // Har product ki effective price nikalta hai — agar deal hai to discounted price, warna normal price
  const getEffectivePrice = (product: (typeof cartItems)[0]["product"]) => {
    if (product.isDeal && product.discountPercent) {
      return product.price - (product.price * product.discountPercent) / 100;
    }
    return product.price;
  };

  // Subtotal — sab items ki effective (already-deal-adjusted) price ka total
  const subtotal = cartItems.reduce(
    (sum, item) => sum + getEffectivePrice(item.product) * item.quantity,
    0
  );

  // Cart-wide extra discount sirf un items par jo pehle se deal mein NAHI hain
  const nonDealSubtotal = cartItems.reduce((sum, item) => {
    if (item.product.isDeal) return sum; // deal wale items ko skip karo
    return sum + item.product.price * item.quantity;
  }, 0);

  const appliedDiscount =
    nonDealSubtotal > 0 ? (nonDealSubtotal * CART_WIDE_DISCOUNT_PERCENT) / 100 : 0;

  const total = subtotal - appliedDiscount;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="hidden md:grid md:grid-cols-[minmax(260px,1fr)_100px_140px_100px_60px] items-center border-b border-gray-200 bg-gray-50 px-6 py-4 text-sm text-gray-500">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
            <span>Action</span>
          </div>
          {cartItems.length > 0 ? (
            cartItems.map(({ product, quantity }, index) => (
              <div
                key={product._id}
                className={`border-b border-gray-100 last:border-b-0 md:grid md:grid-cols-[minmax(260px,1fr)_100px_140px_100px_60px] md:items-center md:px-6 md:py-5 ${
                  index !== cartItems.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <div className="flex flex-col gap-4 px-4 py-5 md:contents md:px-0 md:py-0">
                  <div className="flex min-w-0 items-start justify-between gap-3 md:items-center md:justify-start md:gap-4">
                    <div className="flex min-w-0 items-center gap-3 md:gap-4">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-50 md:h-20 md:w-20">
                        <img
                          src={product.image}
                          alt={product.imageAlt}
                          className="h-full w-full object-contain p-2"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="break-words font-semibold text-[#0B0B14] md:truncate">
                          {product.name}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.category}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-col items-end gap-1 md:hidden">
                      <span className="text-xs text-gray-400">Action</span>
                      <button
                        type="button"
                        onClick={() => removeFromCart(product._id)}
                        aria-label={`Remove ${product.name}`}
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-red-500 transition-colors hover:border-red-200 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 text-sm md:contents">
                    <span className="shrink-0 text-gray-400 md:hidden">Price</span>
                    <div className="text-right text-sm font-medium text-[#0B0B14] md:text-left">
                      {product.isDeal && product.discountPercent ? (
                        <div className="flex flex-col">
                          <span className="font-semibold text-red-500">
                            ${getEffectivePrice(product).toFixed(2)}
                          </span>
                          <span className="text-xs text-gray-400 line-through">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span>${product.price.toLocaleString()}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 text-sm md:contents">
                    <span className="shrink-0 text-gray-400 md:hidden">Quantity</span>
                    <div className="flex w-fit items-center overflow-hidden rounded-lg border border-gray-200">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(product._id, -1)}
                        className="flex h-10 w-10 items-center justify-center text-gray-500 transition-colors hover:bg-gray-50 hover:text-[#4F46E5] md:h-9 md:w-9"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="flex h-10 w-10 items-center justify-center text-sm font-medium text-gray-700 md:h-9 md:w-9">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(product._id, 1)}
                        className="flex h-10 w-10 items-center justify-center text-gray-500 transition-colors hover:bg-gray-50 hover:text-[#4F46E5] md:h-9 md:w-9"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 text-sm md:block">
                    <span className="shrink-0 text-gray-400 md:hidden">Total</span>
                    <div className="text-right font-semibold text-[#0B0B14] md:text-left">
                      ${(getEffectivePrice(product) * quantity).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                  </div>

                  <div className="hidden md:block">
                    <button
                      type="button"
                      onClick={() => removeFromCart(product._id)}
                      aria-label={`Remove ${product.name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-red-500 transition-colors hover:border-red-200 hover:bg-red-50 cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50">
                <ShoppingCartIcon />
              </div>
              <h3 className="text-lg font-semibold text-[#0B0B14]">
                Your cart is empty
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                You haven't added anything to your cart yet.
              </p>

              <button
                type="button"
                onClick={() => navigate("/shop")}
                className="mt-4 rounded-lg bg-[#4F46E5] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#4338CA]"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="mt-6 flex items-center gap-2 rounded-lg border border-indigo-200 px-5 py-2.5 text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-50 cursor-pointer"
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </button>
        )}
      </div>

      <div className="lg:col-span-1">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-5 text-lg font-bold text-[#0B0B14]">
            Order Summary
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">
                Subtotal ({cartItems.length}{" "}
                {cartItems.length === 1 ? "item" : "items"})
              </span>
              <span className="font-medium text-[#0B0B14]">
                ${subtotal.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Shipping</span>
              <span className="font-medium text-green-600">Free</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">
                Extra Discount ({CART_WIDE_DISCOUNT_PERCENT}% off non-deal items)
              </span>
              <span className="font-medium text-green-600">
                -${appliedDiscount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
          <div className="mt-4 border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#0B0B14]">Total</span>
              <span className="text-xl font-bold text-[#0B0B14]">
                ${total.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-400">
              Taxes calculated at checkout
            </p>
          </div>
          <button
            type="button"
            disabled={cartItems.length === 0}
            onClick={() => navigate("/checkout")}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#4F46E5] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#4338CA] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer">
            <Lock size={16} />
            Proceed to Checkout
          </button>

          <p className="mt-5 text-xs text-gray-400">We Accept</p>
          <div className="mt-2 flex items-center justify-between gap-2">
            <div className="rounded border border-gray-200 px-2 py-1 text-xs font-bold text-blue-700">
              VISA
            </div>

            <div className="rounded border border-gray-200 px-2 py-1">
              <div className="flex -space-x-1">
                <span className="inline-block h-3 w-3 rounded-full bg-red-500" />
                <span className="inline-block h-3 w-3 rounded-full bg-orange-400" />
              </div>
            </div>

            <div className="rounded border border-gray-200 px-2 py-1 text-xs font-bold text-blue-800">
              PayPal
            </div>

            <div className="rounded border border-gray-200 px-2 py-1 text-xs font-bold text-gray-900">
              Google Pay
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShoppingCartIcon = () => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#4F46E5"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="20" r="1" />
      <circle cx="19" cy="20" r="1" />
      <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 2-1.6L21 8H6" />
    </svg>
  );
};

export default CartContent;