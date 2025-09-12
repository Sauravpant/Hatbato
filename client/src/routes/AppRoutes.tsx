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
          <Route path="/sell" element={<SellProduct />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<UserSettingsLayout />}>
            <Route index element={<ProfileSettingsPage />} />
            <Route path="account" element={<AccountSettingsPage />} />
          </Route>
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
