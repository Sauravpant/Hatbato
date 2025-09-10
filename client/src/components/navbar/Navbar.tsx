import React, { useContext, useState } from "react";
import { Menu, X, Sun, Moon, Search, User, Settings, LogOut } from "lucide-react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { logoutUser } from "@/features/auth/authSlice";
import { Button } from "../ui/button";
import Notifications from "../common/Notifications";
import { SearchContext } from "@/store/searchContext";
import { MdDashboard } from "react-icons/md";

const navbarItems = [
  { name: "Home", link: "/" },
  { name: "Category", link: "/category" },
  { name: "Products", link: "/products" },
  { name: "Sell", link: "/sell" },
  { name: "Contact", link: "/contact" },
];

const Navbar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const context = useContext(SearchContext);
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    navigate("/products");
    context?.setSearch(e.target.value);
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
  };

  const navigate = useNavigate();

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white border-b border-blue-700/30 sticky top-0 z-50 backdrop-blur-xl shadow-lg">
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-xl mr-4 sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-cyan-300 transition-all duration-300 flex-shrink-0"
            >
              Hatbato
            </Link>
          </div>
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {navbarItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.link}
                onClick={(e) => {
                  if (!isAuthenticated && item.name === "Sell") {
                    e.preventDefault();
                    navigate("/auth/login");
                  }
                }}
                className={({ isActive }: { isActive: boolean }) =>
                  `relative px-1 py-2 text-xs xl:text-sm font-medium transition-all duration-300 group whitespace-nowrap ${
                    isActive ? "text-white font-semibold" : "text-blue-200 hover:text-white"
                  }`
                }
              >
                {({ isActive }: { isActive: boolean }) => (
                  <>
                    {item.name}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-300 ${
                        isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-60"
                      }`}
                    ></span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
          <div className="hidden md:flex items-center flex-1 max-w-xs lg:max-w-md mx-2 lg:mx-4 xl:mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-300" />
              <input
                type="text"
                value={context?.search}
                placeholder="Search Products..."
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-1.5 lg:py-2 bg-blue-800/30 border border-blue-600/40 rounded-xl text-xs lg:text-sm placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 backdrop-blur-sm text-white transition-all duration-300"
              />
            </div>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
            <div className="relative">
              <Notifications isAuthenticated={isAuthenticated} />
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-1.5 sm:p-2 rounded-xl hover:bg-blue-800/30 transition-all duration-300 backdrop-blur-sm border border-blue-700/20 cursor-pointer group"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-amber-300 group-hover:scale-110 transition-transform" />
              ) : (
                <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-300 group-hover:text-white group-hover:scale-110 transition-transform" />
              )}
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <Button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 rounded-full bg-gradient-to-r from-blue-800 to-blue-700 p-0 overflow-hidden border border-blue-600/50 hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-md cursor-pointer group"
                  aria-label="User profile"
                >
                  {user?.imageUrl ? (
                    <img
                      src={user.imageUrl}
                      alt="User profile"
                      className="h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <span className="text-xs sm:text-sm text-white font-medium group-hover:scale-105 transition-transform">
                      {user?.name?.charAt(0) || "U"}
                    </span>
                  )}
                </Button>
                {profileMenuOpen && (
                  <div className="absolute -right-3 mt-2 w-44 sm:w-48 bg-gradient-to-b from-slate-900 to-blue-900 border border-blue-700/30 rounded-xl shadow-2xl z-50 backdrop-blur-xl animate-in fade-in-80">
                    <div className="p-3 sm:p-4 border-b border-blue-700/30 bg-blue-900/40">
                      <p className="text-xs sm:text-sm font-medium text-white truncate">{user?.name}</p>
                      <p className="text-xs text-blue-300/80 truncate mt-1">{user?.email}</p>
                    </div>
                    <div className="p-2 space-y-1">
                      <Link
                        to="/settings"
                        className="flex items-center px-3 py-2 text-xs sm:text-sm text-blue-200 hover:bg-blue-800/40 rounded-lg transition-all duration-200 hover:text-white cursor-pointer group/menu"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        <MdDashboard className="h-3 w-3 sm:h-4 sm:w-4 mr-2 group-hover/menu:scale-110 transition-transform" />
                        Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        className="flex items-center px-3 py-2 text-xs sm:text-sm text-blue-200 hover:bg-blue-800/40 rounded-lg transition-all duration-200 hover:text-white cursor-pointer group/menu"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        <User className="h-3 w-3 sm:h-4 sm:w-4 mr-2 group-hover/menu:scale-110 transition-transform" />
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center px-3 py-2 text-xs sm:text-sm text-blue-200 hover:bg-blue-800/40 rounded-lg transition-all duration-200 hover:text-white cursor-pointer group/menu"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        <Settings className="h-3 w-3 sm:h-4 sm:w-4 mr-2 group-hover/menu:scale-110 transition-transform" />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-3 py-2 text-xs sm:text-sm text-blue-200 hover:bg-blue-800/40 rounded-lg transition-all duration-200 hover:text-white cursor-pointer group/menu"
                      >
                        <LogOut className="h-3 w-3 sm:h-4 sm:w-4 mr-2 group-hover/menu:scale-110 transition-transform" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-1 sm:space-x-2 lg:space-x-3">
                <Link
                  to="/auth/login"
                  className="px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-xs sm:text-sm font-medium text-white hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer whitespace-nowrap"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/signup"
                  className="hidden sm:block px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-xl border border-blue-600/40 text-xs sm:text-sm font-medium text-blue-200 hover:bg-blue-800/30 hover:text-white transition-all duration-300 cursor-pointer whitespace-nowrap"
                >
                  Register
                </Link>
              </div>
            )}
            <button
              className="lg:hidden p-1.5 sm:p-2 rounded-xl hover:bg-blue-800/30 transition-all duration-300 backdrop-blur-sm border border-blue-700/20 cursor-pointer group ml-1 sm:ml-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6 text-blue-300 group-hover:text-white group-hover:scale-110 transition-transform" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-blue-300 group-hover:text-white group-hover:scale-110 transition-transform" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="lg:hidden bg-gradient-to-b from-slate-900 to-blue-900 border-t border-blue-700/30 backdrop-blur-xl animate-in slide-in-from-top">
          <div className="px-3 sm:px-4 pt-2 sm:pt-3 pb-3 sm:pb-4 space-y-2">
            <div className="relative mb-3 sm:mb-4 md:hidden">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-300" />
              <input
                type="text"
                value={context?.search}
                placeholder="Search products..."
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-blue-800/30 border border-blue-600/40 rounded-xl text-sm placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 backdrop-blur-sm text-white"
              />
            </div>
            {navbarItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.link}
                onClick={(e) => {
                  if (!isAuthenticated && item.name === "Sell") {
                    e.preventDefault();
                    navigate("/auth/login");
                  }
                  setIsOpen(false);
                }}
                className={({ isActive }: { isActive: boolean }) =>
                  `block px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium transition-all duration-300 relative group ${
                    isActive ? "text-white font-semibold bg-blue-800/30 rounded-lg" : "text-blue-200 hover:text-white hover:bg-blue-800/20 rounded-lg"
                  }`
                }
              >
                {({ isActive }: { isActive: boolean }) => (
                  <>
                    {item.name}
                    <span
                      className={`absolute bottom-2 left-3 sm:left-4 right-3 sm:right-4 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-300 ${
                        isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-60"
                      }`}
                    ></span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
