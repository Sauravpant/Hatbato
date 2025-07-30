import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_SECRET_KEY!,
});

export const uploadToCloudinary = async (filePath: string): Promise<any> => {
  try {
    if (!filePath) return null;
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
      folder:"BhetBato"
    });
    fs.unlinkSync(filePath);
    return response;
  } catch (err) {
    fs.existsSync(filePath) && fs.unlinkSync(filePath);
    throw err;
  }
};

export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
  } catch (err) {
    throw err;
  }
};