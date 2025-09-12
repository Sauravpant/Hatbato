import { api } from "@/lib/axios";

export interface Report {
  reason: string;
  description: string;
}

export const reportUser = async (userId: string, data: Report): Promise<void> => {
  const response = await api.post(`/report/user/${userId}`, data);
  return response.data;
};

export const reportProduct = async (productId: string, data: Report): Promise<void> => {
  const response = await api.post(`/report/product/${productId}`, data);
  return response.data;
};

export const getAllReports = async (): Promise<void> => {
  const response = await api.get(`/report/get-all-reports`);
  return response.data;
};

export const deleteReport = async (reportId: string) => {
  const response = await api.delete(`/report/delete/${reportId}`);
  return response.data;
};
