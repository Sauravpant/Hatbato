import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllProducts, getProductById, updateProduct, deleteProduct, getMyProducts } from "@/services/productServices";
import type { ApiResponse, GetItems, Product, UpdatedProduct, UpdateProduct } from "@/types/product/types";
import toast from "react-hot-toast";
import { useAuthUser } from "./useUser";

// Fetch all products
export const useAllProducts = (params?: Record<string, any>) => {
  return useQuery<Product[], unknown>({
    queryKey: ["all-products", params],
    queryFn: () => getAllProducts(params),
    staleTime: Infinity,
  });
};

// Fetch a product by ID
export const useProductById = (id: string) => {
  return useQuery<Product, unknown>({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });
};

// Fetch  products listed by me
export const useMyProducts = () => {
  const user = useAuthUser();
  return useQuery<ApiResponse<GetItems[]>, unknown>({
    queryKey: ["my-products", user?.id],
    queryFn: getMyProducts,
  });
};

// Update product
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const user = useAuthUser();
  return useMutation<ApiResponse<UpdatedProduct>, unknown, { productId: string; file: File | null; data: UpdateProduct }>({
    mutationFn: ({ productId, file, data }: { productId: string; file: File | null; data: UpdateProduct }) => updateProduct(productId, file, data),
    onSuccess: (data) => {
      toast.success(data.message || "Product updated successfully");
      queryClient.invalidateQueries({ queryKey: ["all-products"] });
      queryClient.invalidateQueries({ queryKey: ["my-products", user?.id] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to update product");
    },
  });
};

// Delete product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const user = useAuthUser();
  return useMutation<ApiResponse<null>, unknown, { productId: string }>({
    mutationFn: ({ productId }: { productId: string }) => deleteProduct(productId),
    onSuccess: (data) => {
      toast.success(data.message || "Product deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["all-products"] });
      queryClient.invalidateQueries({ queryKey: ["my-products", user?.id] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to delete product");
    },
  });
};
