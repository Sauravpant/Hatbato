import { Request, Response } from "express";
import { User } from "../../generated/prisma/index.js";
import { asyncHandler } from "../utils/async-handler.ts";
import { createReviewSchema } from "../validators/review.validator.ts";
import {
  getAverage,
  getStats,
  handleCreateReview,
  handleDeleteReview,
  handleUpdateReview,
  userReviewed,
  userReviews,
} from "../services/review.services.ts";
import { ApiResponse } from "../utils/api-response.ts";
interface AuthenticatedRequest extends Request {
  user: User;
}

export const createReview = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const { sellerId } = req.params;
  const validatedData = await createReviewSchema.parseAsync(req.body);
  await handleCreateReview(validatedData, sellerId, req.user.id);
  return res.status(201).json(new ApiResponse(201, {}, "Review created successfully"));
});

export const updateReview = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const { reviewId } = req.params;
  const validatedData = await createReviewSchema.parseAsync(req.body);
  await handleUpdateReview(validatedData, reviewId, req.user.id);
  return res.status(200).json(new ApiResponse(200, null, "Review updated successfully"));
});

export const deleteReview = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const { reviewId } = req.params;
  await handleDeleteReview(reviewId, req.user.id);
  return res.status(204).json(new ApiResponse(204, null, "Review deleted successfully"));
});

export const getMyGivenReviews = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const result = await userReviewed(req.user.id);
  return res.status(200).json(new ApiResponse(200, result, "Review fetched successfully"));
});

export const getMyReceivedReviews = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const result = await userReviews(req.user.id);
  return res.status(200).json(new ApiResponse(200, result, "Review fetched successfully"));
});

export const getAverageData = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const result = await getAverage(req.user.id);
  return res.status(200).json(new ApiResponse(200, result, "Data fetched successfully"));
});

export const getSellerStats = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const result = await getStats(req.user.id);
  return res.status(200).json(new ApiResponse(200, result, "Data fetched successfully"));
});
