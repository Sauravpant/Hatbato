import { api } from "@/lib/axios";
import type { ContactForm } from "@/types/admin/types";
import type { UpdateProfile, User } from "@/types/auth/types";

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
