import { deleteQueries, getQueries } from "@/services/adminServices";
import type { Contact } from "@/types/admin/types";
import type { ApiResponse } from "@/types/admin/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetContacts = () => {
  return useQuery<ApiResponse<Contact[]>, unknown>({
    queryFn: getQueries,
    queryKey: ["contacts"],
  });
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<null>, unknown, { id: string }>({
    mutationFn: ({ id }: { id: string }) => deleteQueries(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast.success("Contact deleted successfullys");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to delete contact");
    },
  });
};
