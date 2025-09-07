import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler.ts";
import { categoryService } from "../services/category.services.ts";
import { ApiResponse } from "../utils/api-response.ts";

export const getCategory = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
  const category = await categoryService();
  return res.status(200).json(new ApiResponse(200, category, "Category fetched successfully"));
});
