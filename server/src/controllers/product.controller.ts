import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { createProductSchema, getProductSchema, updateProductSchema } from "../validators/product.validator";
import { User } from "../../generated/prisma/index.js";
import { AppError } from "../utils/app-error";
import { ApiResponse } from "../utils/api-response";
import { create, deleteItem, getAll, getById, getMyItems, updateItem } from "../services/product.services";
import { ProductType } from "../types/product.types";

interface AuthenticatedRequest extends Request {
  user: User;
}

// Controller to handle product creation
export const createProduct = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const validatedData = (await createProductSchema.parseAsync(req.body)) as ProductType;

  if (!req.file) {
    throw new AppError(400, "Product image is required.");
  }

  // Pass file buffer and originalname instead of file path
  await create({
    ...validatedData,
    userid: req.user.id,
    fileBuffer: req.file.buffer,
    fileName: req.file.originalname,
  });

  return res.status(201).json(new ApiResponse(201, null, "Product created successfully."));
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
  return res.status(200).json(new ApiResponse(204, null, "Product deleted successfully"));
});

// Controller to get all products for the current user
export const getMyProducts = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const products = await getMyItems(req.user.id);
  return res.status(200).json(new ApiResponse(200, products, "All products fetched successfully."));
});

// Controller to update a product
export const updateProduct = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  if (!req.body) throw new AppError(400, "All fields are empty");

  const validatedData = await updateProductSchema.parseAsync(req.body);
  const { productId } = req.params;
  const fileBuffer = req.file?.buffer;
  const fileName = req.file?.originalname;
  const userId = req.user.id;

  const products = await updateItem(validatedData, productId, userId, fileBuffer, fileName);

  return res.status(200).json(new ApiResponse(200, products, "Product updated successfully"));
});

export const getAllProducts = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const role = req?.user?.role;
  const validatedData = await getProductSchema.parseAsync(req.query);
  const products = await getAll(validatedData, role);
  return res.status(200).json(new ApiResponse(200, products, "Products fetched successfully"));
});
