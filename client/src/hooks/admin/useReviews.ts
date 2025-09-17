import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getAllReviews, deleteReview } from "@/services/adminServices";
import type { ApiResponse, PaginatedReviews, ReviewsParams } from "@/types/admin/types";

// Reviews
export const useAllReviews = (params?: ReviewsParams) =>
  useQuery<ApiResponse<PaginatedReviews>, unknown>({
    queryKey: ["allReviews", params],
    queryFn: () => getAllReviews(params),
    staleTime: Infinity,
  });

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<null>, unknown, string>({
    mutationFn: deleteReview,
    onSuccess: (data) => {
      toast.success(data.message || "Review deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["allReviews"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to delete review");
    },
  });
};
