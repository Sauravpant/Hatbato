import { api } from "@/lib/axios";
import type { Product } from "@/types/product/types";

export const postProduct = async (data: FormData) => {
  const response = await api.post("/user/product/create", data);
  return response.data;
};

export const getAllProducts = async (params?: Record<string, any>) => {
  const response = await api.get("/user/product", { params });
  return response.data.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await api.get(`/user/product/get/${id}`);
  return response.data.data;
};
