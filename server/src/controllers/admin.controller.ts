import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { ApiResponse } from "../utils/api-response";
import {
  getUserStatsService,
  getProductStatsService,
  getOrderStatsService,
  getReportStatsService,
  deleteUserService,
  getAllUsersService,
  getUserByIdService,
  addCategoryService,
  updateCategoryService,
  deleteCategoryService,
  getAlLCategoryService,
  getCategoryDetailsService,
  deleteProductService,
  deleteReviewService,
  getAllReviewsService,
  getAllOrdersService,
  getAllReportsService,
  resolveReportService,
  deleteReportService,
  getCategoryStats,
  getContacts,
  deleteContact,
} from "../services/admin.services";
import {
  addCategorySchema,
  getAllReviewsSchema,
  getAllUsersSchema,
  updateCategorySchema,
  getAllOrdersSchema,
  getAllReportsSchema,
} from "../validators/admin.validators";

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

//Category Management
export const addCategory = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
  const validatedData = await addCategorySchema.parseAsync(req.body);
  const result = await addCategoryService(validatedData);
  return res.status(201).json(new ApiResponse(201, result, "Category added successfully"));
});

export const updateCategory = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
  const { categoryId } = req.params;
  const validatedData = await updateCategorySchema.parseAsync(req.body);
  const result = await updateCategoryService(categoryId, validatedData);
  return res.status(201).json(new ApiResponse(201, result, "Category updated successfully"));
});

export const deleteCategory = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
  const { categoryId } = req.params;
  await deleteCategoryService(categoryId);
  return res.status(200).json(new ApiResponse(200, null, "Category deleted successfully"));
});

export const getAllCategory = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
  const result = await getAlLCategoryService();
  return res.status(201).json(new ApiResponse(201, result, "Category fetched successfully"));
});

export const getCategoryDetails = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
  const { categoryId } = req.params;
  const result = await getCategoryDetailsService(categoryId);
  return res.status(201).json(new ApiResponse(201, result, "Category detauls fetched successfully"));
});

export const getCategoryInfo = asyncHandler(async (req: Request, res: Response) => {
  const result = await getCategoryStats();
  return res.status(200).json(new ApiResponse(200, result, "Categories fetched successfully"));
});

//Product management
export const deleteProduct = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
  const { productId } = req.params;
  await deleteProductService(productId);
  return res.status(200).json(new ApiResponse(200, null, "Product deleted successfully"));
});

//Review Management
export const getAllReviews = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = await getAllReviewsSchema.parseAsync(req.query);
  const reviews = await getAllReviewsService(validatedData);
  return res.status(200).json(new ApiResponse(200, reviews, "Reviews fetched successfully"));
});

export const deleteReview = asyncHandler(async (req: Request, res: Response) => {
  const { reviewId } = req.params;
  await deleteReviewService(reviewId);
  return res.status(200).json(new ApiResponse(200, null, "Review deleted successfully"));
});
//Order Management
export const getAllOrdersController = asyncHandler(async (req: Request, res: Response) => {
  const parseResult = await getAllOrdersSchema.parseAsync(req.query);
  const orders = await getAllOrdersService(parseResult);
  return res.status(200).json(new ApiResponse(200, orders, "Orders fetched successfully"));
});

//Report Management
export const getAllReportsController = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = await getAllReportsSchema.parseAsync(req.query);
  const reports = await getAllReportsService(validatedData);
  return res.status(200).json(new ApiResponse(200, reports, "Reports fetched successfully"));
});

export const resolveReportController = asyncHandler(async (req: Request, res: Response) => {
  const { reportId } = req.params;
  await resolveReportService(reportId);
  return res.status(200).json(new ApiResponse(200, null, "Report resolved successfully"));
});

export const deleteReportController = asyncHandler(async (req: Request, res: Response) => {
  const { reportId } = req.params;
  await deleteReportService(reportId);
  return res.status(200).json(new ApiResponse(200, null, "Report deleted successfully"));
});

//Get user queries

export const getUserQueries = asyncHandler(async (req: Request, res: Response) => {
  const result = await getContacts();
  return res.status(200).json(new ApiResponse(200, result, "Contacts fetched successfully"));
});

export const deleteQueries = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteContact(id);
  return res.status(200).json(new ApiResponse(200, null, "Contact deleted successfully"));
});
