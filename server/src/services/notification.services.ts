import { prisma } from "../db/config";
import type { Notification } from "../../generated/prisma/index.js";
import { AppError } from "../utils/app-error";

export const getNotifications = async (id: string): Promise<Notification[]> => {
  const notifications = await prisma.notification.findMany({
    where: {
      userId: id,
      read: false,
    },
  });
  return notifications;
};

export const markAsRead = async (id: string, userId: string): Promise<void> => {
  const notification = await prisma.notification.findUnique({
    where: {
      id,
    },
  });
  if (!notification) {
    throw new AppError(404, "Notification not found");
  }
  if (notification.userId !== userId) {
    throw new AppError(403, "Unauthorized to modify this notification");
  }
  await prisma.notification.update({
    where: {
      id,
    },
    data: {
      read: true,
    },
  });
};

export const markAllAsRead = async (userId: string): Promise<void> => {
  await prisma.notification.updateMany({
    where: {
      userId: userId,
      read: false,
    },
    data: {
      read: true,
    },
  });
};
