import UserLayout from "@/components/layout/UserLayout";
import ForgetPassword from "@/pages/auth/ForgetPassword";
import LoginPage from "@/pages/auth/LoginPage";
import ResetPassword from "@/pages/auth/ResetPassword";
import SignupPage from "@/pages/auth/SignUpPage";
import CategoryPage from "@/pages/user/CategoryPage";
import { HeroSection } from "@/pages/user/home/HeroSection";
import Products from "@/pages/user/Products";
import { Route, Routes } from "react-router-dom";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<HeroSection />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:category" element={<Products />}></Route>
        <Route path="/category" element={<CategoryPage />} />
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
