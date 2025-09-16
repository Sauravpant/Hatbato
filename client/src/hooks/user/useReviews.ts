import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createReview,
  updateReview,
  deleteReview,
  getMyGivenReviews,
  getMyReceivedReviews,
  getAverageData,
  getMyStats,
} from "@/services/reviewServices";
import type { BuyerReview, SellerReview, SellerAverage, RatingStats, ApiResponse, CreateReview, UpdateReview } from "@/types/reviews/types";
import toast from "react-hot-toast";
import { useAuthUser } from "./useUser";
//Get given reviews
export const useMyGivenReviews = () => {
  const user = useAuthUser();
  return useQuery<ApiResponse<BuyerReview[]>, unknown>({
    queryKey: ["myGivenReviews", user?.id],
    queryFn: getMyGivenReviews,
    staleTime: Infinity,
  });
};

//Get received reviews
export const useMyReceivedReviews = () => {
  const user = useAuthUser();
  return useQuery<ApiResponse<SellerReview[]>, unknown>({
    queryKey: ["myReceivedReviews", user?.id],
    queryFn: getMyReceivedReviews,
    staleTime: Infinity,
  });
};

//Get average data
export const useAverageData = () => {
  return useQuery<ApiResponse<SellerAverage>, unknown>({
    queryKey: ["myAverage"],
    queryFn: getAverageData,
    staleTime: Infinity,
  });
};

//Get stats
export const useMyStats = () => {
  return useQuery<ApiResponse<RatingStats>, unknown>({
    queryKey: ["myStats"],
    queryFn: getMyStats,
    staleTime: Infinity,
  });
};

// Post a review
export const useCreateReview = () => {
  const queryClient = useQueryClient();
  const user = useAuthUser();
  return useMutation<ApiResponse<null>, unknown, { sellerId: string; data: CreateReview }>({
    mutationFn: ({ sellerId, data }: { sellerId: string; data: CreateReview }) => createReview(sellerId, data),
    onSuccess: (data) => {
      toast.success(data.message || "Review created successfully");
      queryClient.invalidateQueries({ queryKey: ["myGivenReviews", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["user-details"] });
      queryClient.invalidateQueries({ queryKey: ["myReceivedReviews", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["myAverage", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["myStats", user?.id] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to create review");
    },
  });
};

//Update a review
export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  const user = useAuthUser();
  return useMutation<ApiResponse<null>, unknown, { reviewId: string; data: UpdateReview }>({
    mutationFn: ({ reviewId, data }: { reviewId: string; data: UpdateReview }) => updateReview(reviewId, data),
    onSuccess: (data) => {
      toast.success(data.message || "Review updated successfully");
      queryClient.invalidateQueries({ queryKey: ["myGivenReviews", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["myReceivedReviews", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["user-details"] });
      queryClient.invalidateQueries({ queryKey: ["myAverage", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["myStats", user?.id] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to update review");
    },
  });
};

//Delete a review
export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  const user = useAuthUser();
  return useMutation<ApiResponse<null>, unknown, { reviewId: string }>({
    mutationFn: ({ reviewId }: { reviewId: string }) => deleteReview(reviewId),
    onSuccess: (data) => {
      toast.success(data.message || "Review deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["myGivenReviews", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["myReceivedReviews", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["user-details"] });
      queryClient.invalidateQueries({ queryKey: ["myAverage", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["myStats", user?.id] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to delete review");
    },
  });
};
