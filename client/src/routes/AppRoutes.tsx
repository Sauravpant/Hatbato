import UserLayout from "@/components/layout/UserLayout";
import ForgetPassword from "@/pages/auth/ForgetPassword";
import LoginPage from "@/pages/auth/LoginPage";
import ResetPassword from "@/pages/auth/ResetPassword";
import SignupPage from "@/pages/auth/SignUpPage";
import CategoryPage from "@/pages/user/CategoryPage";
import Products from "@/pages/user/Products";
import SellProduct from "@/pages/user/SellProduct";
import ProductDetails from "@/pages/user/ProductDetails";
import { Route, Routes } from "react-router-dom";
import ContactSection from "@/pages/user/ContactSection";
import HomePage from "@/pages/user/HomePage";
import { ProtectedRoute } from "./ProtectedRoutes";
import ProfilePage from "@/pages/user/ProfilePage";
import UserSettingsLayout from "@/components/layout/UserSettingsLayout";
import ProfileSettingsPage from "@/pages/user/ProfileSettingsPage";
import AccountSettingsPage from "@/pages/user/AccountSettingsPage";
import UserDashboardLayout from "@/components/layout/UserDashboardLayout";
import Home from "@/pages/user/dashboard/Home";
import OrderManagement from "@/pages/user/dashboard/OrderManagement";
import ReportsManagement from "@/pages/user/dashboard/ReportsManagement";
import ReviewManagement from "@/pages/user/dashboard/ReviewManagement";
import ProductManagement from "@/pages/user/dashboard/ProductManagement";
import SellerDetails from "@/pages/user/SellerDetails";
import AdminLayout from "@/components/layout/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import Users from "@/pages/admin/Users";
import Contacts from "@/pages/admin/Contacts";
import Reports from "@/pages/admin/Reports";
import ProductsPage from "@/pages/admin/Products";
import Orders from "@/pages/admin/Orders";
import Reviews from "@/pages/admin/Reviews";
import Categories from "@/pages/admin/Categories";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />}></Route>
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/contact" element={<ContactSection />} />
      </Route>

      {/* User Protected Routes */}
      <Route element={<UserLayout />}>
        <Route element={<ProtectedRoute allowedRole="user" />}>
          <Route path="/seller/:id" element={<SellerDetails />} />
          <Route path="/sell" element={<SellProduct />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<UserSettingsLayout />}>
            <Route index element={<ProfileSettingsPage />} />
            <Route path="account" element={<AccountSettingsPage />} />
          </Route>
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRole="user" />}>
        <Route path="/user/dashboard" element={<UserDashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="reviews" element={<ReviewManagement />} />
          <Route path="reports" element={<ReportsManagement />} />
          <Route path="orders" element={<OrderManagement />} />
        </Route>
      </Route>

      {/*Admin Routes*/}
      <Route element={<ProtectedRoute allowedRole="admin" />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="reports" element={<Reports />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="orders" element={<Orders />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="categories" element={<Categories />} />
        </Route>
      </Route>

      {/* Authentication Routes */}
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/signup" element={<SignupPage />} />
      <Route path="/auth/forget-password" element={<ForgetPassword />} />
      <Route path="/auth/reset-password" element={<ResetPassword />} />
    </Routes>
  );
};

export default AppRoutes;
