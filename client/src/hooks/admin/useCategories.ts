import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCategory, getAllCategories, getCategoryDetails, updateCategory, deleteCategory } from "@/services/adminServices";
import type { ApiResponse, Category, CategoryDetails, CreateCategory, UpdateCategory } from "@/types/admin/types";

// Categories
export const useAllCategories = () =>
  useQuery<ApiResponse<Category[]>, unknown>({
    queryKey: ["allCategories"],
    queryFn: getAllCategories,
    staleTime: Infinity,
  });

export const useCategoryDetails = (categoryId: string) =>
  useQuery<ApiResponse<CategoryDetails>, unknown>({
    queryKey: ["categoryDetails", categoryId],
    queryFn: () => getCategoryDetails(categoryId),
    staleTime: Infinity,
  });

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<Category>, unknown, { data: CreateCategory }>({
    mutationFn: ({ data }: { data: CreateCategory }) => createCategory(data),
    onSuccess: (data) => {
      toast.success(data.message || "Category created successfully");
      queryClient.invalidateQueries({ queryKey: ["allCategories"] });
      queryClient.invalidateQueries({ queryKey: ["categoryDetails", data.data.id] });
      queryClient.invalidateQueries({ queryKey: ["category-info"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to create category");
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<Category>, unknown, { categoryId: string; data: UpdateCategory }>({
    mutationFn: ({ categoryId, data }) => updateCategory(categoryId, data),
    onSuccess: (data) => {
      toast.success(data.message || "Category updated successfully");
      queryClient.invalidateQueries({ queryKey: ["allCategories"] });
      queryClient.invalidateQueries({ queryKey: ["categoryDetails", data.data.id] });
      queryClient.invalidateQueries({ queryKey: ["category-info"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to update category");
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<null>, unknown, { id: string }>({
    mutationFn: ({ id }: { id: string }) => deleteCategory(id),
    onSuccess: (data) => {
      toast.success(data.message || "Category deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["allCategories"] });
      queryClient.invalidateQueries({ queryKey: ["category-info"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to delete category");
    },
  });
};
