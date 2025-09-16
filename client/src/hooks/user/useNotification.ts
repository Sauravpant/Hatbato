import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Notification } from "@/types/notifications/types";
import { getNotifications, markAllAsRead, markNotificationAsRead } from "@/services/notificationServices";
import { useAuthUser } from "./useAuthUser";

export const useGetNotifications = () => {
  const user = useAuthUser();
  return useQuery<Notification[], unknown>({
    queryFn: getNotifications,
    queryKey: ["notification", user?.id],
    enabled: !!user,
    staleTime: Infinity,
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  const user = useAuthUser();
  return useMutation<void, unknown, { id: string }>({
    mutationFn: ({ id }: { id: string }) => markNotificationAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notification", user?.id] });
    },
  });
};

export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();
  const user = useAuthUser();
  return useMutation<void, unknown, null>({
    mutationFn: markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notification", user?.id] });
    },
  });
};
