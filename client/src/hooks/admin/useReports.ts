import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getAllReports, resolveReport, deleteReport } from "@/services/adminServices";
import type { ApiResponse, PaginatedReports, ReportParams } from "@/types/admin/types";

// Reports

//Get all reports
export const useAllReports = (params?: ReportParams) =>
  useQuery<ApiResponse<PaginatedReports>, unknown>({
    queryKey: ["allReports", params],
    queryFn: () => getAllReports(params),
    staleTime: Infinity,
  });

//Resolve a report
export const useResolveReport = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<null>, unknown, string>({
    mutationFn: resolveReport,
    onSuccess: (data) => {
      toast.success(data.message || "Report resolved successfully");
      queryClient.invalidateQueries({ queryKey: ["allReports"] });
      queryClient.invalidateQueries({ queryKey: ["reportStats"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to resolve report");
    },
  });
};

//Delete a report
export const useDeleteReport = () => {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<null>, unknown, string>({
    mutationFn: deleteReport,
    onSuccess: (data) => {
      toast.success(data.message || "Report deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["allReports"] });
      queryClient.invalidateQueries({ queryKey: ["reportStats"] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to delete report");
    },
  });
};
