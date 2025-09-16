import { api } from "@/lib/axios";
import type { SellerAverage, ApiResponse, BuyerReview, SellerReview, RatingStats, CreateReview, UpdateReview } from "@/types/reviews/types";

export const createReview = async (sellerId: string,data:CreateReview): Promise<ApiResponse<null>> => {
  const response = await api.post<ApiResponse<null>>(`/review/${sellerId}`,data);
  return response.data;
};

export const updateReview = async (reviewId: string,data:UpdateReview): Promise<ApiResponse<null>> => {
  const response = await api.patch<ApiResponse<null>>(`/review/update/${reviewId}`,data);
  return response.data;
};

export const deleteReview = async (reviewId: string): Promise<ApiResponse<null>> => {
  const response = await api.delete<ApiResponse<null>>(`/review/delete/${reviewId}`);
  return response.data;
};

export const getMyGivenReviews = async (): Promise<ApiResponse<BuyerReview[]>> => {
  const response = await api.get<ApiResponse<BuyerReview[]>>(`/review/my/given`);
  return response.data;
};

export const getMyReceivedReviews = async (): Promise<ApiResponse<SellerReview[]>> => {
  const response = await api.get<ApiResponse<SellerReview[]>>(`/review/my/received`);
  return response.data;
};
export const getAverageData = async (): Promise<ApiResponse<SellerAverage>> => {
  const response = await api.get<ApiResponse<SellerAverage>>(`/review/my/average`);
  return response.data;
};

export const getMyStats = async (): Promise<ApiResponse<RatingStats>> => {
  const response = await api.get<ApiResponse<RatingStats>>(`/review/my/stats`);
  return response.data;
};
