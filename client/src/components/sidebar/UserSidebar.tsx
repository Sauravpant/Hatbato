import { useState, type ReactNode } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdHome } from "react-icons/io";
import { TbReportAnalytics } from "react-icons/tb";
import { MdOutlineRateReview } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { logoutUser } from "@/features/auth/authSlice";

const sidebarItems = [
  { name: "Home", icon: IoMdHome, route: "." },
  { name: "Products", icon: BsBoxSeam, route: "products" },
  { name: "Reports", icon: TbReportAnalytics, route: "reports" },
  { name: "Reviews", icon: MdOutlineRateReview, route: "reviews" },
  { name: "Orders", icon: BsBoxSeam, route: "orders" },
];

const UserSidebar = ({ children }: { children: ReactNode }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dotsClicked, setDotsClicked] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="flex h-screen">
      <div
        className={`h-screen sticky top-0 left-0 shrink-0 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "lg:w-64 md:w-52 w-20" : "w-20"
        } flex flex-col bg-white shadow-xl overflow-y-auto border-r border-gray-100`}
      >
        <div
          onClick={() => {
            navigate("/");
          }}
          className="flex justify-center p-3 m-1 rounded-lg bg-blue-300 hover:bg-blue-200 text-gray-600 transition-colors cursor-pointer"
        >
          <FaArrowLeft className="h-5 w-5 md:h-6 md:w-6 bg-blue-300 text-black" />
          {sidebarOpen && <p className="font-">Back to Home</p>}
        </div>
        <div className="flex items-center p-4 border-b border-gray-100">
          {sidebarOpen && <h1 className="text-xl lg:text-2xl font-bold text-blue-600 flex-1">Dashboard</h1>}
          <button onClick={handleMenuClick} className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
            <RxHamburgerMenu className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex flex-col flex-1 p-2 mt-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                navigate(item.route);
              }}
              className="flex items-center p-3 rounded-xl hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors group"
            >
              <item.icon className="h-5 w-5 md:h-6 md:w-6 flex-shrink-0" />
              {sidebarOpen && <span className="ml-3 text-sm md:text-base font-medium hidden md:inline">{item.name}</span>}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-gray-100 relative">
          <div className="flex items-center p-2 rounded-lg hover:bg-gray-50">
            <FaRegUserCircle className="h-8 w-8 md:h-9 md:w-9 text-gray-500 flex-shrink-0" />
            {sidebarOpen && (
              <div className="ml-3 hidden md:block flex-1 min-w-0">
                <p className="font-medium text-sm lg:text-base truncate">{user?.name}</p>
                <p className="text-xs lg:text-sm text-gray-500 truncate">{user?.email}</p>
              </div>
            )}
            <button onClick={() => setDotsClicked(!dotsClicked)} className="p-1 rounded-md hover:bg-gray-200 text-gray-500">
              <HiDotsVertical className="h-4 w-4 md:h-5 md:w-5" />
            </button>
          </div>
          {dotsClicked && (
            <div className="absolute bottom-full right-0 mb-2 w-48 bg-white shadow-lg rounded-lg p-2 z-10 border border-gray-200">
              <button
                className="w-full text-left p-2 text-sm hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                Profile
              </button>
              <button
                className="w-full text-left p-2 text-sm hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => {
                  navigate("/settings/account");
                }}
              >
                My Account
              </button>
              <button
                className="w-full text-left p-2 text-sm hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => {
                  navigate("/settings");
                }}
              >
                Settings
              </button>
              <hr className="my-1" />
              <button className="w-full text-left p-2 text-sm text-red-500 hover:bg-gray-100 rounded-md transition-colors" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
    </div>
  );
};

export default UserSidebar;
