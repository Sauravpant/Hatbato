// SettingsSidebar.tsx
import { useState, type ReactNode } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { VscAccount } from "react-icons/vsc";
import { CiUser } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const sidebarItems = [
  { name: "Profile Settings", icon: CiUser, route: "/" },
  { name: "Account Settings", icon: VscAccount, route: "account" },
];

const SettingsSidebar = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen">
      <div className={`sticky top-0 left-0 shrink-0 ${sidebarOpen ? "lg:w-64 w-15" : "w-15"} flex flex-col bg-white shadow-2xl overflow-y-auto`}>
        {sidebarOpen ? (
          <div className="flex flex-col h-full p-2 z-10">
            <div className="flex items-center justify-between space-x-2 p-2">
              <h1 className=" text-lg lg:text-xl xl:text-2xl font-bold text-blue-500 hidden lg:block">Settings</h1>
              <RxHamburgerMenu className="h-4 w-4 lg:h-5 lg:w-5 font-medium text-blue-500 hover:bg-gray-200 cursor-pointer" onClick={handleMenuClick} />
            </div>
            <div className="flex flex-col flex-1 space-y-4 p-2 mt-10 ml-2 overflow-y-auto">
              {sidebarItems.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center gap-4 hover:bg-gray-100 p-1 rounded-xl hover:text-blue-600 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.route);
                  }}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-normal text-sm xl:text-lg hidden lg:inline">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center h-full p-2">
            <RxHamburgerMenu className="h-6 w-6 font-medium text-blue-500 hover:bg-gray-200 cursor-pointer" onClick={handleMenuClick} />
            <div className="flex flex-col space-y-4 p-2 mt-10 ml-2">
              {sidebarItems.map((item) => (
                <div key={item.name} className="flex items-center gap-4 hover:bg-gray-100 p-1 rounded-xl hover:text-blue-600 cursor-pointer">
                  <item.icon className="h-5 w-5" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <main className="flex-1 overflow-y-auto p-4">{children}</main>
    </div>
  );
};

export default SettingsSidebar;
