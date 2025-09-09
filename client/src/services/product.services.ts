import { api } from "@/lib/axios";

export const postProduct = async (data: FormData) => {
  const response = await api.post("/user/product/create", data);
  return response.data;
};
