import { useQuery } from "@tanstack/react-query";
import { getUserStats, getProductStats, getOrderStats, getReportStats, getCategoryInfo } from "@/services/adminServices";
import type { ApiResponse, UserStats, ProductStats, OrderStats, ReportStats, CategoryInfo } from "@/types/admin/types";

// Dashboard Hooks
export const useUserStats = () =>
  useQuery<ApiResponse<UserStats>, unknown>({
    queryKey: ["userStats"],
    queryFn: getUserStats,
    staleTime: Infinity,
  });

export const useProductStats = () =>
  useQuery<ApiResponse<ProductStats>, unknown>({
    queryKey: ["productStats"],
    queryFn: getProductStats,
    staleTime: Infinity,
  });

export const useOrderStats = () =>
  useQuery<ApiResponse<OrderStats>, unknown>({
    queryKey: ["orderStats"],
    queryFn: getOrderStats,
    staleTime: Infinity,
  });

export const useReportStats = () =>
  useQuery<ApiResponse<ReportStats>, unknown>({
    queryKey: ["reportStats"],
    queryFn: getReportStats,
    staleTime: Infinity,
  });

export const useCategoryInfo = () => {
  return useQuery<ApiResponse<CategoryInfo[]>, unknown>({
    queryKey: ["category-info"],
    queryFn: getCategoryInfo,
    staleTime: Infinity,
  });
};
