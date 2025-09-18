import { useState, type ReactNode } from "react";
import { LayoutDashboard, Users, ShoppingBag, FileBarChart, ClipboardList, FolderTree, Star, Phone, LogOut, Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { useNavigate, useLocation } from "react-router-dom"; // Add useLocation
import { logoutUser } from "@/features/auth/authSlice";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, route: "/admin", exactMatch: true },
  { title: "Users", icon: Users, route: "/admin/users" },
  { title: "Categories", icon: FolderTree, route: "/admin/categories" },
  { title: "Products", icon: ShoppingBag, route: "/admin/products" },
  { title: "Reports", icon: FileBarChart, route: "/admin/reports" },
  { title: "Orders", icon: ClipboardList, route: "/admin/orders" },
  { title: "Reviews", icon: Star, route: "/admin/reviews" },
  { title: "Contacts", icon: Phone, route: "/admin/contacts" },
];

const AdminSidebar = ({ children }: { children: ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation(); 

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const isActive = (item: (typeof menuItems)[0]) => {
    if (item.exactMatch) {
      return location.pathname === item.route;
    }
    return location.pathname.startsWith(item.route);
  };

  return (
    <div className="h-screen flex">
      <div
        className={`
          flex h-screen flex-col bg-blue-50 shadow-xl border-r border-gray-200
          transition-all duration-300
          ${sidebarOpen ? "w-20 md:w-64" : "w-20"}
        `}
      >
        <div className="flex items-center justify-between p-4 h-16 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            {sidebarOpen && <span className="text-xl font-bold text-blue-600 hidden md:inline">Hatbato</span>}
          </div>
          <Menu
            className="h-5 w-5 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors hidden md:inline"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          />
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-1">
          {menuItems.map((item) => {
            const active = isActive(item);
            return (
              <div
                key={item.title}
                onClick={() => navigate(item.route)}
                className={`
                  flex items-center gap-3 rounded-lg px-3 py-3 transition-all duration-200 group cursor-pointer
                  ${active ? "bg-blue-100 text-blue-600 border-r-2 border-blue-600" : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"}
                `}
              >
                <item.icon
                  size={20}
                  strokeWidth={1.8}
                  className={`transition-colors flex-shrink-0 ${active ? "text-blue-600" : "text-gray-500 group-hover:text-blue-600"}`}
                />
                {sidebarOpen && <span className={`hidden md:inline font-medium ${active ? "font-semibold" : ""}`}>{item.title}</span>}
                {active && <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full hidden md:block"></div>}
              </div>
            );
          })}
        </nav>
        <div className="border-t border-gray-200 p-4 space-y-4">
          <button
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group w-full"
            onClick={handleLogout}
          >
            <LogOut size={20} strokeWidth={1.8} className="group-hover:text-red-600 transition-colors flex-shrink-0" />
            {sidebarOpen && <span className="hidden md:inline font-medium">Logout</span>}
          </button>

          <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-50 transition">
            <div className="relative flex-shrink-0">
              <img src={user?.imageUrl} alt={user?.name?.charAt(0) || "U"} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            {sidebarOpen && (
              <div className="hidden md:flex flex-col">
                <span className="text-sm font-medium text-gray-800">{user?.name || "Admin User"}</span>
                <span className="text-xs text-gray-500">{user?.email || "admin@example.com"}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-blue-50">{children}</main>
    </div>
  );
};

export default AdminSidebar;
