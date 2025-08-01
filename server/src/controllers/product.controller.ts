import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler.ts";
import { createProductSchema } from "../validators/product.validator.ts";
import { User } from "../../generated/prisma/index.js";
import { AppError } from "../utils/app-error.ts";
import { ApiResponse } from "../utils/api-response.ts";
import { create, getByCategory, getById } from "../services/product.services.ts";
import { ProductType } from "../types/product.types.ts";

interface AuthenticatedRequest extends Request {
  user: User;
}

// Controller to handle product creation
export const createProduct = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const validatedData = (await createProductSchema.parseAsync(req.body)) as ProductType;

  // Check if product image is provided
  const imagePath = req.file?.path;
  if (!imagePath) {
    throw new AppError(400, "Product image is required.");
  }

  // Create product in the database
  const result = await create({
    ...validatedData,
    userid: req.user.id,
    productImage: imagePath,
  });

  return res.status(201).json(new ApiResponse(201, result, "Product created successfully."));
});

//Controller to handle fetching a product by id
export const getProductById = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const { id } = req.params;
  const data = await getById(id);
  return res.status(200).json(new ApiResponse(200, data, "Product fetched succesfully"));
});

export const getProductByCategory = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { slug } = req.params;
  if (!slug) {
    throw new AppError(401, "Invalid category slug");
  }
  const products = await getByCategory(slug);
  return res.status(200).json(new ApiResponse(200, products, `Products of ${slug} category fetched successfully`));
});
