import { z } from "zod";

export const getAllUsersSchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  search: z.string().optional(),
});

export const addCategorySchema = z.object({
  name: z.string().min(3, "Category name is too short").max(50, "Category name is too long"),
  description: z.string().min(20, "Description is too short").max(200, "Description  is too long"),
  slogan: z.string().min(10, "Slogan is too short").max(50, "Slogan is too long"),
  slug: z.string().min(3, "Slug is too short").max(20, "Slug is too long"),
});
export type AddCategory = z.infer<typeof addCategorySchema>;

export const updateCategorySchema = z.object({
  name: z.string().min(3, "Category name is too short").max(50, "Category name is too long").optional(),
  description: z.string().min(20, "Description is too short").max(200, "Description  is too long").optional(),
  slogan: z.string().min(10, "Slogan is too short").max(50, "Slogan is too long").optional(),
  slug: z.string().min(3, "Slug is too short").max(20, "Slug is too long").optional(),
});
export type UpdateCategory = z.infer<typeof updateCategorySchema>;

export const getAllReviewsSchema = z.object({
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
  userName: z.string().trim().optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});
export type GetReviews = z.infer<typeof getAllReviewsSchema>;

//Orders validation
export const getAllOrdersSchema = z.object({
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
  status: z.enum(["pending", "accepted", "rejected"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});
export type GetOrders = z.infer<typeof getAllOrdersSchema>;

//Report Validation
export const getAllReportsSchema = z.object({
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
  status: z.enum(["pending", "resolved"]).optional(),
  reportFor: z.enum(["user", "product"]).optional(),
});
export type GetReport = z.infer<typeof getAllReportsSchema>;
