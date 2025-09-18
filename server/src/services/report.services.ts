import { Report } from "../../generated/prisma/index.js";
import { prisma } from "../db/config";
import { AppError } from "../utils/app-error";
import { ReportType } from "../validators/report.validator";

export const handleUserReport = async (data: ReportType, userId: string, reportId: string): Promise<void> => {
  if (userId === reportId) {
    throw new AppError(403, "You cannot report yourself");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: reportId,
    },
    select: { id: true },
  });

  if (!user) {
    throw new AppError(404, "The user you are trying to report does not exist");
  }

  const report = await prisma.report.findFirst({
    where: {
      reportedById: userId,
      reportFor: "user",
      reportedUserId: reportId,
    },
  });

  if (report) {
    throw new AppError(409, "You have already reported this user");
  }

  await prisma.report.create({
    data: {
      status: "pending",
      reason: data.reason,
      description: data.description,
      reportedById: userId,
      reportFor: "user",
      reportedUserId: reportId,
    },
  });
};

export const handleProductReport = async (data: ReportType, userId: string, productId: string): Promise<void> => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      id: true,
      userId: true,
    },
  });

  if (!product) {
    throw new AppError(404, "The product you are trying to report does not exist");
  }

  if (userId === product.userId) {
    throw new AppError(403, "You cannot report your own product");
  }

  const report = await prisma.report.findFirst({
    where: {
      reportedById: userId,
      reportFor: "product",
      reportedProductId: productId,
    },
  });

  if (report) {
    throw new AppError(409, "You have already reported this product");
  }

  await prisma.report.create({
    data: {
      status: "pending",
      reason: data.reason,
      description: data.description,
      reportedById: userId,
      reportFor: "product",
      reportedProductId: productId,
    },
  });
};

export const handleGetReports = async (userId: string): Promise<Report[]> => {
  const reports = await prisma.report.findMany({
    where: {
      reportedById: userId,
    },
  });
  return reports;
};

export const handleDeleteReport = async (reportId: string, userId: string): Promise<void> => {
  const report = await prisma.report.findUnique({
    where: {
      id: reportId,
    },
  });

  if (!report) {
    throw new AppError(404, "Report does not exist");
  }

  if (report.reportedById !== userId) {
    throw new AppError(403, "You are not authorized to delete this report");
  }

  await prisma.report.delete({
    where: {
      id: reportId,
    },
  });
};
