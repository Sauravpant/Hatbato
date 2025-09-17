import { prisma } from "../db/config.ts";
import {
  UserStats,
  ProductStats,
  OrderStats,
  ReportStats,
  GetAllUsersParams,
  PaginatedUsers,
  CategoryDetails,
  PaginatedReviews,
  PaginatedOrders,
  PaginatedReports,
  CategoryInfo,
} from "../types/admin.types.ts";
import { safeUserSelect } from "../contants.ts";
import { AppError } from "../utils/app-error.ts";
import { AddCategory, GetOrders, GetReport, GetReviews, UpdateCategory } from "../validators/admin.validators.ts";
import { Category } from "../../generated/prisma/index.js";

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
  const soldProducts = await prisma.product.count({
    where: {
      isBought: true,
    },
  });
  const sold = soldProducts;
  const unsold = totalProducts - soldProducts;
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

//Category management

export const addCategoryService = async (categoryData: AddCategory): Promise<Category> => {
  const category = await prisma.category.findFirst({
    where: {
      OR: [{ name: categoryData.name }, { slug: categoryData.slug }],
    },
    select: {
      id: true,
    },
  });
  if (category) {
    throw new AppError(400, "Category with the above name or slug already exists");
  }
  const result = await prisma.category.create({
    data: {
      ...categoryData,
    },
  });
  return result;
};

export const deleteCategoryService = async (categoryId: string): Promise<void> => {
  const categoryExists = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
    select: {
      id: true,
    },
  });
  if (!categoryExists) {
    throw new AppError(404, "Catgory doesn't exist");
  }
  await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });
};

export const updateCategoryService = async (categoryId: string, categoryData: UpdateCategory): Promise<Category> => {
  const categoryExists = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
    select: {
      id: true,
    },
  });
  if (!categoryExists) {
    throw new AppError(404, "Catgory doesn't exist");
  }
  const category = await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: {
      ...categoryData,
    },
  });
  return category;
};

export const getAlLCategoryService = async (): Promise<Category[]> => {
  const category = await prisma.category.findMany();
  if (!category) {
    throw new AppError(404, "No categories found");
  }
  return category;
};

export const getCategoryDetailsService = async (categoryId: string): Promise<CategoryDetails> => {
  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });
  if (!category) {
    throw new AppError(404, "Category doesnt exist");
  }
  const products = await prisma.product.groupBy({
    by: ["isBought"],
    where: {
      categoryId,
    },
    _count: {
      _all: true,
    },
  });
  let sold = 0,
    unsold = 0;
  products.forEach((p) => {
    if (p.isBought) {
      sold = p._count._all;
    } else {
      unsold = p._count._all;
    }
  });
  const total = sold + unsold;
  return { category, unsoldProducts: unsold, soldProducts: sold, totalProducts: total };
};

export const getCategoryStats = async (): Promise<CategoryInfo[]> => {
  const category = await prisma.category.findMany({
    select: {
      name: true,
      id: true,
      slug: true,
      products: {
        select: {
          id: true,
        },
      },
    },
  });
  if (!category) {
    throw new AppError(404, "No categories found");
  }
  return category;
};

//Product Management

export const deleteProductService = async (productId: string): Promise<void> => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      id: true,
    },
  });
  if (!product) {
    throw new AppError(404, "Product doesnt exist");
  }
  await prisma.product.delete({
    where: {
      id: productId,
    },
  });
};

//Review Management
export const getAllReviewsService = async (filters: GetReviews): Promise<PaginatedReviews> => {
  const { page = 1, limit = 10, userName, sortOrder = "desc" } = filters;

  const whereClause = userName
    ? {
        OR: [{ reviewer: { name: { contains: userName } } }, { seller: { name: { contains: userName } } }],
      }
    : {};

  const [data, total] = await Promise.all([
    prisma.review.findMany({
      where: whereClause,
      include: {
        reviewer: {
          select: {
            id: true,
            name: true,
          },
        },
        seller: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: sortOrder,
      },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.review.count({ where: whereClause }),
  ]);

  return {
    data,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const deleteReviewService = async (reviewId: string): Promise<void> => {
  const review = await prisma.review.findUnique({
    where: {
      id: reviewId,
    },
    select: {
      id: true,
    },
  });
  if (!review) {
    throw new AppError(404, "Review not found");
  }
  await prisma.review.delete({
    where: {
      id: reviewId,
    },
  });
};

//Orders Management
export const getAllOrdersService = async (filters: GetOrders): Promise<PaginatedOrders> => {
  const { page = 1, limit = 10, status, sortOrder = "desc" } = filters;
  const whereClause = status ? { status } : {};

  const data = await prisma.order.findMany({
    where: whereClause,
    include: {
      product: {
        select: {
          id: true,
          title: true,
        },
      },
      buyer: {
        select: {
          id: true,
          name: true,
        },
      },
      seller: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: sortOrder,
    },
    skip: (page - 1) * limit,
    take: limit,
  });
  const total = await prisma.order.count({ where: whereClause });
  return {
    data,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

//Report Management
export const getAllReportsService = async (filters: GetReport): Promise<PaginatedReports> => {
  const { page = 1, limit = 10, status, reportFor } = filters;
  const whereClause: any = {};
  if (status) whereClause.status = status;
  if (reportFor) whereClause.reportFor = reportFor;

  const data = await prisma.report.findMany({
    where: whereClause,
    include: {
      reportedBy: {
        select: {
          id: true,
          name: true,
        },
      },
      reportedUser: {
        select: {
          id: true,
          name: true,
        },
      },
      reportedProduct: {
        select: { id: true, title: true },
      },
    },
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * limit,
    take: limit,
  });
  if (data.length === 0) {
    {
      throw new AppError(404, "No reports found");
    }
  }
  const total = await prisma.report.count({
    where: whereClause,
  });

  return {
    data,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const resolveReportService = async (reportId: string): Promise<void> => {
  const report = await prisma.report.findUnique({
    where: {
      id: reportId,
    },
    select: {
      id: true,
    },
  });
  if (!report) {
    throw new AppError(404, "Report not found");
  }
  await prisma.report.update({
    where: {
      id: reportId,
    },
    data: {
      status: "resolved",
    },
  });
};

export const deleteReportService = async (reportId: string): Promise<void> => {
  const report = await prisma.report.findUnique({
    where: {
      id: reportId,
    },
    select: {
      id: true,
    },
  });
  if (!report) {
    throw new AppError(404, "Report not found");
  }
  await prisma.report.delete({
    where: {
      id: reportId,
    },
  });
};
