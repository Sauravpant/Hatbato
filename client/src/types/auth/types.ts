export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  imageUrl: string;
  address: string;
  contactNumber: string;
  isActive: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  contactNumber: string;
  address: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  checkingAuth: boolean;
  error: string | null;
}

export interface ResetPassword {
  email: string;
  otp: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface UpdateProfile {
  name?: string;
  contactNumber?: string;
  address?: string;
}

export interface UserDetails {
  id:string;
  name: string;
  contactNumber: string;
  email: string;
  address: string;
  isVerified: boolean;
  totalProducts: number;
  averageRating: number;
  imageUrl?: string | null;
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
