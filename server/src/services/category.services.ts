import { Category } from "../../generated/prisma/index.js";
import { prisma } from "../db/config";
import { AppError } from "../utils/app-error";

export const categoryService = async (): Promise<Category[]> => {
  const category = await prisma.category.findMany();
  if (!category) {
    throw new AppError(404, "No categories found");
  }
  return category;
};
