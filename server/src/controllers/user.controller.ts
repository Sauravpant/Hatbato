import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { AppError } from "../utils/app-error";
import { ApiResponse } from "../utils/api-response";
import {
  deleteAccount,
  deletePicture,
  getMe,
  updateUser,
  uploadPicture,
  sendOTP,
  reset,
  deactivate,
  submitContact,
  getDetails,
  getStats,
} from "../services/user.services";
import { User } from "../../generated/prisma/index.js";
import { emailSchema, resetPasswordSchema, submitFormSchema, updateUserSchema } from "../validators/user.validator";
import { ContactForm } from "../types/user.types";

interface AuthenticatedRequest extends Request {
  user: User;
}

// Controller to update the user's profile details
export const updateProfileDetails = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  if (!req.body) {
    throw new AppError(400, "All fields are empty");
  }
  const validatedData = await updateUserSchema.parseAsync(req.body);
  const result = await updateUser({ ...validatedData, id: req.user.id });
  return res.status(200).json(new ApiResponse(200, result, "Profile Updated successfully"));
});
// Controller to upload the user's profile picture
export const uploadProfilePicture = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
      if (!req.file) {
      throw new AppError(400, "Image is required");
    }
  const result = await uploadPicture({ fileBuffer: req.file.buffer, fileName: req.file.originalname, id: req.user.id });
  return res.status(200).json(new ApiResponse(200, result, "Image uploaded successfully"));
});

// Controller to delete the user's profile picture
export const deleteProfilePicture = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  await deletePicture(req.user.id);
  return res.status(200).json(new ApiResponse(200, {}, "Image deleted successfully"));
});

// Controller to handle user account deletion
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
// Controller to fetch the current user's details
export const getUser = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const user = await getMe(req.user.id);
  return res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
});
//Controlle to send the otp to user's email for password reset
export const sendOtp = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
  const data = await emailSchema.parseAsync(req.body);
  await sendOTP(data.email);
  return res.status(200).json(new ApiResponse(200, {}, "A 6 digit OTP has been sent to your email"));
});

// Controller to handle password reset
export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const { email, newPassword, confirmNewPassword, otp } = req.body;
  const validatedData = await resetPasswordSchema.parseAsync({ email, newPassword, confirmNewPassword, otp });
  await reset(validatedData);
  return res.status(200).json(new ApiResponse(200, {}, "Password reset successfully. Please log in again."));
});

//Controller to handle account deactivation
export const deactivateAccount = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  await deactivate(req.user.id);
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "strict" as const,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, null, "Account deactivated successfully.Login again to continue"));
});

//Controller to handle form submission

export const submitForm = asyncHandler(async (req: Request, res: Response): Promise<Response> => {
  const data = await submitFormSchema.parseAsync(req.body);
  await submitContact(data);
  return res.status(200).json(new ApiResponse(200, null, "Form submitted successfully"));
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await getDetails(id);
  return res.status(200).json(new ApiResponse(200, result, "Seller details fetched successfully"));
});

export const getUserStats = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user.id;
  const result = await getStats(userId);
  return res.status(200).json(new ApiResponse(200, result, "User stats fetched successfully"));
});
