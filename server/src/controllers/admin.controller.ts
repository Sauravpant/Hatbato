import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler.ts";
import { ApiResponse } from "../utils/api-response.ts";
import {
  getUserStatsService,
  getProductStatsService,
  getOrderStatsService,
  getReportStatsService,
  deleteUserService,
  getAllUsersService,
  getUserByIdService,
} from "../services/admin.services.ts";
import { getAllUsersSchema } from "../validators/admin.validators.ts";

//Dashboard stats controllers
export const getUserStats = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
  const stats = await getUserStatsService();
  return res.status(200).json(new ApiResponse(200, stats, "User statistics fetched successfully"));
});

export const getProductStats = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
  const stats = await getProductStatsService();
  return res.status(200).json(new ApiResponse(200, stats, "Product statistics fetched successfully"));
});

export const getOrderStats = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
  const stats = await getOrderStatsService();
  return res.status(200).json(new ApiResponse(200, stats, "Order statistics fetched successfully"));
});

export const getReportStats = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
  const stats = await getReportStatsService();
  return res.status(200).json(new ApiResponse(200, stats, "Report statistics fetched successfully"));
});

//User management controller
export const getAllUsers = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
  const validatedData = await getAllUsersSchema.parseAsync(req.query);
  const usersData = await getAllUsersService({
    page: validatedData.page ? Number(validatedData.page) : undefined,
    limit: validatedData.limit ? Number(validatedData.limit) : undefined,
    search: validatedData.search,
  });
  return res.status(200).json(new ApiResponse(200, usersData, "Users fetched successfully"));
});

export const getUserById = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
  const { userId } = req.params;
  const user = await getUserByIdService(userId);
  return res.status(200).json(new ApiResponse(200, user, "User profile fetched successfully"));
});

export const deleteUser = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
  const { userId } = req.params;
  await deleteUserService(userId);
  return res.status(200).json(new ApiResponse(200, null, "User deleted successfully"));
});
