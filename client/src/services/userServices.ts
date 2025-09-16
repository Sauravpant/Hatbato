import { api } from "@/lib/axios";
import type { ContactForm } from "@/types/admin/types";
import type { UpdateProfile, User, UserDetails } from "@/types/auth/types";
import type { ApiResponse } from "@/types/notifications/types";

export interface UserStats {
  totalProducts: number;
  totalReportsMade: number;
  totalReviewsReceived: number;
  totalReviewsGiven: number;
  totalOrdersMade: number;
  totalOrdersReceived: number;
  productsBought: number;
}


export const submitForm = async (data: ContactForm) => {
  const response = await api.post("/user/contact", data);
  return response.data;
};

export const deactivateAccount = async () => {
  const response = await api.patch("/user/deactivate-account");
  return response.data;
};

export const deleteAccount = async () => {
  const response = await api.delete("/user/delete-user");
  return response.data;
};

export const updateProfile = async (data: UpdateProfile): Promise<User> => {
  const response = await api.patch("/user/update-details", data);
  return response.data.data.result;
};

export const updateProfilePicture = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("profilePicture", file);
  const response = await api.patch("/user/upload-picture", formData);
  return response.data.data;
};

export const deleteProfilePicture = async () => {
  const response = await api.delete("/user/delete-picture");
  return response.data;
};

export const getUserById = async (id: string): Promise<ApiResponse<UserDetails>> => {
  const response = await api.get<ApiResponse<UserDetails>>(`/user/seller/${id}`);
  return response.data;
};

export const getUserStats = async (): Promise<ApiResponse<UserStats>> => {
  const response = await api.get<ApiResponse<UserStats>>("/user/get/stats");
  return response.data;
};
