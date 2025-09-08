import { api } from "@/lib/axios";
import type { Notification } from "@/types/notifications/types";

export const getNotifications = async (): Promise<Notification[]> => {
  const response = await api.get("/user/notification/");
  return response.data.data;
};

export const markNotificationAsRead = async (id: string): Promise<void> => {
  await api.patch(`/user/notification/mark-read/${id}`);
};

export const markAllAsRead = async (): Promise<void> => {
  await api.patch(`/user/notification/mark-all-read`);
};
