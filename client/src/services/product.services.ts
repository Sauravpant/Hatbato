import { api } from "@/lib/axios";

export const postProduct = async (data: FormData) => {
  const response = await api.post("/user/product/create", data);
  return response.data;
};

export const getAllProducts = async (params?: Record<string, any>) => {
  const response = await api.get("/user/product", { params });
  return response.data.data;
};
