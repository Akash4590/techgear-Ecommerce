import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Bell, Search, Menu } from "lucide-react";
import AdminSidebar from "./Adminsidebar";
import { useAuth } from "../../context/AuthContext";

const AdminLayout = () => {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
                placeholder="Search products, orders..."
                className="w-full rounded-lg border border-gray-200 bg-[#F8F9FC] py-2 pl-10 pr-4 text-sm text-[#0B0B14] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <button className="relative text-gray-500 hover:text-[#4F46E5] transition-colors cursor-pointer">
              <Bell size={19} />
              <span className="absolute -right-1 -top-1 flex h-2 w-2 rounded-full bg-red-500" />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#4F46E5] text-xs font-bold text-white">
                {user?.name?.charAt(0).toUpperCase() || "A"}
              </div>
              <span className="text-sm font-semibold text-[#0B0B14] hidden sm:inline">
                {user?.name || "Admin"}
              </span>
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