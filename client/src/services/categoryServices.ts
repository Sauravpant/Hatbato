import { api } from "@/lib/axios";
import type { ApiResponse, CategoryDetails } from "@/types/category/types";

export const getCategory = async (): Promise<CategoryDetails[]> => {
  const response = await api.get<ApiResponse<CategoryDetails[]>>("/category/get");
  return response.data.data;
};
