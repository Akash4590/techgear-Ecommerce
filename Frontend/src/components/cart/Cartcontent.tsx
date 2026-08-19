import { Minus, Plus, Trash2, ArrowLeft, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useShop } from "../../context/ShopContext";

const CartContent = () => {
  const { cartItems, updateCartQuantity, removeFromCart } = useShop();
  const navigate = useNavigate();

  const discount = 50;
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const appliedDiscount = subtotal > 0 ? Math.min(discount, subtotal) : 0;
  const total = subtotal - appliedDiscount;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="grid grid-cols-[minmax(260px,1fr)_100px_140px_100px_60px] items-center border-b border-gray-200 bg-gray-50 px-6 py-4 text-sm text-gray-500">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
            <span>Action</span>
          </div>
          {cartItems.length > 0 ? (
            cartItems.map(({ product, quantity }, index) => (
              <div
                key={product.id}
                className={`grid grid-cols-[minmax(260px,1fr)_100px_140px_100px_60px] items-center px-6 py-5 ${
                  index !== cartItems.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-50">
                    <img
                      src={product.image}
                      alt={product.imageAlt}
                      className="h-full w-full object-contain p-2"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-[#0B0B14]">
                      {product.name}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.category}
                    </p>
                  </div>
                </div>

                <div className="text-sm font-medium text-[#0B0B14]">
                  ${product.price.toLocaleString()}
                </div>
                <div>
                  <div className="flex w-fit items-center overflow-hidden rounded-lg border border-gray-200">
                    <button
                      type="button"
                      onClick={() => updateCartQuantity(product.id, -1)}
                      className="flex h-9 w-9 items-center justify-center text-gray-500 transition-colors hover:bg-gray-50 hover:text-[#4F46E5]"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="flex h-9 w-9 items-center justify-center text-sm font-medium text-gray-700">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateCartQuantity(product.id, 1)}
                      className="flex h-9 w-9 items-center justify-center text-gray-500 transition-colors hover:bg-gray-50 hover:text-[#4F46E5]"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <div className="text-sm font-semibold text-[#0B0B14]">
                  ${(product.price * quantity).toLocaleString()}
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(product.id)}
                    aria-label={`Remove ${product.name}`}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-red-500 transition-colors hover:border-red-200 hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </button>
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
            className="mt-6 flex items-center gap-2 rounded-lg border border-indigo-200 px-5 py-2.5 text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-50"
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
                ${subtotal.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Shipping</span>
              <span className="font-medium text-green-600">Free</span>
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
                ${total.toLocaleString()}
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