export interface Report {
  id: string;
  createdAt: Date;
  status: "pending" | "resolved";
  description: string;
  reason: string;
  reportFor: "user" | "product";
  reportedById: string;
  reportedProductId: string | null;
  reportedUserId: string | null;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: string;
  message: string;
  data: T;
}

export interface ReportInfo {
  reason: string;
  description: string;
}

