export interface ContactForm {
  name: string;
  email: string;
  contact: string;
  category: string;
  message: string;
}
export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  registrationsOverMonth: { date: string; count: number }[];
}

export interface ProductStats {
  totalProducts: number;
  unsold: number;
  sold: number;
  productsByStatus: Record<string, number>;
  productsByCategory: { category: string; count: number }[];
}

export interface OrderStats {
  totalOrders: number;
  acceptedOrders: number;
  rejectedOrders: number;
  ordersTrend: Record<string, number>;
}

export interface ReportStats {
  totalReports: number;
  resolvedReports: number;
  pendingReports: number;
}

export interface UserSummary {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  imageUrl: string;
  address: string;
  isActive: boolean;
  isVerified: boolean;
  createdAt: string;
}

export interface PaginatedUsers {
  users: UserSummary[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UserProfile extends UserSummary {
  role: string;
  imageUrl: string;
  address: string;
  contactNumber: string;
  totalProducts: number;
  totalOrdersMade: number;
  totalOrdersReceived: number;
  totalReportsMade: number;
  totalReviewsGiven: number;
}

export interface Category {
  id: string;
  description: string;
  name: string;
  slogan: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCategory {
  description: string;
  name: string;
  slogan: string;
  slug: string;
}
export interface UpdateCategory {
  description?: string;
  name?: string;
  slogan?: string;
  slug?: string;
}

export interface CategoryDetails {
  category: Category;
  totalProducts: number;
  soldProducts: number;
  unsoldProducts: number;
}

export interface ReviewItem {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
  reviewer: { id: string; name: string };
  seller: { id: string; name: string };
}

export interface PaginatedReviews {
  data: ReviewItem[];
  total: number;
  page: number;
  totalPages: number;
}

export interface OrderItem {
  id: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
  product: { id: string; title: string };
  buyer: { id: string; name: string };
  seller: { id: string; name: string };
}

export interface PaginatedOrders {
  data: OrderItem[];
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
  createdAt: string;
  reportedBy: { id: string; name: string };
  reportedUser?: { id: string; name: string };
  reportedProduct?: { id: string; title: string };
}

export interface PaginatedReports {
  data: ReportItem[];
  total: number;
  page: number;
  totalPages: number;
}

export interface ReportParams {
  page?: string;
  limit?: string;
  status?: "pending" | "resolved";
  reportFor?: "user" | "product";
}

export interface OrderParams {
  page?: string;
  limit?: string;
  status?: "pending" | "accepted" | "rejected";
  sortOrder?: "asc" | "desc";
}

export interface ReviewsParams {
  page?: string;
  limit?: string;
  userName?: string;
  sortOrder?: "asc" | "desc";
}

export interface UserParams {
  page?: string;
  limit?: string;
  search?: string;
}
export interface CategoryProduct {
  id: string;
}

export interface CategoryInfo {
  id: string;
  name: string;
  slug: string;
  products: CategoryProduct[];
}

export interface Contact {
  name: string;
  id: string;
  message: string;
  contact: string;
  email: string;
  category: "general_enquiry" | "report_an_issue" | "partnership";
}

export interface ProductSearch {
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: "asc" | "desc";
  status?: "new" | "like_new" | "used" | "refurbished" | "damaged" | "for_parts";
  category?: string;
  page?: string;
  limit?: string;
}
