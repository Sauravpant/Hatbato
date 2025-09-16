import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { placeOrder, acceptOrder, rejectOrder, getMyRequests, getUserOrders, cancelOrder } from "@/services/orderServices";
import type { ApiResponse, Order } from "@/types/order/types";
import toast from "react-hot-toast";
import { useAuthUser } from "./useUser";

// Fetch my order  requests
export const useMyRequests = () => {
  const user = useAuthUser();
  return useQuery<ApiResponse<Order[]>, unknown>({
    queryKey: ["myRequests", user?.id],
    queryFn: getMyRequests,
    staleTime: Infinity,
  });
};

// Fetch orders received
export const useUserOrders = () => {
  const user = useAuthUser();
  return useQuery<ApiResponse<Order[]>, unknown>({
    queryKey: ["userOrders", user?.id],
    queryFn: getUserOrders,
    staleTime: Infinity,
  });
};

// Place order
export const usePlaceOrder = () => {
  const queryClient = useQueryClient();
  const user = useAuthUser();
  return useMutation<ApiResponse<null>, unknown, { productId: string }>({
    mutationFn: ({ productId }: { productId: string }) => placeOrder(productId),
    onSuccess: (data) => {
      toast.success(data.message || "Order placed successfully");
      queryClient.invalidateQueries({ queryKey: ["myRequests", user?.id] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to place order");
    },
  });
};

// Accept order
export const useAcceptOrder = () => {
  const user = useAuthUser();
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<null>, unknown, { orderId: string }>({
    mutationFn: ({ orderId }: { orderId: string }) => acceptOrder(orderId),
    onSuccess: (data) => {
      toast.success(data.message || "Order accepted successfully");
      queryClient.invalidateQueries({ queryKey: ["userOrders", user?.id] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to accept order");
    },
  });
};

// Reject order
export const useRejectOrder = () => {
  const user = useAuthUser();
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<null>, unknown, { orderId: string }>({
    mutationFn: ({ orderId }: { orderId: string }) => rejectOrder(orderId),
    onSuccess: (data) => {
      toast.success(data.message || "Order rejected successfully");
      queryClient.invalidateQueries({ queryKey: ["userOrders", user?.id] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to reject order");
    },
  });
};

//Canel Order
export const useCancelOrder = () => {
  const user = useAuthUser();
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<null>, unknown, { orderId: string }>({
    mutationFn: ({ orderId }: { orderId: string }) => cancelOrder(orderId),
    onSuccess: (data) => {
      toast.success(data.message || "Order canceled successfully");
      queryClient.invalidateQueries({ queryKey: ["myRequests", user?.id] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to cancel order");
    },
  });
};
