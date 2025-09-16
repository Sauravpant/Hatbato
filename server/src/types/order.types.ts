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
        imageUrl: true;
        title: true;
        price: true;
        deliveryAvailable: true;
      };
    };
    buyer: {
      select: {
        name: true;
        contactNumber: true;
        address: true;
      };
    };
    seller: {
      select: {
        name: true;
        contactNumber: true;
        address: true;
      };
    };
  };
}>;
