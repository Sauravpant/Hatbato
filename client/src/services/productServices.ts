import { api } from "@/lib/axios";
import type { GetItems, Product, UpdatedProduct, ApiResponse } from "@/types/product/types";

export const postProduct = async (data: FormData): Promise<ApiResponse<null>> => {
  const response = await api.post<ApiResponse<null>>("/user/product/create", data);
  return response.data;
};

export const getAllProducts = async (params?: Record<string, any>) => {
  const response = await api.get("/user/product", { params });
  return response.data.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await api.get<ApiResponse<Product>>(`/user/product/get/${id}`);
  return response.data.data;
};

export const updateProduct = async (productId: string, file: File, data: UpdatedProduct): Promise<ApiResponse<UpdatedProduct>> => {
  const formData = new FormData();
  formData.append("imagePath", file);
  Object.entries(data).forEach(([key, value]) => {
    if (value != undefined && value != null) {
      formData.append(key, value);
    }
  });
  const response = await api.patch<ApiResponse<UpdatedProduct>>(`/product/update/${productId}`, formData);
  return response.data;
};

export const deleteProduct = async (productId: string): Promise<ApiResponse<null>> => {
  const response = await api.patch<ApiResponse<null>>(`/product/delete-product/${productId}`);
  return response.data;
};

export const getMyProducts = async (): Promise<ApiResponse<GetItems[]>> => {
  const response = await api.get<ApiResponse<GetItems[]>>("/products/my-products");
  return response.data;
};
