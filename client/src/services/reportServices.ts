import { api } from "@/lib/axios";
import type { Report, ApiResponse, ReportInfo } from "@/types/report/types";

export const reportUser = async (userId: string, data: ReportInfo): Promise<ApiResponse<null>> => {
  const response = await api.post<ApiResponse<null>>(`/report/user/${userId}`, data);
  return response.data;
};

export const reportProduct = async (productId: string, data: ReportInfo): Promise<ApiResponse<null>> => {
  const response = await api.post<ApiResponse<null>>(`/report/product/${productId}`, data);
  return response.data;
};

export const getAllReports = async (): Promise<ApiResponse<Report[]>> => {
  const response = await api.get<ApiResponse<Report[]>>(`/report/get-all-reports`);
  return response.data;
};

export const deleteReport = async (reportId: string): Promise<ApiResponse<null>> => {
  const response = await api.delete<ApiResponse<null>>(`/report/delete/${reportId}`);
  return response.data;
};
