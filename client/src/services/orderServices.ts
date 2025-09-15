import { api } from "@/lib/axios";
import type { Order, ApiResponse } from "@/types/order/types.ts";

export const placeOrder = async (productId: string): Promise<ApiResponse<null>> => {
  const response = await api.post<ApiResponse<null>>(`order/request/${productId}`);
  return response.data;
};

export const acceptOrder = async (orderId: string): Promise<ApiResponse<null>> => {
  const response = await api.patch<ApiResponse<null>>(`/order/request/accept/${orderId}`);
  return response.data;
};

export const rejectOrder = async (orderId: string): Promise<ApiResponse<null>> => {
  const response = await api.patch<ApiResponse<null>>(`/order/request/reject/${orderId}`);
  return response.data;
};

export const getMyRequests = async (): Promise<ApiResponse<Order[]>> => {
  const response = await api.get<ApiResponse<Order[]>>("/order/request/my");
  return response.data;
};
export const getUserOrders = async (): Promise<ApiResponse<Order[]>> => {
  const response = await api.get<ApiResponse<Order[]>>("/order/request/received");
  return response.data;
};

export const cancelOrder = async (orderId: string): Promise<ApiResponse<null>> => {
  const response = await api.delete<ApiResponse<null>>(`/order/request/delete/${orderId}`);
  return response.data;
};
