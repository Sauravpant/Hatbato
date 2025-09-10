import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler.ts";
import { createProductSchema, getProductSchema, updateProductSchema } from "../validators/product.validator.ts";
import { User } from "../../generated/prisma/index.js";
import { AppError } from "../utils/app-error.ts";
import { ApiResponse } from "../utils/api-response.ts";
import { create, deleteItem, getAll, getById, getMyItems, updateItem } from "../services/product.services.ts";
import { ProductType } from "../types/product.types.ts";

interface AuthenticatedRequest extends Request {
  user: User;
}

// Controller to handle product creation
export const createProduct = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const validatedData = (await createProductSchema.parseAsync(req.body)) as ProductType;
  const imagePath = req.file?.path;
  if (!imagePath) {
    throw new AppError(400, "Product image is required.");
  }
   // Create product in the database
  await create({
    ...validatedData,
    userid: req.user.id,
    productImage: imagePath,
  });

  return res.status(201).json(new ApiResponse(201, {}, "Product created successfully."));
});

// Controller to handle fetching a product by id
export const getProductById = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const { id } = req.params;
  const data = await getById(id);
  return res.status(200).json(new ApiResponse(200, data, "Product fetched successfully."));
});

// Controller to handle deleting a product
export const deleteProduct = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const { productId } = req.params;
  const userId = req.user.id;
  await deleteItem(productId, userId);
  // 204 No Content for successful deletion
  return res.status(204).json();
});

// Controller to get all products for the current user
export const getMyProducts = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const products = await getMyItems(req.user.id);
  return res.status(200).json(new ApiResponse(200, products, "All products fetched successfully."));
});

// Controller to update a product
export const updateProduct = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  if (!req.body) {
    throw new AppError(400, "All fields are empty");
  }
  const validatedData = await updateProductSchema.parseAsync(req.body);
  const { productId } = req.params;
  const imagePath = req.file?.path;
  const userId = req.user.id;
  const products = await updateItem(validatedData, productId, userId, imagePath);
  return res.status(200).json(new ApiResponse(200, products, "Product updated successfully"));
});

export const getAllProducts = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
  const validatedData = await getProductSchema.parseAsync(req.query);
  const products = await getAll(validatedData);
  return res.status(200).json(new ApiResponse(200, products, "Products fetched successfully"));
});
