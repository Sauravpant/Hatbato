import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteProduct } from "@/services/adminServices";
import type { ApiResponse } from "@/types/admin/types";

// Products
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<null>, unknown, string>({
    mutationFn: deleteProduct,
    onSuccess: (data) => {
      toast.success(data.message || "Product deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["allProducts"] });
      queryClient.invalidateQueries({ queryKey: ["productStats"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to delete product");
    },
  });
};
