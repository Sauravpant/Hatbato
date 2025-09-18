import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { User } from "../../generated/prisma/index.js";
import { reportSchema } from "../validators/report.validator";
import { handleDeleteReport, handleGetReports, handleProductReport, handleUserReport } from "../services/report.services";
import { ApiResponse } from "../utils/api-response";

interface AuthenticatedRequest extends Request {
  user: User;
}

export const reportUser = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const { userId } = req.params;
  const validatedData = await reportSchema.parseAsync(req.body);
  await handleUserReport(validatedData, req.user.id, userId);
  return res.status(200).json(new ApiResponse(200, null, "User reported successfully"));
});

export const reportProduct = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const { productId } = req.params;
  const validatedData = await reportSchema.parseAsync(req.body);
  await handleProductReport(validatedData, req.user.id, productId);
  return res.status(200).json(new ApiResponse(200, null, "Product reported successfully"));
});

export const getAllReports = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const reports = await handleGetReports(req.user.id);
  return res.status(200).json(new ApiResponse(200, reports, "All reports fetched successfully"));
});

export const deleteReport = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const { reportId } = req.params;
  await handleDeleteReport(reportId, req.user.id);
  return res.status(200).json(new ApiResponse(200, null, "Report deleted successfully"));
});
