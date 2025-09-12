import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ allowedRole }: { allowedRole: string }) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace={true} state={{ from: location }} />;
  }

  if (allowedRole !== user?.role) {
    return <Navigate to="/" replace={true} />;
  }

  return <Outlet />;
};
