import { Prisma } from "../../generated/prisma/index.js";
export interface CreateOrder {
  productId: string;
  userId: string;
}

export interface UpdateOrder {
  orderId: string;
  userId: string;
  status: "accepted" | "rejected";
}

export type Order = Prisma.OrderGetPayload<{
  select: {
    id: true;
    createdAt: true;
    status: true;
    product: {
      select: {
        title: true;
        price: true;
        isBought: true;
        deliveryAvailable: true;
      };
    };
  };
}>;
