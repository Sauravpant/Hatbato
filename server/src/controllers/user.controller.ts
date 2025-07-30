import { Request, response, Response } from "express";
import { asyncHandler } from "../utils/async-handler.ts";
import { AppError } from "../utils/app-error.ts";
import { ApiResponse } from "../utils/api-response.ts";
import { deleteAccount, deletePicture, updateUser, uploadPicture } from "../services/user.services.ts";
import { User } from "../../generated/prisma/index.js";
import { updateUserSchema } from "../validators/user.validator.ts";

interface AuthenticatedRequest extends Request {
  user: User;
}

//Controller to handle the profile update
export const updateProfileDetails = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  if (!req.body) {
    throw new AppError(400, "All fields are empty");
  }
  const validatedData = await updateUserSchema.parseAsync(req.body);
  const result = await updateUser({ ...validatedData, id: req.user.id });
  return res.status(200).json(new ApiResponse(200, result, "Profile Updated successfully"));
});
//Controller to upload the profile picture of user
export const uploadProfilePicture = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const imagePath = req.file.path;
  const result = await uploadPicture({ imagePath, id: req.user.id });
  return res.status(200).json(new ApiResponse(200, result, "Image uploaded successfully"));
});

//Controller to delete the profile picture of user
export const deleteProfilePicture = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  await deletePicture(req.user.id);
  return res.status(200).json(new ApiResponse(200, {}, "Image deleted successfully"));
});

//Controller to handle the account deletion of user
export const deleteUser = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  await deleteAccount(req.user.id);
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "strict" as const,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User deleted successfully"));
});
