export interface Order {
  id: string;
  createdAt: true;
  status: true;
  product: {
    title: string;
    price: number;
    deliveryAvailable: boolean;
    isBought: boolean;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: string;
  message: string;
  data: T;
}
