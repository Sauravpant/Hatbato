import { prisma } from "../db/config.ts";
import { UserStats, ProductStats, OrderStats, ReportStats, GetAllUsersParams, PaginatedUsers, UserProfile } from "../types/admin.types.ts";
import { safeUserSelect } from "../contants.ts";
import { AppError } from "../utils/app-error.ts";

//For Dashboard stats
export const getUserStatsService = async (): Promise<UserStats> => {
  const totalUsers = await prisma.user.count();
  const activeUsers = await prisma.user.count({
    where: {
      isActive: true,
    },
  });
  const inactiveUsers = totalUsers - activeUsers;
  const date = new Date();
  date.setDate(date.getDate() - 30);
  const monthlyRegistrations = await prisma.user.groupBy({
    by: ["createdAt"],
    _count: {
      _all: true,
    },
    where: {
      createdAt: {
        gte: date,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  const registrationsOverMonth = monthlyRegistrations.map((r) => ({
    date: r.createdAt.toISOString().split("T")[0],
    count: r._count._all,
  }));

  return { totalUsers, activeUsers, inactiveUsers, registrationsOverMonth };
};
export const getProductStatsService = async (): Promise<ProductStats> => {
  const totalProducts = await prisma.product.count();
  const productsByCategory = await prisma.product.groupBy({
    by: ["categoryId"],
    _count: {
      _all: true,
    },
  });
  const productsByStatus = await prisma.product.groupBy({
    by: ["status"],
    _count: {
      _all: true,
    },
  });
  const soldProducts = await prisma.product.aggregate({
    _count: {
      isBought: true,
    },
  });
  const sold = soldProducts._count.isBought;
  const unsold = totalProducts - soldProducts._count.isBought;
  const categoryMap = await prisma.category.findMany();
  const productCountByCategoryId = Object.fromEntries(productsByCategory.map((pc) => [pc.categoryId, pc._count._all]));
  const productsByCategories = categoryMap.map((c) => ({
    category: c.name,
    count: productCountByCategoryId[c.id] || 0,
  }));
  const productStatus = Object.fromEntries(productsByStatus.map((p) => [p.status, p._count._all]));

  return {
    totalProducts,
    unsold,
    sold,
    productsByStatus: productStatus,
    productsByCategory: productsByCategories,
  };
};

export const getOrderStatsService = async (): Promise<OrderStats> => {
  const totalOrders = await prisma.order.count();
  const acceptedOrders = await prisma.order.count({
    where: {
      status: "accepted",
    },
  });
  const rejectedOrders = await prisma.order.count({
    where: {
      status: "rejected",
    },
  });

  const ordersTrend = await prisma.order.groupBy({
    by: ["createdAt"],
    _count: { _all: true },
    orderBy: { createdAt: "asc" },
  });
  const orders = Object.fromEntries(ordersTrend.map((o) => [o.createdAt, o._count._all]));

  return {
    totalOrders,
    acceptedOrders,
    rejectedOrders,
    ordersTrend: orders,
  };
};

export const getReportStatsService = async (): Promise<ReportStats> => {
  const totalReports = await prisma.report.count();
  const resolvedReports = await prisma.report.count({ where: { status: "resolved" } });
  const pendingReports = await prisma.report.count({ where: { status: "pending" } });

  return { totalReports, resolvedReports, pendingReports };
};

//User management
export const getAllUsersService = async ({ page = 1, limit = 10, search }: GetAllUsersParams): Promise<PaginatedUsers> => {
  const pageNumber = Number(page) > 0 ? Number(page) : 1;
  const limitNumber = Number(limit) > 0 ? Number(limit) : 10;
  const skip = (pageNumber - 1) * limitNumber;

  const whereClause = search
    ? {
        name: {
          contains: search,
        },
      }
    : {};

  const [total, users] = await Promise.all([
    prisma.user.count({ where: whereClause }),
    prisma.user.findMany({
      where: whereClause,
      skip,
      take: limitNumber,
      select: {
        id: true,
        name: true,
        email: true,
        isActive: true,
        isVerified: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return {
    users,
    total,
    page: pageNumber,
    limit: limitNumber,
  };
};

export const getUserByIdService = async (userId: string): Promise<any> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      ...safeUserSelect,
      products: { select: { id: true } },
      ordersMade: { select: { id: true } },
      ordersReceived: { select: { id: true } },
      reportsMade: { select: { id: true } },
      reviewsGiven: { select: { id: true } },
    },
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  return {
    ...user,
    totalProducts: user.products.length,
    totalOrdersMade: user.ordersMade.length,
    totalOrdersReceived: user.ordersReceived.length,
    totalReportsMade: user.reportsMade.length,
    totalReviewsGiven: user.reviewsGiven.length,
  };
};

export const deleteUserService = async (userId: string): Promise<void> => {
  const userExists = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!userExists) {
    throw new AppError(404, "User not found");
  }
  await prisma.user.delete({
    where: {
      id: userId,
    },
  });
};
