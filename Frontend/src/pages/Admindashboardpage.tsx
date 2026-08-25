import { useEffect, useState } from "react";
import {
  ShoppingCart,
  CheckCircle2,
  XCircle,
  Package,
  DollarSign,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/api";

interface RecentOrder {
  _id: string;
  user: {
    name: string;
    email: string;
  } | null;
  totalAmount: number;
  status: string;
  createdAt: string;
}

interface DashboardStats {
  totalOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  pendingOrders: number;
  totalProducts: number;
  totalRevenue: number;
  recentOrders: RecentOrder[];
}

const statusStyles: Record<string, string> = {
  delivered: "bg-green-50 text-green-700",
  processing: "bg-orange-50 text-orange-700",
  pending: "bg-orange-50 text-orange-700",
  shipped: "bg-blue-50 text-blue-700",
  cancelled: "bg-red-50 text-red-700",
};

const formatStatus = (status: string) => {
  if (!status) return "Unknown";

  return status.charAt(0).toUpperCase() + status.slice(1);
};

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

const AdminDashboardPage = () => {
  const { token, authFetch } = useAuth();

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchStats = async () => {
      if (!token) {
        if (!cancelled) {
          setLoading(false);
          setError("Authentication token not found.");
        }
        return;
      }

      try {
        setLoading(true);
        setError("");

        const res = await authFetch(
          `${API_BASE_URL}/orders/admin/stats`
        );

        const data = await res.json();

        if (!res.ok || !data.success) {
          if (!cancelled) {
            setError(
              data.message || "Failed to load dashboard"
            );
          }
          return;
        }

        if (!cancelled) {
          setStats({
            totalOrders: Number(data.data?.totalOrders ?? 0),
            deliveredOrders: Number(
              data.data?.deliveredOrders ?? 0
            ),
            cancelledOrders: Number(
              data.data?.cancelledOrders ?? 0
            ),
            pendingOrders: Number(
              data.data?.pendingOrders ?? 0
            ),
            totalProducts: Number(
              data.data?.totalProducts ?? 0
            ),
            totalRevenue: Number(
              data.data?.totalRevenue ?? 0
            ),
            recentOrders: Array.isArray(
              data.data?.recentOrders
            )
              ? data.data.recentOrders
              : [],
          });
        }
      } catch (err) {
        if ((err as Error).message === "Session expired") {
          return;
        }

        console.error("Dashboard stats error:", err);

        if (!cancelled) {
          setError(
            "Something went wrong while loading dashboard."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchStats();

    return () => {
      cancelled = true;
    };
  }, [token, authFetch]);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="w-full">
        <div className="mb-8">
          <div className="h-7 w-48 animate-pulse rounded bg-gray-100" />
          <div className="mt-2 h-4 w-72 max-w-full animate-pulse rounded bg-gray-100" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-xl border border-gray-200 bg-white p-5"
            >
              <div className="h-11 w-11 rounded-full bg-gray-100" />
              <div className="mt-4 h-7 w-24 rounded bg-gray-100" />
              <div className="mt-2 h-4 w-32 rounded bg-gray-100" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error || !stats) {
    return (
      <div className="flex min-h-[300px] items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
            <XCircle
              size={22}
              className="text-red-500"
            />
          </div>

          <p className="text-sm font-semibold text-[#0B0B14]">
            Unable to load dashboard
          </p>

          <p className="mt-1 text-sm text-gray-500">
            {error || "Failed to load dashboard data."}
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // STAT CARDS
  // =========================

  const statCards = [
    {
      label: "Total Orders",
      value: stats.totalOrders.toLocaleString(),
      icon: ShoppingCart,
      accent: "bg-indigo-50 text-[#4F46E5]",
    },
    {
      label: "Delivered Orders",
      value: stats.deliveredOrders.toLocaleString(),
      icon: CheckCircle2,
      accent: "bg-green-50 text-green-600",
    },
    {
      label: "Cancelled Orders",
      value: stats.cancelledOrders.toLocaleString(),
      icon: XCircle,
      accent: "bg-red-50 text-red-600",
    },
    {
      label: "Pending / Processing",
      value: stats.pendingOrders.toLocaleString(),
      icon: Clock,
      accent: "bg-orange-50 text-orange-600",
    },
    {
      label: "Total Products",
      value: stats.totalProducts.toLocaleString(),
      icon: Package,
      accent: "bg-purple-50 text-purple-600",
    },
    {
      label: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString(
        undefined,
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      )}`,
      icon: DollarSign,
      accent: "bg-blue-50 text-blue-600",
    },
  ];

  // =========================
  // UI
  // =========================

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl font-bold text-[#0B0B14] sm:text-2xl">
          Dashboard Overview
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Welcome back — here&apos;s what&apos;s happening
          with your store today.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:mb-8 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
        {statCards.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-sm sm:p-5"
            >
              <div className="flex items-start justify-between gap-2">
                <div
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full sm:h-11 sm:w-11 ${stat.accent}`}
                >
                  <Icon size={18} />
                </div>
              </div>

              <p className="mt-4 break-words text-xl font-bold text-[#0B0B14] sm:text-2xl">
                {stat.value}
              </p>

              <p className="mt-0.5 text-sm text-gray-500">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="w-full max-w-full overflow-hidden rounded-xl border border-gray-200 bg-white">
        {/* Header */}
        <div className="flex items-center justify-between gap-2 border-b border-gray-100 px-4 py-4 sm:px-6">
          <h2 className="text-base font-bold text-[#0B0B14]">
            Recent Orders
          </h2>

          <a
            href="/admin/orders"
            className="flex items-center gap-1 whitespace-nowrap text-sm font-medium text-[#4F46E5] transition-colors hover:text-[#3730A3] hover:underline"
          >
            View all
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* No Orders */}
        {stats.recentOrders.length === 0 ? (
          <div className="py-14 text-center">
            <Package
              size={32}
              className="mx-auto mb-3 text-gray-300"
            />

            <p className="text-sm font-medium text-[#0B0B14]">
              No orders yet
            </p>

            <p className="mt-1 px-4 text-sm text-gray-400">
              Orders will appear here once customers start
              purchasing.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden overflow-x-auto sm:block">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left text-xs text-gray-400">
                    <th className="px-6 py-3 font-medium">
                      Order ID
                    </th>

                    <th className="px-6 py-3 font-medium">
                      Customer
                    </th>

                    <th className="px-6 py-3 font-medium">
                      Date
                    </th>

                    <th className="px-6 py-3 font-medium">
                      Total
                    </th>

                    <th className="px-6 py-3 font-medium">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {stats.recentOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b border-gray-50 transition-colors last:border-0 hover:bg-[#F8F9FC]"
                    >
                      {/* Order ID */}
                      <td className="px-6 py-3.5 font-medium text-[#4F46E5]">
                        #{order._id.slice(-8).toUpperCase()}
                      </td>

                      {/* Customer */}
                      <td className="px-6 py-3.5 text-[#0B0B14]">
                        {order.user?.name || "Unknown"}
                      </td>

                      {/* Date */}
                      <td className="px-6 py-3.5 text-gray-500">
                        {formatDate(order.createdAt)}
                      </td>

                      {/* Total */}
                      <td className="px-6 py-3.5 font-semibold text-[#0B0B14]">
                        ${order.totalAmount.toFixed(2)}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-3.5">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            statusStyles[order.status] ||
                            "bg-gray-50 text-gray-600"
                          }`}
                        >
                          {formatStatus(order.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="divide-y divide-gray-50 sm:hidden">
              {stats.recentOrders.map((order) => (
                <div
                  key={order._id}
                  className="min-w-0 px-4 py-4"
                >
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-[#4F46E5]">
                        #{order._id.slice(-8).toUpperCase()}
                      </p>

                      <p className="mt-0.5 truncate text-sm text-[#0B0B14]">
                        {order.user?.name || "Unknown"}
                      </p>

                      {order.user?.email && (
                        <p className="mt-0.5 truncate text-xs text-gray-400">
                          {order.user.email}
                        </p>
                      )}
                    </div>

                    <span
                      className={`flex-shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${
                        statusStyles[order.status] ||
                        "bg-gray-50 text-gray-600"
                      }`}
                    >
                      {formatStatus(order.status)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 text-sm">
                    <span className="truncate text-gray-500">
                      {formatDate(order.createdAt)}
                    </span>

                    <span className="flex-shrink-0 whitespace-nowrap font-semibold text-[#0B0B14]">
                      ${order.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardPage;