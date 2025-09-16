export interface Order {
  id: string;
  createdAt: Date;
  status: "pending" | "accepted" | "rejected";
  product: {
    title: string;
    price: number;
    deliveryAvailable: boolean;
    imageUrl: string;
  };
  buyer: {
    name: string;
    contactNumber: string;
    address: string;
  };
  seller: {
    name: string;
    contactNumber: string;
    address: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: string;
  message: string;
  data: T;
}
