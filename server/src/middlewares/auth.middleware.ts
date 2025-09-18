import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../utils/async-handler";
import type { User } from "../../generated/prisma/index.js";
import { AppError } from "../utils/app-error";
import { prisma } from "../db/config";

interface AuthenticatedRequest extends Request {
  user: User;
}

export const verifyJWT = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const token = req.cookies?.accessToken;
  if (!token) {
    throw new AppError(401, "Unauthorized access");
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as { id: string };
  } catch (error) {
    throw new AppError(401, "Token is invalid or expired");
  }
  const user = await prisma.user.findUnique({
    where: {
      id: decodedToken.id,
    },
  });
  if (!user) {
    throw new AppError(404, "Invalid token");
  }
  req.user = user;
  next();
});
