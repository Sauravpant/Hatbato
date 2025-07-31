import { User } from "../../generated/prisma/index.js";
import { safeUserSelect } from "../contants.ts";
import { prisma } from "../db/config.ts";
import { ImageUpload, UpdateResponse, UserData } from "../types/user.types.ts";
import { AppError } from "../utils/app-error.ts";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinary.ts";

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
    select:safeUserSelect
  });
  if (!user) {
    throw new AppError(404, "User doesnt exist");
  }
  return user;
};
