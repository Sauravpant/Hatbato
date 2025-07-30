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
