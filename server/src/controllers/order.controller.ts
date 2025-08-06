import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler.ts";
import { cancelOrder, createOrder, getOrdersByBuyer, getOrdersBySeller, updateOrderStatus } from "../services/order.services.ts";
import { ApiResponse } from "../utils/api-response.ts";
import { User } from "../../generated/prisma/index.js";

interface AuthenticatedRequest extends Request {
  user: User;
}

export const createBuyRequest = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { productId } = req.params;
  const userId = req.user.id;
  await createOrder({ productId, userId });
  res.status(201).json(new ApiResponse(201, null, "Buy request created successfully"));
});

export const getMyRequests = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user.id;
  const orders = await getOrdersByBuyer(userId);
  res.status(200).json(new ApiResponse(200, orders, "Order requests fetched succefully"));
});

export const getReceivedRequests = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user.id;
  const orders = await getOrdersBySeller(userId);
  res.status(200).json(new ApiResponse(200, orders, "Order requests fetched succefully"));
});

export const acceptOrder = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { orderId } = req.params;
  await updateOrderStatus({ orderId, userId: req.user.id, status: "accepted" });
  res.status(200).json(new ApiResponse(200, null, "Order accepted successfully"));
});

export const rejectOrder = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { orderId } = req.params;
  await updateOrderStatus({ orderId, userId: req.user.id, status: "rejected" });
  res.status(200).json(new ApiResponse(200, null, "Order rejected successfully"));
});

export const cancelOrderRequest = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { orderId } = req.params;
  await cancelOrder(orderId, req.user.id);
  res.status(200).json(new ApiResponse(200, null, "Order cancelled successfully"));
});
