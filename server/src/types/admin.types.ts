export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  registrationsOverMonth: {};
}

export interface ProductStats {
  totalProducts: number;
  unsold: number;
  productsByStatus: {};
  sold: number;
  productsByCategory: { category: string; count: number }[];
}

export interface OrderStats {
  totalOrders: number;
  acceptedOrders: number;
  rejectedOrders: number;
  ordersTrend: { date: string; count: number }[];
}

export interface CategoryStats {
  totalCategories: number;
  productsPerCategory: { category: string; count: number }[];
  mostPopularCategories: { category: string; count: number }[];
}

export interface ReportStats {
  totalReports: number;
  resolvedReports: number;
  pendingReports: number;
}

//User
export interface UserSummary {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  isVerified: boolean;
  createdAt: Date;
}

export interface GetAllUsersParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface PaginatedUsers {
  users: UserSummary[];
  total: number;
  page: number;
  limit: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  imageUrl: string;
  address: string;
  contactNumber: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  totalProducts: number;
  totalOrdersMade: number;
  totalOrdersReceived: number;
  totalReportsMade: number;
  totalReviewsGiven: number;
}
