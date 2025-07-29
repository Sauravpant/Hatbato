import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/async-handler.ts";
import { registerSchema, loginSchema } from "../validators/auth.validator.ts";
import { register, login, logOut } from "../services/auth.services.ts";
import { ApiResponse } from "../utils/api-response.ts";
import { AppError } from "../utils/app-error.ts";
import { prisma } from "../db/config.ts";
import { generateAccessToken } from "../utils/token.ts";
import { User } from "../../generated/prisma/index.js";
interface AuthenticatedRequest extends Request {
  user: User;
}
//Controller to handle user registration
export const registerUser = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
  const { name, email, password, address, contactNumber } = req.body;
  const validatedData = await registerSchema.parseAsync({ name, email, password, address, contactNumber });
  const { userData } = await register(validatedData);
  return res.status(201).json(new ApiResponse(201, userData, "User registered successfully"));
});

//Controller to handle user login
export const loginUser = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;
  const validatedData = await loginSchema.parseAsync({ email, password });
  const { accessToken, refreshToken, userData } = await login(validatedData);
  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 30 * 60 * 1000,
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    .json(new ApiResponse(200, userData, "User Logged In Successfully"));
});

//Controller to handle the logout
export const logOutUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  logOut(req.user.id);
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "strict" as const,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, null, "User logged out"));
});

//Controller to issue the new access token to the user after old one  expires
export const refreshAccessToken = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken) {
    throw new AppError(401, "Refresh token not found");
  }
  //Check if the token exists
  const storedUser = await prisma.user.findFirst({
    where: {
      refreshToken: refreshToken,
    },
  });
  if (!storedUser) {
    throw new AppError(401, "Token is invalid");
  }
  let decodedToken;
  //Verify the existing token
  try {
    decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as { id: string };
  } catch (error) {
    //if verification fails it means the token is expired -> Clear the cookies and also delete the old token from the database
    await prisma.user.update({
      where: {
        id: storedUser.id,
      },
      data: {
        refreshToken: "",
      },
    });
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    throw new AppError(401, "Session expired. Please log in again.");
  }
  const user = await prisma.user.findUnique({
    where: {
      id: decodedToken.id,
    },
  });
  if (!user) {
    throw new AppError(401, "User not found");
  }
  const newAccessToken = generateAccessToken(user.id);
  const { password, ...data } = user;
  return res
    .status(200)
    .cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 30 * 60 * 1000,
    })
    .json(new ApiResponse(200, data, "Access token refreshed successfully"));
});
