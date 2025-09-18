import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { categoryService } from "../services/category.services";
import { ApiResponse } from "../utils/api-response";

export const getCategory = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
  const category = await categoryService();
  return res.status(200).json(new ApiResponse(200, category, "Category fetched successfully"));
});
