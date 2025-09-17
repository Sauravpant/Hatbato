import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getAllUsers, getUserById, deleteUser } from "@/services/adminServices";
import type { ApiResponse, PaginatedUsers, UserProfile, UserParams } from "@/types/admin/types";

// Users
export const useAllUsers = (params?: UserParams) =>
  useQuery<ApiResponse<PaginatedUsers>, unknown>({
    queryKey: ["allUsers", params],
    queryFn: () => getAllUsers(params),
    staleTime: Infinity,
  });

export const useUserById = (userId: string) =>
  useQuery<ApiResponse<UserProfile>, unknown>({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    staleTime: Infinity,
  });

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<null>, unknown, { id: string }>({
    mutationFn: ({ id }: { id: string }) => deleteUser(id),
    onSuccess: (data) => {
      toast.success(data.message || "User deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
      queryClient.invalidateQueries({ queryKey: ["userStats"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to delete user");
    },
  });
};
