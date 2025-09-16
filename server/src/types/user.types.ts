import type { User } from "../../generated/prisma/index.js";

export interface ImageUpload {
  imagePath: string;
  id: string;
}

export interface UserData {
  id: string;
  name?: string;
  contactNumber?: string;
  address?: string;
}

export interface UpdateResponse {
  result: Omit<User, "password" | "refreshToken" | "imagePublicId">;
}

export interface ResetPassword {
  email: string;
  newPassword: string;
  confirmNewPassword: string;
  otp: string;
}

export interface ContactForm {
  name: string;
  email: string;
  contact: string;
  category: "general_enquiry" | "report_an_issue" | "partnership";
  message: string;
}

export interface SellerDetails {
  id: string;
  name: string;
  contactNumber: string;
  email: string;
  address: string;
  isVerified: boolean;
  imageUrl: string | null;
  totalProducts: number;
  averageRating: number;
  reviews: {
    id: string;
    rating: number;
    comment?: string | null;
    createdAt: Date;
    reviewer: {
      id: string;
      name: string;
      imageUrl?: string | null;
    };
  }[];
}

export interface UserStats {
  totalProducts: number;
  totalReportsMade: number;
  totalReviewsReceived: number;
  totalReviewsGiven: number;
  totalOrdersMade: number;
  totalOrdersReceived: number;
  productsBought: number;
}
