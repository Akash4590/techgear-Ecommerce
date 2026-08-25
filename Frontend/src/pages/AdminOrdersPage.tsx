import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Package,
  ChevronDown,
  AlertCircle,
  Inbox,
  Clock,
  Loader2,
  Truck,
  CheckCircle2,
  XCircle,
  MapPin,
  CreditCard,
  User,
  RefreshCw,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/api";

interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface Order {
  _id: string;
  user: {
    name: string;
    email: string;
  } | null;
  items: OrderItem[];
  totalAmount: number;
  status:
    | "pending"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    phone: string;
  };
  paymentMethod: string;
  createdAt: string;
}

const statusConfig: Record<
  Order["status"],
  {
    badge: string;
    dot: string;
    icon: typeof Clock;
    label: string;
  }
> = {
  pending: {
    badge: "bg-orange-50 text-orange-700 border-orange-100",
    dot: "bg-orange-500",
    icon: Clock,
    label: "Pending",
  },
  processing: {
    badge: "bg-blue-50 text-blue-700 border-blue-100",
    dot: "bg-blue-500",
    icon: Loader2,
    label: "Processing",
  },
  shipped: {
    badge: "bg-indigo-50 text-[#4F46E5] border-indigo-100",
    dot: "bg-[#4F46E5]",
    icon: Truck,
    label: "Shipped",
  },
  delivered: {
    badge: "bg-green-50 text-green-700 border-green-100",
    dot: "bg-green-500",
    icon: CheckCircle2,
    label: "Delivered",
  },
  cancelled: {
    badge: "bg-red-50 text-red-700 border-red-100",
    dot: "bg-red-500",
    icon: XCircle,
    label: "Cancelled",
  },
};

