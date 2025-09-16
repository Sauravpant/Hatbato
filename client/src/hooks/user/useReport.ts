import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { reportUser, reportProduct, getAllReports, deleteReport } from "@/services/reportServices";
import type { Report, ApiResponse, ReportInfo } from "@/types/report/types";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

const useAuthUser = () => useSelector((state: RootState) => state.auth.user);

// Get my reports
export const useAllReports = () => {
  const user = useAuthUser();
  return useQuery<ApiResponse<Report[]>, unknown>({
    queryFn: getAllReports,
    queryKey: ["get-reports", user?.id],
    staleTime: Infinity,
    enabled: !!user,
  });
};

// Report user
export const useReportUser = () => {
  const queryClient = useQueryClient();
  const user = useAuthUser();
  return useMutation<ApiResponse<null>, unknown, { userId: string; data: ReportInfo }>({
    mutationFn: ({ userId, data }: { userId: string; data: ReportInfo }) => reportUser(userId, data),
    onSuccess: (data) => {
      toast.success(data.message || "User reported Successfully");
      queryClient.invalidateQueries({ queryKey: ["get-reports", user?.id] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to report user");
    },
  });
};

// Report product
export const useReportProduct = () => {
  const queryClient = useQueryClient();
  const user = useAuthUser();
  return useMutation<ApiResponse<null>, unknown, { productId: string; data: ReportInfo }>({
    mutationFn: ({ productId, data }: { productId: string; data: ReportInfo }) => reportProduct(productId, data),
    onSuccess: (data) => {
      toast.success(data.message || "Product reported Successfully");
      queryClient.invalidateQueries({ queryKey: ["get-reports", user?.id] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to report Product");
    },
  });
};

// Delete report
export const useDeleteReport = () => {
  const queryClient = useQueryClient();
  const user = useAuthUser();
  return useMutation<ApiResponse<null>, unknown, { reportId: string }>({
    mutationFn: ({ reportId }: { reportId: string }) => deleteReport(reportId),
    onSuccess: (data) => {
      toast.success(data.message || "Report deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["get-reports", user?.id] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to delete Report");
    },
  });
};
