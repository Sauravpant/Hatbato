export type CreateOrder = {
  productId: string;
  userId: string;
};

export type UpdateOrder = {
  orderId: string;
  userId: string;
  status: "accepted" | "rejected";
};
