import { User } from "../../generated/prisma/index.js";
import bcrypt from "bcrypt";
import { safeUserSelect } from "../contants.ts";
import { prisma } from "../db/config.ts";
import { ContactForm, ImageUpload, ResetPassword, UpdateResponse, UserData } from "../types/user.types.ts";
import { AppError } from "../utils/app-error.ts";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinary.ts";
import sendMail from "../utils/nodemailer.ts";

export const uploadPicture = async (data: ImageUpload): Promise<string> => {
  if (!data.imagePath) {
    throw new AppError(400, "Image is required");
  }
  const uploadedImage = await uploadToCloudinary(data.imagePath);
  if (!uploadedImage) {
    throw new AppError(500, "Failed to upload image. Please try again later.");
  }
  await prisma.user.update({
    where: {
      id: data.id,
    },
    data: {
      imageUrl: uploadedImage.secure_url,
      imagePublicId: uploadedImage.public_id,
    },
  });
  return uploadedImage.secure_url;
};

export const deletePicture = async (id: string): Promise<void> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) {
    throw new AppError(404, "User does not exist");
  }
  if (user.imagePublicId) {
    await deleteFromCloudinary(user.imagePublicId);
  }
  await prisma.user.update({
    where: {
      id,
    },
    data: {
      imagePublicId: "",
      imageUrl: "",
    },
  });
};

export const deleteAccount = async (id: string): Promise<void> => {
  //Check if the user exists
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) {
    throw new AppError(404, "User does not exist");
  }
  //Delete the profile picture of user from cloud if it exists
  if (user.imagePublicId) {
    await deleteFromCloudinary(user.imagePublicId);
  }
  //Delete all the products linked to the user
  await prisma.product.deleteMany({
    where: {
      userId: id,
    },
  });
  //Delete all the review where the user has reviewed
  await prisma.review.deleteMany({
    where: {
      OR: [{ reviewerId: id }, { sellerId: id }],
    },
  });
  //Finally delete the user
  await prisma.user.delete({ where: { id } });
};

export const updateUser = async (data: UserData): Promise<UpdateResponse> => {
  const { id, ...userData } = data;
  const user = await prisma.user.update({
    where: {
      id: data.id,
    },
    data: {
      ...userData,
    },
  });
  const { password, refreshToken, ...result } = user;
  return { result };
};

export const getMe = async (id: string): Promise<any> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: safeUserSelect,
  });
  if (!user) {
    throw new AppError(404, "User does not exist");
  }
  return user;
};

export const sendOTP = async (email: string): Promise<void> => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new AppError(404, "User doesnt exist");
  }
  const userOtp = Math.floor(100000 + Math.random() * 900000).toString();
  //hash the otp
  const salt = await bcrypt.genSalt(10);
  const hashedOtp = await bcrypt.hash(userOtp, salt);
  //Delete if their are existing otp with the same email
  await prisma.otp.deleteMany({
    where: {
      email: email,
    },
  });
  //Save the hashed otp in the database
  await prisma.otp.create({
    data: {
      email,
      otp: hashedOtp,
    },
  });
  await sendMail(email, userOtp);
};

export const reset = async (data: ResetPassword): Promise<void> => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (!user) {
    throw new AppError(404, "User doesnt exist");
  }
  const otp = await prisma.otp.findUnique({
    where: {
      email: data.email,
    },
  });
  const expiryTime = 5 * 60 * 1000;
  if (!otp) {
    throw new AppError(404, "OTP not found. Please request a new one.");
  }
  if (Date.now() - otp.createdAt.getTime() > expiryTime) {
    await prisma.otp.deleteMany({
      where: {
        email: data.email,
      },
    });
    throw new AppError(400, "OTP has expired. Please request a new one.");
  }
  const otpMatches = await bcrypt.compare(data.otp, otp.otp);
  if (!otpMatches) {
    throw new AppError(401, "OTP is incorrect. Please check and try again.");
  }
  if (data.newPassword !== data.confirmNewPassword) {
    throw new AppError(400, "New password and confirm password do not match.");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.confirmNewPassword, salt);
  await prisma.user.update({
    where: {
      email: data.email,
    },
    data: {
      password: hashedPassword,
    },
  });
  await prisma.otp.deleteMany({
    where: {
      email: data.email,
    },
  });
};

export const deactivate = async (userId: string): Promise<void> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
    },
  });
  if (!user) {
    throw new AppError(404, "User not found");
  }
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      isActive: false,
      refreshToken: "",
    },
  });
};

export const submitContact = async (data: ContactForm): Promise<void> => {
  await prisma.contact.create({
    data,
  });
};
