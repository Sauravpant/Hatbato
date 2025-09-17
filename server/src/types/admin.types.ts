import { Category, Prisma } from "../../generated/prisma/index.js";

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
  totalPages:number;
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

export interface CategoryDetails {
  category: Category;
  totalProducts: number;
  soldProducts: number;
  unsoldProducts: number;
}

//Review
export interface PaginatedReviews {
  data: ReviewItem[];
  total: number;
  page: number;
  totalPages: number;
}

export interface ReviewItem {
  id: string;
  rating: number;
  comment?: string;
  reviewer: {
    id: string;
    name: string;
  };
  seller: {
    id: string;
    name: string;
  };
  createdAt: Date;
}

//Order Types
export interface OrderFilters {
  page?: number;
  limit?: number;
  status?: "pending" | "accepted" | "rejected";
  sortOrder?: "asc" | "desc";
}

export interface PaginatedOrders {
  data: OrderItem[];
  total: number;
  page: number;
  totalPages: number;
}

export interface OrderItem {
  id: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: Date;
  product: {
    id: string;
    title: string;
  };
  buyer: {
    id: string;
    name: string;
  };
  seller: {
    id: string;
    name: string;
  };
}

export interface PaginatedReports {
  data: ReportItem[];
  total: number;
  page: number;
  totalPages: number;
}

export interface ReportItem {
  id: string;
  reason: string;
  description: string;
  reportFor: "user" | "product";
  status: "pending" | "resolved";
  createdAt: Date;
  reportedBy: {
    id: string;
    name: string;
  };
  reportedUser?: {
    id: string;
    name: string;
  };
  reportedProduct?: {
    id: string;
    title: string;
  };
}

export type CategoryInfo = Prisma.CategoryGetPayload<{
  select: {
    name: true;
    id: true;
    slug: true;
    products: {
      select: {
        id: true;
      };
    };
  };
}>;
