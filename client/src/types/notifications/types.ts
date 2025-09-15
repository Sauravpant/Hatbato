export interface Notification {
  id: string;
  userId: string;
  type: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface NotificationProps {
  isAuthenticated: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: string;
  message: string;
  data: T;
}
