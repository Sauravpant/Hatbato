import { api } from "@/lib/axios";
import type {
  ApiResponse,
  UserStats,
  ProductStats,
  OrderStats,
  ReportStats,
  PaginatedUsers,
  UserProfile,
  Category,
  CategoryDetails,
  PaginatedReviews,
  PaginatedOrders,
  PaginatedReports,
  ReportParams,
  OrderParams,
  ReviewsParams,
  UserParams,
  CategoryInfo,
  Contact,
  CreateCategory,
  UpdateCategory,
} from "@/types/admin/types";

// Dashboard APIs
export const getUserStats = async (): Promise<ApiResponse<UserStats>> => {
  const response = await api.get<ApiResponse<UserStats>>("/admin/stats/user");
  return response.data;
};

export const getProductStats = async (): Promise<ApiResponse<ProductStats>> => {
  const response = await api.get<ApiResponse<ProductStats>>("/admin/stats/product");
  return response.data;
};

export const getOrderStats = async (): Promise<ApiResponse<OrderStats>> => {
  const response = await api.get<ApiResponse<OrderStats>>("/admin/stats/order");
  return response.data;
};

export const getReportStats = async (): Promise<ApiResponse<ReportStats>> => {
  const response = await api.get<ApiResponse<ReportStats>>("/admin/stats/report");
  return response.data;
};

export const getCategoryInfo = async (): Promise<ApiResponse<CategoryInfo[]>> => {
  const response = await api.get<ApiResponse<CategoryInfo[]>>("/admin/get-category-info");
  return response.data;
};

// User APIs
export const getAllUsers = async (params?: UserParams): Promise<ApiResponse<PaginatedUsers>> => {
  const response = await api.get<ApiResponse<PaginatedUsers>>("/admin/get-user/all", { params });
  return response.data;
};

export const getUserById = async (userId: string): Promise<ApiResponse<UserProfile>> => {
  const response = await api.get<ApiResponse<UserProfile>>(`/admin/get-user/${userId}`);
  return response.data;
};

export const deleteUser = async (userId: string): Promise<ApiResponse<null>> => {
  const response = await api.delete<ApiResponse<null>>(`/admin/delete-user/${userId}`);
  return response.data;
};

// Category APIs
export const createCategory = async (data: CreateCategory): Promise<ApiResponse<Category>> => {
  const response = await api.post<ApiResponse<Category>>("/admin/create-category", data);
  return response.data;
};

export const getAllCategories = async (): Promise<ApiResponse<Category[]>> => {
  const response = await api.get<ApiResponse<Category[]>>("/admin/get-all-category");
  return response.data;
};

export const getCategoryDetails = async (categoryId: string): Promise<ApiResponse<CategoryDetails>> => {
  const response = await api.get<ApiResponse<CategoryDetails>>(`/admin/get-single-category/${categoryId}`);
  return response.data;
};

export const updateCategory = async (categoryId: string, data: UpdateCategory): Promise<ApiResponse<Category>> => {
  const response = await api.patch<ApiResponse<Category>>(`/admin/update-category/${categoryId}`, data);
  return response.data;
};

export const deleteCategory = async (categoryId: string): Promise<ApiResponse<null>> => {
  const response = await api.delete<ApiResponse<null>>(`/admin/delete-category/${categoryId}`);
  return response.data;
};

// Product APIs
export const getProducts = async (params?: Record<string, any>) => {
  const response = await api.get("/admin/product", { params });
  return response.data.data;
}; 
export const deleteProduct = async (productId: string): Promise<ApiResponse<null>> => {
  const response = await api.delete<ApiResponse<null>>(`/admin/delete-product/${productId}`);
  return response.data;
};

// Review APIs
export const getAllReviews = async (params?: ReviewsParams): Promise<ApiResponse<PaginatedReviews>> => {
  const response = await api.get<ApiResponse<PaginatedReviews>>("/admin/get-all-reviews", { params });
  return response.data;
};

export const deleteReview = async (reviewId: string): Promise<ApiResponse<null>> => {
  const response = await api.delete<ApiResponse<null>>(`/admin/delete-review/${reviewId}`);
  return response.data;
};

// Order APIs
export const getAllOrders = async (params?: OrderParams): Promise<ApiResponse<PaginatedOrders>> => {
  const response = await api.get<ApiResponse<PaginatedOrders>>("/admin/get-all-orders", { params });
  return response.data;
};

// Report APIs
export const getAllReports = async (params?: ReportParams): Promise<ApiResponse<PaginatedReports>> => {
  const response = await api.get<ApiResponse<PaginatedReports>>("/admin/get-all-reports", { params });
  return response.data;
};

export const resolveReport = async (reportId: string): Promise<ApiResponse<null>> => {
  const response = await api.patch<ApiResponse<null>>(`/admin/resolve-report/${reportId}`);
  return response.data;
};

export const deleteReport = async (reportId: string): Promise<ApiResponse<null>> => {
  const response = await api.delete<ApiResponse<null>>(`/admin/delete-report/${reportId}`);
  return response.data;
};

//Contact APIs
export const getQueries = async (): Promise<ApiResponse<Contact[]>> => {
  const response = await api.get<ApiResponse<Contact[]>>("/admin/contacts");
  return response.data;
};

export const deleteQueries = async (id: string): Promise<ApiResponse<null>> => {
  const response = await api.delete<ApiResponse<null>>(`/admin/delete-contact/${id}`);
  return response.data;
};
