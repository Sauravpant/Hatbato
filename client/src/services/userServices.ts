import { api } from "@/lib/axios";
import type { ContactForm } from "@/types/admin/types";

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
