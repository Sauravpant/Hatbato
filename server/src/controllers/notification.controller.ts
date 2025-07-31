import { Request, Response } from "express";
import { ApiResponse } from "../utils/api-response.ts";
import { User } from "../../generated/prisma/index.js";
import { asyncHandler } from "../utils/async-handler.ts";
import { getNotifications, markAllAsRead, markAsRead } from "../services/notification.services.ts";

interface AuthenticatedRequest extends Request {
  user: User;
}

export const getAllNotificatons = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const notifications = await getNotifications(req.user.id);
  return res.status(200).json(new ApiResponse(200, notifications, "Notifications fetched successfully"));
});

export const markNotificationAsRead = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const { id } = req.params;
  const userId = req.user.id;
  await markAsRead(id, userId);
  return res.status(200).json(new ApiResponse(200, {}, "Notification marked as read"));
});

export const markAllNotificationsAsRead = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const userId = req.user.id;
  await markAllAsRead(userId);
  return res.status(200).json(new ApiResponse(200, {}, "All notifications marked as read"));
});
