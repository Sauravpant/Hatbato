import { api } from "@/lib/axios";
import type { LoginData, RegisterData, ResetPassword, User } from "@/types/auth/types";

export const login = async (data: LoginData): Promise<User> => {
  const response = await api.post("/auth/login", data);
  return response.data.data;
};

export const logout = async (): Promise<void> => {
  api.post("/auth/logout");
};

export const signup = async (data: RegisterData): Promise<any> => {
  const response = await api.post("/auth/register-user", data);
  return response.data;
};

export const forgetPassword = async (email: string): Promise<any> => {
  const response = await api.post("/user/forget-password", { email });
  return response.data;
};

export const resetPassword = async (data: ResetPassword): Promise<any> => {
  const response = await api.patch("/user/reset-password", data);
  return response.data;
};
