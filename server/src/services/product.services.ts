import type { Product } from "../../generated/prisma/index.js";
import { safeUserSelect } from "../contants.ts";
import { prisma } from "../db/config.ts";
import { ProductById, ProductType, UpdateProduct } from "../types/product.types.ts";
import checkContent from "../utils/ai-client.ts";
import { AppError } from "../utils/app-error.ts";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinary.ts";
import { GetProduct } from "../validators/product.validator.ts";

export const create = async (productData: ProductType): Promise<void> => {
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

  // Check if the content is inappropriate
  const isNotSafe = await checkContent(`Title:${productData.title}, Description:${productData.description},Address:${productData.address}`);
  if (isNotSafe) {
    throw new AppError(400, "The product details contains some inappropriate words");
  }

  // Check if category exists
  const category = await prisma.category.findFirst({
    where: {
      name: productData.category,
    },
    select: {
      id: true,
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
      id,title, description, price, address,
      location, latitude, longitude,
      "imageUrl", "imagePublicId", "deliveryAvailable",
      status, "postedAt", "userId", "categoryId"
    ) VALUES (
      gen_random_uuid(),
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
};

export const getById = async (productId: string): Promise<ProductById> => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          address: true,
          contactNumber: true,
          email: true,
          isVerified: true,
          imageUrl: true,
        },
      },
    },
  });
  if (!product) {
    throw new AppError(404, "Product doesnt exist");
  }
  const avgRatings = await prisma.review.aggregate({
    _avg: {
      rating: true,
    },
    where: {
      sellerId: product.user.id,
    },
  });

  const totalProducts = await prisma.product.aggregate({
    _count: {
      userId: true,
    },
    where: {
      userId: product.user.id,
    },
  });
  const {...userData } = product.user;
  return {
    ...product,
    categoryId: product.categoryId,
    totalProducts: totalProducts._count.userId,
    user: {
      ...userData,
      averageRating: avgRatings._avg.rating,
    },
  };
};

export const deleteItem = async (productId: string, userId: string): Promise<void> => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) {
    throw new AppError(404, "Product doesnt exist");
  }
  if (product.userId !== userId) {
    throw new AppError(401, "Unauthorized to delete the product");
  }
  await prisma.product.delete({
    where: {
      id: productId,
    },
  });
};

export const getMyItems = async (userId: string): Promise<Product[]> => {
  const products = await prisma.product.findMany({
    where: {
      userId,
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });
  return products;
};
export const updateItem = async (productData: UpdateProduct, productId: string, userId: string, imagePath?: string): Promise<Product> => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) {
    throw new AppError(404, "Product doesnt exist");
  }
  if (product.userId !== userId) {
    throw new AppError(401, "Unauthorized to update the product");
  }
  let uploadedImage = null;
  let imagePublicId = product.imagePublicId;
  let imageUrl = product.imageUrl;

  //If the new image is uploaded delete the old image from the cloud and upload the new one

  if (imagePath) {
    await deleteFromCloudinary(product.imagePublicId);
    uploadedImage = await uploadToCloudinary(imagePath);
    imagePublicId = uploadedImage.public_id;
    imageUrl = uploadedImage.secure_url;
  }

  let categoryId;
  if (productData?.category) {
    const category = await prisma.category.findFirst({
      where: {
        name: productData.category,
      },
    });
    if (!category) {
      throw new AppError(404, "Category doesnt exist");
    }
    categoryId = category.id;
  }
  const updateData: any = {
    ...(productData.title && { title: productData.title }),
    ...(productData.description && { description: productData.description }),
    ...(productData.price && { price: productData.price }),
    ...(productData.status && { status: productData.status }),
    ...(categoryId && { categoryId }),
    ...(uploadedImage && {
      imageUrl: uploadedImage.secure_url,
      imagePublicId: uploadedImage.public_id,
    }),
  };

  const updatedProduct = await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      ...updateData,
    },
  });
  return updatedProduct;
};

export const getAll = async (filters: GetProduct): Promise<any> => {
  const { search, minPrice, maxPrice, category, status, sort, lat, lng, page = 1, limit = 10 } = filters;
  let { radius } = filters;
  radius *= 1000;

  const whereClauses: string[] = [];
  const values: any[] = [];
  let index = 1;
  //Filter by search
  if (search) {
    //ILIKE in PostgreSQL helps searching the patterns ignoring the case sensitivity
    whereClauses.push(`("title" ILIKE $${index} OR "description" ILIKE $${index})`);
    values.push(`%${search}%`);
    index++;
  }
  // Filter by price
  if (minPrice !== undefined) {
    whereClauses.push(`"price" >= $${index++}`);
    values.push(minPrice);
  }

  if (maxPrice !== undefined) {
    whereClauses.push(`"price" <= $${index++}`);
    values.push(maxPrice);
  }

  // Filter by status (new,old,like_new etc)
  if (status) {
    whereClauses.push(`"status" = $${index++}::"ProductStatus"`);
    values.push(status);
  }

  // Filter by category
  if (category) {
    const catg = await prisma.category.findFirst({ where: { slug: category } });
    if (!catg) {
      throw new AppError(404, "Category doesnt exist");
    }
    whereClauses.push(`"categoryId" IN (SELECT id FROM "Category" WHERE slug  = $${index++})`);
    values.push(category);
  }

  // Geo filtering using PostGIS (Filter within some distance from users location)

  if (lat !== undefined && lng !== undefined && radius !== undefined) {
    whereClauses.push(`
      ST_DWithin(
        "location",
        ST_MakePoint($${index++}, $${index++})::geography,
        $${index++}
      )
    `);
    values.push(lng, lat, radius);
  }

  // Pagination & Sorting
  const offset = (page - 1) * limit;
  const orderBy = sort === "asc" ? `"postedAt" ASC` : `"postedAt" DESC`;
  whereClauses.push(`"isBought" = false`);

  // Combine all the where logic
  const whereClause = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

  //Using raw query as prisma doesnt support PostGIS
  const products = await prisma.$queryRawUnsafe(
    `
  SELECT id, title, description, price, address, latitude, longitude, "imageUrl", "imagePublicId", "deliveryAvailable", status, "postedAt", "userId", "categoryId"
  FROM "Product"
  ${whereClause}
  ORDER BY ${orderBy}
  LIMIT $${index++} OFFSET $${index}
  `,
    ...values,
    limit,
    offset
  );

  const countResult = await prisma.$queryRawUnsafe(
    `
    SELECT COUNT(*) FROM "Product"
    ${whereClause}
    `,
    ...values
  );

  const total = Number(countResult[0].count);
  const totalPages = Math.ceil(total / limit);
  return {
    products,
    pagination: {
      total,
      page,
      limit,
      totalPages,
    },
  };
};
