import { Outlet } from "react-router-dom";
import AdminSidebar from "../sidebar/AdminSidebar";

const AdminLayout = () => {
  return (
    <AdminSidebar>
      <Outlet />
    </AdminSidebar>
  );
};

export default AdminLayout;
