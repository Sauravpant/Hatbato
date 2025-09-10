import type { User } from "../../generated/prisma/index.js";

export interface ImageUpload {
  imagePath: string;
  id: string;
}

export interface UserData {
  id: string;
  name?: string;
  contact?: string;
  address?: string;
}

export interface UpdateResponse {
  result: Omit<User, "password" | "refreshToken">;
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
