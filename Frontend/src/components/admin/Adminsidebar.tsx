import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Percent,
  LogOut,
  X,
} from "lucide-react";
import { MessageSquare } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { label: "Products", icon: Package, path: "/admin/products" },
  { label: "Orders", icon: ShoppingCart, path: "/admin/orders" },
  { label: "Reviews", icon: MessageSquare, path: "/admin/reviews" },
  { label: "Deals", icon: Percent, path: "/admin/deals" },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminSidebar = ({ isOpen, onClose }: AdminSidebarProps) => {
  const { user, logout } = useAuth();

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 shrink-0 flex-col bg-[#0B0B14] text-white transition-transform duration-300 ease-in-out
        lg:sticky lg:top-0 lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between gap-2 px-6 py-6">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4F46E5] text-sm font-bold text-white">
              TG
            </span>
            <div>
              <p className="text-sm font-bold leading-tight">TechGear</p>
              <p className="text-[11px] font-medium text-indigo-300">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#4F46E5] text-white"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <Icon size={17} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="mb-3 flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2.5">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-8 w-8 shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#4F46E5] text-xs font-bold">
                {user?.name?.charAt(0).toUpperCase() || "A"}
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold">{user?.name || "Admin"}</p>
              <p className="truncate text-[11px] text-gray-400">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10 cursor-pointer"
          >
            <LogOut size={16} />
            Log Out
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;