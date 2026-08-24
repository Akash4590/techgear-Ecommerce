import { useEffect, useState } from "react";
import {ShoppingCart,CheckCircle2,XCircle,Package,DollarSign,Clock,ArrowUpRight
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/api";
interface RecentOrder {
  _id: string; user: { name: string; email: string } | null; totalAmount: number;status: string;createdAt: string;}
interface DashboardStats {totalOrders: number;deliveredOrders: number;cancelledOrders: number;pendingOrders: number;totalProducts: number;totalRevenue: number;recentOrders: RecentOrder[]}
const statusStyles: Record<string, string> = {
  delivered: "bg-green-50 text-green-700",
  processing: "bg-orange-50 text-orange-700",
  pending: "bg-orange-50 text-orange-700",
  shipped: "bg-blue-50 text-blue-700",
  cancelled: "bg-red-50 text-red-700",
};

const formatStatus = (status: string) =>
  status.charAt(0).toUpperCase() + status.slice(1);

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const AdminDashboardPage = () => {
  const { token } = useAuth();

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/orders/admin/stats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!data.success) {
          setError(data.message || "Failed to load dashboard");
          return;
        }

        setStats(data.data);
      } catch (err) {
        console.error("Dashboard stats error:", err);
        setError("Something went wrong while loading dashboard.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchStats();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-sm text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="flex items-center justify-center py-24 text-sm text-red-500">
        {error || "Failed to load dashboard data."}
      </div>
    );
  }

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
      value: `$${stats.totalRevenue.toLocaleString(undefined, {
        minimumFractionDigits: 2,
      })}`,
      icon: DollarSign,
      accent: "bg-blue-50 text-blue-600",
    },
  ];

  return (
    <div className="w-full min-w-0 max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl font-bold text-[#0B0B14] sm:text-2xl">
          Dashboard Overview
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Welcome back — here's what's happening with your store today.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="mb-6 grid w-full min-w-0 grid-cols-1 gap-4 sm:mb-8 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
        {statCards.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="w-full min-w-0 rounded-xl border border-gray-200 bg-white p-4 sm:p-5"
            >
              <div className="flex items-start justify-between gap-2">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full sm:h-11 sm:w-11 ${stat.accent}`}
                >
                  <Icon size={18} className="sm:hidden" />
                  <Icon size={19} className="hidden sm:block" />
                </div>
              </div>

              <p className="mt-4 break-words text-xl font-bold text-[#0B0B14] sm:text-2xl">
                {stat.value}
              </p>

              <p className="mt-0.5 break-words text-sm text-gray-500">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div className="w-full min-w-0 max-w-full overflow-hidden rounded-xl border border-gray-200 bg-white">
        {/* Header */}
        <div className="flex items-center justify-between gap-2 border-b border-gray-100 px-4 py-4 sm:px-6">
          <h2 className="text-base font-bold text-[#0B0B14]">
            Recent Orders
          </h2>

          <a
            href="/admin/orders"
            className="flex shrink-0 items-center gap-1 whitespace-nowrap text-sm font-medium text-[#4F46E5] hover:underline"
          >
            View all
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* No Orders */}
        {stats.recentOrders.length === 0 ? (
          <div className="px-4 py-14 text-center text-sm text-gray-400">
            No orders yet. Orders will appear here once customers start
            purchasing.
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden overflow-x-auto sm:block">
              <table className="w-full min-w-[650px] text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left text-xs text-gray-400">
                    <th className="px-6 py-3 font-medium">Order ID</th>
                    <th className="px-6 py-3 font-medium">Customer</th>
                    <th className="px-6 py-3 font-medium">Date</th>
                    <th className="px-6 py-3 font-medium">Total</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {stats.recentOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b border-gray-50 transition-colors last:border-0 hover:bg-[#F8F9FC]"
                    >
                      <td className="px-6 py-3.5 font-medium text-[#4F46E5]">
                        #{order._id.slice(-8).toUpperCase()}
                      </td>

                      <td className="px-6 py-3.5 text-[#0B0B14]">
                        {order.user?.name || "Unknown"}
                      </td>

                      <td className="px-6 py-3.5 text-gray-500">
                        {formatDate(order.createdAt)}
                      </td>

                      <td className="px-6 py-3.5 font-semibold text-[#0B0B14]">
                        ${order.totalAmount.toFixed(2)}
                      </td>

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

            {/* Mobile Card List */}
            <div className="divide-y divide-gray-50 sm:hidden">
              {stats.recentOrders.map((order) => (
                <div
                  key={order._id}
                  className="min-w-0 px-4 py-4"
                >
                  <div className="mb-2 flex min-w-0 items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-[#4F46E5]">
                        #{order._id.slice(-8).toUpperCase()}
                      </p>

                      <p className="mt-0.5 truncate text-sm text-[#0B0B14]">
                        {order.user?.name || "Unknown"}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${
                        statusStyles[order.status] ||
                        "bg-gray-50 text-gray-600"
                      }`}
                    >
                      {formatStatus(order.status)}
                    </span>
                  </div>

                  <div className="flex min-w-0 items-center justify-between gap-2 text-sm">
                    <span className="min-w-0 truncate text-gray-500">
                      {formatDate(order.createdAt)}
                    </span>

                    <span className="shrink-0 whitespace-nowrap font-semibold text-[#0B0B14]">
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