import { useEffect } from "react";
import { api } from "./lib/axios";
import { setUser } from "./features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store/store";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";
import SearchContextProvider from "./store/searchContext";
import Spinner from "./components/ui/Spinner";
import { setCheckingAuthFalse } from "./features/auth/authSlice";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const checkingAuth = useSelector((state: RootState) => state.auth.checkingAuth);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async (): Promise<void> => {
      try {
        //Hit API endpoint to fetch the user using the access token from the cookies
        const user = await api.get("/user/me");
        dispatch(setUser(user.data.data));
      } catch (err: any) {
        //Hit API endpoint to get the new access token if the refresh token exists
        try {
          const user = await api.get("/auth/refresh-token");
          dispatch(setUser(user.data.data));
        } catch (error) {
          dispatch(setCheckingAuthFalse());
          navigate("/");
        }
      }
    };
    getUser();
  }, []);

  if (checkingAuth) {
    return <Spinner />;
  }
  return (
    <SearchContextProvider>
      <AppRoutes />
      <Toaster />
    </SearchContextProvider>
  );
};

export default App;
