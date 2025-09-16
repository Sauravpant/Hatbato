import { Outlet } from "react-router-dom";
import UserSidebar from "../sidebar/UserSidebar";

const UserDashboardLayout = () => {
  return (
    <UserSidebar>
      <Outlet />
    </UserSidebar>
  );
};

export default UserDashboardLayout;
