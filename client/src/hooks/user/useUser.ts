import { getUserById, getUserStats, type UserStats } from "@/services/userServices";
import type { RootState } from "@/store/store";
import type { UserDetails } from "@/types/auth/types";
import type { ApiResponse } from "@/types/notifications/types";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useAuthUser = () => useSelector((state: RootState) => state.auth.user);

export const useGetUser = (id: string) => {
  return useQuery<ApiResponse<UserDetails>, unknown>({
    queryKey: ["user-details", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
};

export const useGetUserStats = () => {
  const user = useAuthUser();
  return useQuery<ApiResponse<UserStats>, unknown>({
    queryKey: ["get-stats", user?.id],
    queryFn: getUserStats,
    enabled: !!user?.id,
    staleTime: Infinity,
  });
};
