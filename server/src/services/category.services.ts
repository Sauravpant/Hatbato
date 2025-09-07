import { Category } from "../../generated/prisma/index.js";
import { prisma } from "../db/config.ts";
import { AppError } from "../utils/app-error.ts";

export const categoryService = async (): Promise<Category[]> => {
  const category = await prisma.category.findMany();
  if (!category) {
    throw new AppError(404, "No categories found");
  }
  return category;
};
