import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  Calendar,
  CreditCard,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  MapPin,
} from "lucide-react";
import { useShop } from "../../context/ShopContext";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config/api";

const OrdersContent = () => {
  const { orders: localOrders } = useShop();
  const { authFetch } = useAuth();
  const navigate = useNavigate();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [orders, setOrders] = useState(localOrders);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await authFetch(`${API_BASE_URL}/orders/my-orders`);
        if (!response.ok) return;

        const result = await response.json();
        setOrders(
          (result.data ?? []).map((order: any) => ({
            orderId: `#${order._id.slice(-8).toUpperCase()}`,
            orderDate: new Date(order.createdAt).toLocaleString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
            }),
            paymentMethod: order.paymentMethod,
            deliveryMethod: "standard",
            shipping: {
              firstName: order.shippingAddress.fullName.split(" ")[0] ?? "",
              lastName: order.shippingAddress.fullName.split(" ").slice(1).join(" "),
              address: order.shippingAddress.address,
              apartment: "",
              city: order.shippingAddress.city,
              state: "",
              zip: order.shippingAddress.postalCode,
              country: "",
              phone: order.shippingAddress.phone,
              email: "",
            },
            items: order.items.map((item: any) => ({
              quantity: item.quantity,
              product: {
                _id: item.productId,
                name: item.name,
                image: item.image,
                imageAlt: item.name,
                price: item.price,
              },
            })),
            subtotal: order.totalAmount,
            discount: 0,
            shippingCost: 0,
            total: order.totalAmount,
            status: order.status,
          }))
        );
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchOrders();
  }, [authFetch]);

  const toggleExpand = (orderId: string) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  if (loading) {
    return <div className="py-20 text-center text-gray-500">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 px-6 py-20 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50">
          <Package size={28} className="text-[#4F46E5]" />
        </div>
        <h3 className="text-lg font-semibold text-[#0B0B14] ">
          No orders yet
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          You haven't placed any orders yet. Start shopping to see them here.
        </p>
        <button
          type="button"
          onClick={() => navigate("/shop")}
          className="mt-4 flex items-center gap-2 rounded-lg bg-[#4F46E5] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#4338CA] transition-colors cursor-pointer"
        >
          <ShoppingBag size={16} />
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {orders.map((order) => {
        const isExpanded = expandedOrderId === order.orderId;
        const totalItems = order.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );

        return (
          <div
            key={order.orderId}
            className="rounded-xl border border-gray-200 bg-white overflow-hidden">
            <div className="p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-3">
<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-[#4F46E5]">
                    <Package size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#4F46E5]">
                      {order.orderId}
                    </p>
                    <p className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                      <Calendar size={12} />
                      {order.orderDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs text-gray-400">
                      {totalItems} {totalItems === 1 ? "item" : "items"}
                    </p>
                    <p className="text-sm font-bold text-[#0B0B14]">
                      ${order.total.toFixed(2)}
                    </p>
                  </div>

<span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                    Processing
                  </span>

                  <button
                    type="button"
                    onClick={() => toggleExpand(order.orderId)}
                    className="flex items-center gap-1.5 text-sm font-medium text-[#4F46E5] hover:text-[#4338CA] cursor-pointer">
                    {isExpanded ? "Hide Details" : "View Details"}
                    {isExpanded ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                {order.items.slice(0, 4).map(({ product }) => (
                  <div
                    key={product.id}
                    className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-gray-50"
                  >
                    <img
                      src={product.image}
                      alt={product.imageAlt}
                      className="h-full w-full object-contain p-1"
                    />
                  </div>
                ))}
                {order.items.length > 4 && (
                  <span className="text-xs text-gray-400">
                    +{order.items.length - 4} more
                  </span>
                )}
              </div>
            </div>

            {isExpanded && (
              <div className="border-t border-gray-100 bg-gray-50 p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
                      Items
                    </p>
                    <div className="space-y-3">
                      {order.items.map(({ product, quantity }) => (
                        <div key={product.id} className="flex items-center gap-3">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white border border-gray-100">
                            <img
                              src={product.image}
                              alt={product.imageAlt}
                              className="h-full w-full object-contain p-1"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="truncate text-sm font-medium text-[#0B0B14]">
                              {product.name}
                            </p>
                            <p className="text-xs text-gray-400">
                              Qty: {quantity}
                            </p>
                          </div>
                          <p className="text-sm font-semibold text-[#0B0B14]">
                            ${(product.price * quantity).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2 flex items-center gap-1.5">
                        <MapPin size={12} />
                        Shipping Address
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.shipping.firstName} {order.shipping.lastName}
                        <br />
                        {order.shipping.address}
                        {order.shipping.apartment
                          ? `, ${order.shipping.apartment}`
                          : ""}
                        <br />
                        {order.shipping.city}, {order.shipping.state}{" "}
                        {order.shipping.zip}
                        <br />
                        {order.shipping.country}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2 flex items-center gap-1.5">
                        <CreditCard size={12} />
                        Payment
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.paymentMethod}
                      </p>
                    </div>

                    <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Subtotal</span>
                        <span className="text-[#0B0B14]">
                          ${order.subtotal.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Shipping</span>
                        <span className="text-[#0B0B14]">
                          {order.shippingCost === 0
                            ? "Free"
                            : `$${order.shippingCost.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Discount</span>
                        <span className="text-green-600">
                          -${order.discount.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-t border-gray-200 pt-2">
                        <span className="font-semibold text-[#0B0B14]">
                          Total
                        </span>
                        <span className="font-bold text-[#0B0B14]">
                          ${order.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default OrdersContent;