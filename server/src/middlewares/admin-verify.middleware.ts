import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/async-handler.ts";
import { User } from "../../generated/prisma/index.js";
import { AppError } from "../utils/app-error.ts";
interface AuthenticatedRequest extends Request {
  user: User;
}
export const verifyAdmin = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  if (req.user.role === "admin") {
    next();
  } else {
    throw new AppError(403, "Unauthorized");
  }
});
