import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Bell, Search, Menu } from "lucide-react";
import AdminSidebar from "./Adminsidebar";
import { useAuth } from "../../context/AuthContext";
import { API_BASE_URL } from "../../config/api";

interface AdminOrderNotification {
  _id: string;
  createdAt: string;
  totalAmount: number;
  user?: { name?: string } | null;
}

const AdminLayout = () => {
  const { user, logout, updateUser, authFetch } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<AdminOrderNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchNotifications = async () => {
      try {
        const response = await authFetch(`${API_BASE_URL}/orders/admin/all`);
        if (!response.ok) return;

        const result: { data?: AdminOrderNotification[] } = await response.json();
        if (!isMounted) return;

        const latestOrders = (result.data ?? []).slice(0, 5);
        setNotifications(latestOrders);

        const seenOrderIds = JSON.parse(
          localStorage.getItem("techgear_admin_seen_orders") || "[]"
        ) as string[];
        const newOrderCount = latestOrders.filter(
          (order) => !seenOrderIds.includes(order._id)
        ).length;
        setUnreadCount(newOrderCount);
      } catch {
        // Notifications should not interrupt the admin workspace.
      }
    };

    void fetchNotifications();
    const intervalId = window.setInterval(fetchNotifications, 15000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, [authFetch]);

  const handleNotificationsClick = () => {
    setShowNotifications((isOpen) => !isOpen);
    const seenOrderIds = notifications.map((order) => order._id);
    localStorage.setItem("techgear_admin_seen_orders", JSON.stringify(seenOrderIds));
    setUnreadCount(0);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    navigate(value.trim() ? `/admin/products?search=${encodeURIComponent(value)}` : "/admin/products");
  };

  const handleProfileImage = (file: File | undefined) => {
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string" && user) {
        updateUser({ ...user, avatar: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FC] w-full max-w-full overflow-x-hidden">
      <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex h-16 items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 sm:px-8">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Hamburger — sirf mobile pe */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="text-gray-500 hover:text-[#4F46E5] transition-colors lg:hidden shrink-0"
              aria-label="Open sidebar"
            >
              <Menu size={22} />
            </button>

            <div className="relative w-full max-w-xs hidden sm:block">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={search}
                onChange={(event) => handleSearch(event.target.value)}
                placeholder="Search products, orders..."
                className="w-full rounded-lg border border-gray-200 bg-[#F8F9FC] py-2 pl-10 pr-4 text-sm text-[#0B0B14] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <div className="relative">
            <button
              type="button"
              onClick={handleNotificationsClick}
              aria-label="View admin notifications"
              className="relative text-gray-500 hover:text-[#4F46E5] transition-colors cursor-pointer"
            >
              <Bell size={19} />
              {unreadCount > 0 && (
                <span className="absolute -right-2 -top-2 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>
            {showNotifications && (
              <div className="absolute right-0 top-8 z-30 w-72 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                <div className="flex items-center justify-between px-3 py-2">
                  <p className="text-sm font-semibold text-[#0B0B14]">Notifications</p>
                  <span className="text-xs text-gray-400">Latest orders</span>
                </div>
                {notifications.length === 0 ? (
                  <p className="px-3 py-4 text-sm text-gray-500">No notifications yet.</p>
                ) : (
                  notifications.map((order) => (
                    <button
                      type="button"
                      key={order._id}
                      onClick={() => navigate("/admin/orders")}
                      className="w-full rounded-md px-3 py-2 text-left hover:bg-gray-50"
                    >
                      <p className="text-sm text-gray-700">
                        New order from {order.user?.name || "customer"}
                      </p>
                      <p className="text-xs text-gray-400">
                        ${order.totalAmount.toFixed(2)} · {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </button>
                  ))
                )}
              </div>
            )}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowProfileMenu((isOpen) => !isOpen)}
                className="flex items-center gap-2.5 rounded-lg p-1 hover:bg-gray-50"
                aria-label="Open admin profile menu"
              >
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="h-8 w-8 shrink-0 rounded-full object-cover" />
                ) : (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#4F46E5] text-xs font-bold text-white">
                    {user?.name?.charAt(0).toUpperCase() || "A"}
                  </div>
                )}
              <span className="text-sm font-semibold text-[#0B0B14] hidden sm:inline">
                {user?.name || "Admin"}
              </span>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 top-11 z-30 w-52 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Upload profile picture
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    Log out
                  </button>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => handleProfileImage(event.target.files?.[0])}
              />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;