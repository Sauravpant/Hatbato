import { prisma } from "../db/config.ts";
import { AppError } from "../utils/app-error.ts";
import type { CreateOrder, UpdateOrder, Order } from "../types/order.types.ts";
export const createOrder = async ({ productId, userId }: CreateOrder): Promise<void> => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      order: true,
    },
  });

  if (!product) {
    throw new AppError(404, "Product not found");
  }

  if (product.userId === userId) {
    throw new AppError(403, "You cannot buy your own product");
  }

  if (product.isBought) {
    throw new AppError(409, "Product has already been bought");
  }
  const existing = await prisma.order.findFirst({
    where: {
      productId,
      buyerId: userId,
      status: "pending",
    },
  });
  if (existing) {
    throw new AppError(409, "You already have a pending request for this product");
  }
  await prisma.order.create({
    data: {
      productId,
      buyerId: userId,
      sellerId: product.userId,
      status: "pending",
    },
  });
  await prisma.notification.create({
    data: {
      userId: userId,
      type: "order_placed",
      message: `Your order for ${product.title} has been placed successfully`,
    },
  });
  await prisma.notification.create({
    data: {
      userId: product.userId,
      type: "order_placed",
      message: `You have received an order request for  ${product.title}`,
    },
  });
};

export const getOrdersByBuyer = async (buyerId: string): Promise<Order[]> => {
  return await prisma.order.findMany({
    where: {
      buyerId,
    },
    select: {
      id: true,
      createdAt: true,
      status: true,
      product: {
        select: {
          title: true,
          price: true,
          isBought: true,
          deliveryAvailable: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getOrdersBySeller = async (sellerId: string): Promise<Order[]> => {
  return await prisma.order.findMany({
    where: {
      sellerId,
    },
    select: {
      id: true,
      createdAt: true,
      status: true,
      product: {
        select: {
          title: true,
          price: true,
          isBought: true,
          deliveryAvailable: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const updateOrderStatus = async ({ orderId, userId, status }: UpdateOrder): Promise<void> => {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      product: true,
    },
  });
  if (order.product.isBought) {
    throw new AppError(400, "You have already accepted this order");
  }
  if (!order) {
    throw new AppError(404, "Order not found");
  }
  if (order.status === "rejected") {
    throw new AppError(400, "You have already rejected this offer");
  }

  if (order.sellerId !== userId) {
    throw new AppError(403, "Unauthorized to update this order");
  }
  if (status === "rejected") {
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: "rejected",
      },
    });

    await prisma.notification.create({
      data: {
        userId: order.buyerId,
        type: "order_rejected",
        message: `Your order for ${order.product.title} has been rejected by the seller`,
      },
    });
  }

  if (status === "accepted") {
    // Mark product as accepted and bought
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: "accepted",
      },
    });
    await prisma.product.update({
      where: {
        id: order.productId,
      },
      data: {
        isBought: true,
      },
    });

    // Get other pending orders before rejecting them
    const otherPendingOrders = await prisma.order.findMany({
      where: {
        productId: order.productId,
        status: "pending",
        id: {
          not: orderId,
        },
      },
      select: {
        id: true,
        buyerId: true,
      },
    });

    // Reject other pending orders
    await prisma.order.updateMany({
      where: {
        productId: order.productId,
        status: "pending",
        id: { not: orderId },
      },
      data: {
        status: "rejected",
      },
    });

    // Notify accepted buyer
    await prisma.notification.create({
      data: {
        userId: order.buyerId,
        type: "order_accepted",
        message: `Your order for ${order.product.title} has been accepted by the seller. The seller will contact you soon`,
      },
    });

    // Notify all other rejected buyers
    await Promise.all(
      otherPendingOrders.map((o) =>
        prisma.notification.create({
          data: {
            userId: o.buyerId,
            type: "order_rejected",
            message: `Your order for product ${order.product.title} was rejected.`,
          },
        })
      )
    );
  }
};
export const cancelOrder = async (orderId: string, userId: string): Promise<void> => {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      product: {
        select: {
          title: true,
        },
      },
    },
  });
  if (!order) {
    throw new AppError(404, "Order doesnt exist");
  }
  if (order.buyerId !== userId) {
    throw new AppError(403, "Not authorized to delete this order");
  }
  if (order.status === "rejected") {
    throw new AppError(400, "Your order is already rejected");
  }
  if (order.status === "accepted") {
    throw new AppError(400, "Accepted orders can't be cancelled");
  }
  //Send the notification to the user
  await prisma.notification.create({
    data: {
      userId: order.buyerId,
      type: "order_cancelled",
      message: `You have cancelled the order for ${order.product.title} `,
    },
  });
  //Send the notification to the seller
  await prisma.notification.create({
    data: {
      userId: order.sellerId,
      type: "order_cancelled",
      message: `The order request for ${order.product.title} has been cancelled by the user`,
    },
  });

  //Delete the order
  await prisma.order.delete({
    where: {
      id: orderId,
    },
  });
};
