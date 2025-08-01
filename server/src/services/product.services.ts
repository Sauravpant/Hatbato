import { safeUserSelect } from "../contants.ts";
import { prisma } from "../db/config.ts";
import { ProductType } from "../types/product.types.ts";
import { AppError } from "../utils/app-error.ts";
import { uploadToCloudinary } from "../utils/cloudinary.ts";

export const create = async (productData: ProductType): Promise<any> => {
  // Check if user exists
  const user = await prisma.user.findUnique({
    where: {
      id: productData.userid,
    },
    select: safeUserSelect,
  });
  if (!user) {
    throw new AppError(404, "User does not exist.");
  }

  // Check if category exists
  const category = await prisma.category.findFirst({
    where: {
      name: productData.category,
    },
  });
  if (!category) {
    throw new AppError(404, "Category does not exist. Please enter a valid category.");
  }

  // Upload product image to cloud storage
  const uploadedImage = await uploadToCloudinary(productData.productImage);
  if (!uploadedImage) {
    throw new AppError(500, "Failed to upload image. Please try again.");
  }

  // Insert product into database 
  const result = await prisma.$queryRaw`
    INSERT INTO "Product" (
      title, description, price, address,
      location, latitude, longitude,
      "imageUrl", "imagePublicId", "deliveryAvailable",
      status, "postedAt", "userId", "categoryId"
    ) VALUES (
      ${productData.title},
      ${productData.description},
      ${productData.price},
      ${productData.address},
      ST_SetSRID(ST_MakePoint(${productData.longitude}, ${productData.latitude}), 4326),
      ${productData.latitude},
      ${productData.longitude},
      ${uploadedImage.secure_url},
      ${uploadedImage.public_id},
      ${productData.deliveryAvailable},
      ${productData.status}::"ProductStatus",
      NOW(),
      ${productData.userid},
      ${category.id}
    ) RETURNING id, title, description, price, address, latitude, longitude, "imageUrl", "imagePublicId", "deliveryAvailable", status, "postedAt", "userId", "categoryId";
  `;
  const { imagePublicId, ...product } = result[0];
  return { product, user, category };
};
