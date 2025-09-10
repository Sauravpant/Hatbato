import { api } from "@/lib/axios";
import type { ContactForm } from "@/types/admin/types";

export const submitForm = async (data: ContactForm) => {
  const response = await api.post("/user/contact", data);
  return response.data;
};
