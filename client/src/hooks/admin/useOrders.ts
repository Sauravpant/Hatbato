import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "@/services/adminServices";
import type { ApiResponse, PaginatedOrders, OrderParams } from "@/types/admin/types";

// Get all Orders
export const useAllOrders = (params?: OrderParams) =>
  useQuery<ApiResponse<PaginatedOrders>, unknown>({
    queryKey: ["allOrders", params],
    queryFn: () => getAllOrders(params),
    staleTime: Infinity,
  });