const statusOptions: Order["status"][] = [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (dateStr: string) => {
  const date = new Date(dateStr);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
};

const ProductThumb = ({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) => {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-[#F8F9FC]">
        <Package size={14} className="text-gray-300" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="h-9 w-9 shrink-0 rounded-lg border border-gray-100 bg-[#F8F9FC] object-contain p-1"
    />
  );
};

const StatusBadge = ({
  status,
}: {
  status: Order["status"];
}) => {
  const cfg = statusConfig[status];
  const Icon = cfg.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold ${cfg.badge}`}
    >
      <Icon
        size={11}
        className={
          status === "processing" ? "animate-spin" : ""
        }
      />
      {cfg.label}
    </span>
  );
};

const AdminOrdersPage = () => {
  const { token, authFetch } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(
    null
  );
  const [updatingId, setUpdatingId] = useState<string | null>(
    null
  );

  const fetchOrders = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    setError("");

    try {
      const res = await authFetch(
        `${API_BASE_URL}/orders/admin/all`
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(
          data.message || "Failed to load orders"
        );
        return;
      }

      setOrders(
        Array.isArray(data.data) ? data.data : []
      );
    } catch (err) {
      if ((err as Error).message !== "Session expired") {
        setError(
          "Something went wrong while loading orders."
        );
      }
    } finally {
      setLoading(false);
    }
  }, [token, authFetch]);

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token, fetchOrders]);

  const handleStatusChange = async (
    orderId: string,
    newStatus: Order["status"]
  ) => {
    if (!token) return;

    const previousOrder = orders.find(
      (order) => order._id === orderId
    );

    setUpdatingId(orderId);
    setError("");

    try {
      const res = await authFetch(
        `${API_BASE_URL}/orders/admin/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(
          data.message ||
            "Failed to update order status."
        );
        return;
      }

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? {
                ...order,
                status: newStatus,
              }
            : order
        )
      );
    } catch (err) {
      if ((err as Error).message !== "Session expired") {
        setError(
          "Something went wrong while updating the order."
        );

        if (previousOrder) {
          setOrders((prev) =>
            prev.map((order) =>
              order._id === orderId
                ? previousOrder
                : order
            )
          );
        }
      }
    } finally {
      setUpdatingId(null);
    }
  };

  const stats = useMemo(() => {
    const base = {
      total: orders.length,
      pending: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
    };

    orders.forEach((order) => {
      if (order.status === "pending") {
        base.pending++;
      }

      if (order.status === "processing") {
        base.processing++;
      }

      if (order.status === "shipped") {
        base.shipped++;
      }

      if (order.status === "delivered") {
        base.delivered++;
      }
    });

    return base;
  }, [orders]);

  const statCards = [
    {
      label: "Total Orders",
      value: stats.total,
      icon: Inbox,
      accent: "bg-indigo-50 text-[#4F46E5]",
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: Clock,
      accent: "bg-orange-50 text-orange-600",
    },
    {
      label: "Processing",
      value: stats.processing,
      icon: Loader2,
      accent: "bg-blue-50 text-blue-600",
    },
    {
      label: "Shipped",
      value: stats.shipped,
      icon: Truck,
      accent: "bg-indigo-50 text-[#4F46E5]",
    },
    {
      label: "Delivered",
      value: stats.delivered,
      icon: CheckCircle2,
      accent: "bg-green-50 text-green-600",
    },
  ];

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4 sm:mb-8">
        <div>
          <h1 className="text-xl font-bold text-[#0B0B14] sm:text-2xl">
            Orders
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            View and manage all customer orders.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchOrders}
          disabled={loading}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-[#0B0B14] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            size={15}
            className={
              loading ? "animate-spin" : ""
            }
          />

          <span className="hidden sm:inline">
            Refresh
          </span>
        </button>
      </div>

      {/* Stats */}
      {!loading &&
        !error &&
        orders.length > 0 && (
          <div className="mb-6 grid grid-cols-2 gap-3 sm:mb-8 sm:grid-cols-3 sm:gap-4 xl:grid-cols-5">
            {statCards.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="min-w-0 rounded-xl border border-gray-200 bg-white p-3.5 sm:p-4"
                >
                  <div
                    className={`mb-2.5 flex h-8 w-8 items-center justify-center rounded-full ${stat.accent}`}
                  >
                    <Icon size={15} />
                  </div>

                  <p className="text-lg font-bold text-[#0B0B14] sm:text-xl">
                    {stat.value}
                  </p>

                  <p className="mt-0.5 truncate text-xs text-gray-500">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        )}

      {/* Content */}
      <div className="w-full max-w-full overflow-hidden rounded-xl border border-gray-200 bg-white">
        {/* Loading */}
        {loading && (
          <div className="divide-y divide-gray-50">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse px-4 py-4 sm:px-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="h-3.5 w-24 rounded bg-gray-100" />
                    <div className="h-3 w-36 rounded bg-gray-100" />
                  </div>

                  <div className="h-6 w-20 rounded-full bg-gray-100" />

                  <div className="h-6 w-16 rounded bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-500">
              <AlertCircle size={20} />
            </div>

            <p className="text-sm font-medium text-[#0B0B14]">
              Couldn&apos;t load orders
            </p>

            <p className="mt-1 max-w-md text-sm text-gray-500">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchOrders}
              className="mt-4 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-[#0B0B14] transition-colors hover:bg-gray-50"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          orders.length === 0 && (
            <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#F8F9FC] text-gray-300">
                <Inbox size={22} />
              </div>

              <p className="text-sm font-medium text-[#0B0B14]">
                No orders yet
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Orders will appear here once customers start
                purchasing.
              </p>
            </div>
          )}

        {/* Orders */}
        {!loading &&
          !error &&
          orders.length > 0 && (
            <div className="divide-y divide-gray-50">
              {orders.map((order) => {
                const isExpanded =
                  expandedId === order._id;

                const isUpdating =
                  updatingId === order._id;

                const previewItems =
                  order.items.slice(0, 3);

                const extraCount =
                  order.items.length -
                  previewItems.length;

                return (
                  <div
                    key={order._id}
                    className="transition-colors"
                  >
                    {/* Order Row */}
                    <div className="flex w-full flex-col gap-3 px-4 py-4 transition-colors hover:bg-[#F8F9FC] sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6">
                      {/* Left */}
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedId(
                            isExpanded
                              ? null
                              : order._id
                          )
                        }
                        className="flex min-w-0 flex-1 items-center gap-3 text-left"
                      >
                        {/* Product thumbnails */}
                        <div className="hidden shrink-0 -space-x-2.5 sm:flex">
                          {previewItems.map(
                            (item, i) => (
                              <div
                                key={`${item.productId}-${i}`}
                                className="rounded-lg ring-2 ring-white"
                              >
                                <ProductThumb
                                  src={item.image}
                                  alt={item.name}
                                />
                              </div>
                            )
                          )}

                          {extraCount > 0 && (
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0B0B14] text-[10px] font-semibold text-white ring-2 ring-white">
                              +{extraCount}
                            </div>
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-[#4F46E5]">
                            #
                            {order._id
                              .slice(-8)
                              .toUpperCase()}
                          </p>

                          <p className="mt-0.5 flex items-center gap-1.5 truncate text-sm text-[#0B0B14]">
                            <User
                              size={12}
                              className="shrink-0 text-gray-400"
                            />

                            <span className="truncate">
                              {order.user?.name ||
                                "Unknown"}
                            </span>
                          </p>

                          <p className="truncate text-xs text-gray-400 sm:hidden">
                            {order.items.length}{" "}
                            {order.items.length === 1
                              ? "item"
                              : "items"}
                          </p>
                        </div>
                      </button>

                      {/* Right */}
                      <div className="flex items-center justify-between gap-3 sm:justify-end sm:gap-5">
                        <div className="text-left sm:text-right">
                          <p className="text-xs text-gray-400">
                            {formatDate(
                              order.createdAt
                            )}
                          </p>

                          <p className="text-sm font-bold text-[#0B0B14]">
                            $
                            {order.totalAmount.toFixed(
                              2
                            )}
                          </p>
                        </div>

                        {/* Status */}
                        <div className="flex items-center gap-2">
                          {isUpdating ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-100 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-400">
                              <Loader2
                                size={11}
                                className="animate-spin"
                              />
                              Saving
                            </span>
                          ) : (
                            <div
                              className="relative"
                              onClick={(e) =>
                                e.stopPropagation()
                              }
                            >
                              <select
                                value={order.status}
                                onChange={(e) =>
                                  handleStatusChange(
                                    order._id,
                                    e.target
                                      .value as Order["status"]
                                  )
                                }
                                className={`appearance-none rounded-full border py-1 pl-2.5 pr-6 text-xs font-semibold outline-none transition focus:ring-2 focus:ring-[#4F46E5]/30 ${
                                  statusConfig[
                                    order.status
                                  ].badge
                                }`}
                                aria-label={`Change status for order ${order._id}`}
                              >
                                {statusOptions.map(
                                  (status) => (
                                    <option
                                      key={status}
                                      value={status}
                                    >
                                      {
                                        statusConfig[
                                          status
                                        ].label
                                      }
                                    </option>
                                  )
                                )}
                              </select>

                              <ChevronDown
                                size={11}
                                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 opacity-60"
                              />
                            </div>
                          )}
                        </div>

                        {/* Expand */}
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedId(
                              isExpanded
                                ? null
                                : order._id
                            )
                          }
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white hover:text-gray-700"
                          aria-label={
                            isExpanded
                              ? "Collapse order"
                              : "Expand order"
                          }
                        >
                          <ChevronDown
                            size={16}
                            className={`transition-transform duration-300 ${
                              isExpanded
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isExpanded
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="mx-4 mb-4 grid grid-cols-1 gap-4 rounded-xl bg-[#F8F9FC] p-4 sm:mx-6 sm:grid-cols-3 sm:gap-6 sm:p-5">
                          {/* Items */}
                          <div>
                            <p className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400">
                              <Package size={12} />
                              Items ({order.items.length})
                            </p>

                            <div className="space-y-2.5">
                              {order.items.map(
                                (item, i) => (
                                  <div
                                    key={`${item.productId}-${i}`}
                                    className="flex items-center gap-2.5"
                                  >
                                    <ProductThumb
                                      src={item.image}
                                      alt={item.name}
                                    />

                                    <div className="min-w-0 flex-1">
                                      <p className="truncate text-sm text-[#0B0B14]">
                                        {item.name}
                                      </p>

                                      <p className="text-xs text-gray-400">
                                        Qty{" "}
                                        {item.quantity}{" "}
                                        · $
                                        {item.price.toFixed(
                                          2
                                        )}
                                      </p>
                                    </div>

                                    <span className="shrink-0 text-sm font-semibold text-[#0B0B14]">
                                      $
                                      {(
                                        item.price *
                                        item.quantity
                                      ).toFixed(2)}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          </div>

                          {/* Shipping */}
                          <div>
                            <p className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400">
                              <MapPin size={12} />
                              Shipping
                            </p>

                            <p className="text-sm font-medium text-[#0B0B14]">
                              {
                                order.shippingAddress
                                  .fullName
                              }
                            </p>

                            <p className="mt-1 text-sm leading-relaxed text-gray-500">
                              {
                                order.shippingAddress
                                  .address
                              }
                              ,{" "}
                              {
                                order.shippingAddress
                                  .city
                              }
                              ,{" "}
                              {
                                order.shippingAddress
                                  .postalCode
                              }
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                              {
                                order.shippingAddress
                                  .phone
                              }
                            </p>
                          </div>

                          {/* Payment */}
                          <div>
                            <p className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400">
                              <CreditCard size={12} />
                              Payment
                            </p>

                            <p className="text-sm text-[#0B0B14]">
                              {order.paymentMethod}
                            </p>

                            <p className="mt-3 text-xs text-gray-400">
                              Placed{" "}
                              {formatDate(
                                order.createdAt
                              )}{" "}
                              at{" "}
                              {formatTime(
                                order.createdAt
                              )}
                            </p>

                            <div className="mt-3">
                              <StatusBadge
                                status={order.status}
                              />
                            </div>

                            <div className="mt-4 border-t border-gray-200 pt-3">
                              <p className="text-xs text-gray-400">
                                Order Total
                              </p>

                              <p className="text-lg font-bold text-[#0B0B14]">
                                $
                                {order.totalAmount.toFixed(
                                  2
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;