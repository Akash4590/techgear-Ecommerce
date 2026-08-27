import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Package,
  Heart,
  Settings,
  LogOut,
  Mail,
  ShoppingBag,
  ChevronRight,
  Eye,
  EyeOff,
  Trash2,
  AlertTriangle,
  X,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useShop } from "../context/ShopContext";
import { API_BASE_URL } from "../config/api";
import OrdersContent from "../components/orders/Orderscontent";

type TabId = "profile" | "orders" | "wishlist" | "settings";

const tabs: { id: TabId; label: string; icon: typeof User }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "orders", label: "Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "settings", label: "Settings", icon: Settings },
];

const AccountPage = () => {
  const navigate = useNavigate();
  const { user, token, logout, updateUser } = useAuth();
  const { wishlistItems, cartItems } = useShop();
  const [activeTab, setActiveTab] = useState<TabId>("profile");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className="flex-1 bg-[#F8F9FC]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-10">

          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#4F46E5] text-white text-xl font-bold">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#0B0B14]">{user?.name || "User"}</h1>
              <p className="text-sm text-gray-500 flex items-center gap-1.5">
                <Mail size={13} />
                {user?.email}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">

            {/* Sidebar */}
            <aside className="bg-white border border-gray-200 rounded-2xl p-4 h-fit">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-[#4F46E5] text-white"
                          : "text-gray-600 hover:bg-[#F8F9FC] hover:text-[#0B0B14]"
                      }`}
                    >
                      <Icon size={16} />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>

              <div className="h-px bg-gray-100 my-3" />

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={16} />
                Log Out
              </button>
            </aside>

            {/* Content */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8">
              <AnimatePresence mode="wait">
                {activeTab === "profile" && (
                  <ProfileTab
                    key="profile"
                    cartItems={cartItems}
                    wishlistItems={wishlistItems}
                    navigate={navigate}
                  />
                )}
                {activeTab === "orders" && <OrdersContent key="orders" />}
                {activeTab === "wishlist" && (
                  <WishlistTab key="wishlist" wishlistItems={wishlistItems} navigate={navigate} />
                )}
                {activeTab === "settings" && (
                  <SettingsTab
                    key="settings"
                    user={user}
                    token={token}
                    updateUser={updateUser}
                    logout={logout}
                    navigate={navigate}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

// ---------- Profile Tab ----------
const ProfileTab = ({ cartItems, wishlistItems, navigate }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25 }}
  >
    <h2 className="text-lg font-bold text-[#0B0B14] mb-6">Profile Overview</h2>

    {/* Cart preview */}
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-[#0B0B14] flex items-center gap-2">
          <ShoppingBag size={15} className="text-[#4F46E5]" />
          Your Cart ({cartItems.length})
        </h3>
        {cartItems.length > 0 && (
          <button onClick={() => navigate("/cart")} className="text-xs text-[#4F46E5] font-medium hover:underline">
            View all
          </button>
        )}
      </div>
      {cartItems.length === 0 ? (
        <p className="text-sm text-gray-400 py-4">Your cart is empty.</p>
      ) : (
         <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
    {cartItems.slice(0, 4).map((item: any) => (
      <div key={item.product.id} className="border border-gray-100 rounded-xl p-2.5">
        <div className="h-16 flex items-center justify-center mb-2">
          <img src={item.product.image} alt={item.product.name} className="h-full object-contain" />
        </div>
        <p className="text-xs font-medium text-[#0B0B14] line-clamp-1">{item.product.name}</p>
        <p className="text-xs text-gray-500">${item.product.price}</p>
      </div>
          ))}
        </div>
      )}
    </div>

    {/* Wishlist preview */}
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-[#0B0B14] flex items-center gap-2">
          <Heart size={15} className="text-[#4F46E5]" />
          Wishlist ({wishlistItems.length})
        </h3>
        {wishlistItems.length > 0 && (
          <button onClick={() => navigate("/wishlist")} className="text-xs text-[#4F46E5] font-medium hover:underline">
            View all
          </button>
        )}
      </div>
      {wishlistItems.length === 0 ? (
        <p className="text-sm text-gray-400 py-4">No items saved yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {wishlistItems.slice(0, 4).map((item: any) => (
            <div key={item.id} className="border border-gray-100 rounded-xl p-2.5">
              <div className="h-16 flex items-center justify-center mb-2">
                <img src={item.image} alt={item.name} className="h-full object-contain" />
              </div>
              <p className="text-xs font-medium text-[#0B0B14] line-clamp-1">{item.name}</p>
              <p className="text-xs text-gray-500">${item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  </motion.div>
);

// ---------- Orders Tab ----------
const OrdersTab = ({ navigate }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25 }}
    className="text-center py-16"
  >
    <Package size={40} className="text-gray-300 mx-auto mb-4" />
    <h2 className="text-lg font-bold text-[#0B0B14] mb-1">No orders yet</h2>
    <p className="text-sm text-gray-500 mb-6">
      When you place an order, it will show up here.
    </p>
    <button
      onClick={() => navigate("/shop")}
      className="inline-flex items-center gap-2 bg-[#4F46E5] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#4338CA] transition-colors"
    >
      Start Shopping
      <ChevronRight size={15} />
    </button>
  </motion.div>
);

// ---------- Wishlist Tab ----------
const WishlistTab = ({ wishlistItems, navigate }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25 }}
  >
    <h2 className="text-lg font-bold text-[#0B0B14] mb-6">Your Wishlist</h2>
    {wishlistItems.length === 0 ? (
      <div className="text-center py-16">
        <Heart size={40} className="text-gray-300 mx-auto mb-4" />
        <h3 className="text-base font-semibold text-[#0B0B14] mb-1">Your wishlist is empty</h3>
        <p className="text-sm text-gray-500 mb-6">Save your favorite products to view them anytime.</p>
        <button
          onClick={() => navigate("/shop")}
          className="inline-flex items-center gap-2 bg-[#4F46E5] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#4338CA] transition-colors"
        >
          Browse Products
          <ChevronRight size={15} />
        </button>
      </div>
    ) : (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {wishlistItems.map((item: any) => (
          <Link
            key={item.id}
            to={`/product/${item.id}`}
            className="border border-gray-200 rounded-xl p-3 hover:shadow-md transition-shadow"
          >
            <div className="h-24 flex items-center justify-center mb-2">
              <img src={item.image} alt={item.name} className="h-full object-contain" />
            </div>
            <p className="text-sm font-medium text-[#0B0B14] line-clamp-1">{item.name}</p>
            <p className="text-sm text-gray-500">${item.price}</p>
          </Link>
        ))}
      </div>
    )}
  </motion.div>
);

// ---------- Settings Tab ----------
const SettingsTab = ({ user, token, updateUser, logout, navigate }: any) => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(user?.emailNotifications ?? true);
  const [deletePassword, setDeletePassword] = useState("");

 const handleChangePassword = async (e: React.FormEvent) => {
  e.preventDefault();
  setMessage({ type: "", text: "" });

if (newPassword.length < 5) {   
  setMessage({ type: "error", text: "New password must be at least 5 characters" });
  return;
}
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();

      if (!data.success) {
        setMessage({ type: "error", text: data.message });
        return;
      }

      setMessage({ type: "success", text: "Password changed successfully" });
      setCurrentPassword("");
      setNewPassword("");
      setShowChangePassword(false);
    } catch {
      setMessage({ type: "error", text: "Something went wrong. Try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleNotifications = async () => {
    const newValue = !emailNotifications;
    setEmailNotifications(newValue);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/preferences`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ emailNotifications: newValue }),
      });
      const data = await res.json();
      if (data.success) {
        updateUser({ ...user, emailNotifications: newValue });
      }
    } catch {
      setEmailNotifications(!newValue); // revert on failure
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    setMessage({ type: "", text: "" });
    try {
      const res = await fetch(`${API_BASE_URL}/auth/delete-account`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (!data.success) {
        setMessage({ type: "error", text: data.message });
        return;
      }

      logout();
      navigate("/");
    } catch {
      setMessage({ type: "error", text: "Failed to delete account. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <h2 className="text-lg font-bold text-[#0B0B14] mb-6">Account Settings</h2>

      {message.text && (
        <div
          className={`mb-5 rounded-lg px-4 py-2.5 text-sm border ${
            message.type === "success"
              ? "bg-green-50 border-green-200 text-green-700"
              : "bg-red-50 border-red-200 text-red-600"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="space-y-1">
        {/* Change Password */}
        <div className="py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#0B0B14]">Change Password</p>
              <p className="text-xs text-gray-500">Update your account password</p>
            </div>
            <button
              onClick={() => setShowChangePassword((p) => !p)}
              className="text-sm text-[#4F46E5] font-medium hover:underline"
            >
              {showChangePassword ? "Cancel" : "Update"}
            </button>
          </div>

          <AnimatePresence>
            {showChangePassword && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleChangePassword}
                className="overflow-hidden"
              >
                <div className="pt-4 space-y-3 max-w-sm">
                  <div className="relative">
                    <input
                      type={showCurrentPw ? "text" : "password"}
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Current password"
                      className="w-full rounded-lg border border-gray-200 pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPw((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showCurrentPw ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showNewPw ? "text" : "password"}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New password (min 5 characters)"
                      className="w-full rounded-lg border border-gray-200 pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPw((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showNewPw ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#4F46E5] text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-[#4338CA] transition-colors disabled:opacity-60"
                  >
                    {loading ? "Saving..." : "Save Password"}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Email Notifications */}
        <div className="flex items-center justify-between py-4 border-b border-gray-100">
          <div>
            <p className="text-sm font-medium text-[#0B0B14]">Email Notifications</p>
            <p className="text-xs text-gray-500">Receive deal and order updates via email</p>
          </div>
          <button
            onClick={handleToggleNotifications}
            className={`relative h-6 w-11 rounded-full transition-colors ${
              emailNotifications ? "bg-[#4F46E5]" : "bg-gray-200"
            }`}
          >
            <motion.span
              animate={{ x: emailNotifications ? 20 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm"
            />
          </button>
        </div>

        {/* Delete Account */}
        <div className="flex items-center justify-between py-4">
          <div>
            <p className="text-sm font-medium text-red-600">Delete Account</p>
            <p className="text-xs text-gray-500">Permanently remove your account and data</p>
          </div>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="text-sm text-red-600 font-medium hover:underline"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600">
                  <AlertTriangle size={18} />
                </div>
                <button onClick={() => setShowDeleteConfirm(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={18} />
                </button>
              </div>
              <h3 className="text-base font-bold text-[#0B0B14] mb-2">Delete your account?</h3>
              <p className="text-sm text-gray-500 mb-5">
                This action cannot be undone. All your data will be permanently removed.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 border border-gray-200 text-[#0B0B14] text-sm font-medium py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-60"
                >
                  <Trash2 size={14} />
                  {loading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AccountPage;