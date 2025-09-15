import { prisma } from "../db/config.ts";
import { AppError } from "../utils/app-error.ts";
import type { CreateReview, UpdateReview } from "../validators/review.validator.ts";
import checkContent from "../utils/ai-client.ts";
import { BuyerReview, SellerAverage, SellerReview } from "../types/review.types,.ts";
export const handleCreateReview = async (reviewData: CreateReview, sellerId: string, userId: string): Promise<void> => {
  //Check the review for any inappropriate content
  const isNotSafe = await checkContent(`Review:${reviewData.comment}`);
  if (isNotSafe) {
    throw new AppError(400, "Inappropriate content detected");
  }

  if (sellerId === userId) {
    throw new AppError(403, "You can't review yourself.");
  }

  const seller = await prisma.user.findUnique({
    where: { id: sellerId },
    select: { id: true },
  });

  if (!seller) {
    throw new AppError(404, "Seller does not exist.");
  }

  const existingReview = await prisma.review.findFirst({
    where: {
      reviewerId: userId,
      sellerId: sellerId,
    },
  });

  if (existingReview) {
    throw new AppError(409, "You have already reviewed this seller.");
  }

  await prisma.review.create({
    data: {
      ...reviewData,
      sellerId,
      reviewerId: userId,
    },
  });
};

export const handleUpdateReview = async (reviewData: UpdateReview, reviewId: string, userId: string): Promise<void> => {
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
  });

  if (!review) {
    throw new AppError(404, "Review does not exist.");
  }

  if (review.sellerId === userId) {
    throw new AppError(403, "You can't update the reviews given to you");
  }

  if (review.reviewerId !== userId) {
    throw new AppError(403, "You are not authorized to update this review.");
  }

  await prisma.review.update({
    where: { id: reviewId },
    data: { ...reviewData },
  });
};

export const handleDeleteReview = async (reviewId: string, userId: string): Promise<void> => {
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
  });

  if (!review) {
    throw new AppError(404, "Review does not exist.");
  }

  if (review.sellerId === userId) {
    throw new AppError(403, "You can't delete the reviews given to you");
  }

  if (review.reviewerId !== userId) {
    throw new AppError(403, "You are not authorized to delete this review.");
  }

  await prisma.review.delete({
    where: {
      id: reviewId,
    },
  });
};

export const userReviewed = async (userId: string): Promise<BuyerReview[]> => {
  const reviews = await prisma.review.findMany({
    where: {
      reviewerId: userId,
    },
    include: {
      seller: {
        select: {
          name: true,
        },
      },
    },
  });

  if (reviews.length === 0) {
    throw new AppError(404, "No reviews found by this user");
  }

  return reviews;
};

export const userReviews = async (userId: string): Promise<SellerReview[]> => {
  const reviews = await prisma.review.findMany({
    where: {
      sellerId: userId,
    },
    include: {
      reviewer: {
        select: {
          name: true,
        },
      },
    },
  });

  if (reviews.length === 0) {
    throw new AppError(404, "No reviews found for this user");
  }
  return reviews;
};

export const getAverage = async (sellerId: string): Promise<SellerAverage> => {
  const result = await prisma.review.aggregate({
    where: { sellerId },
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
  });

  return {
    averageRating: result._avg.rating || 0,
    totalReviews: result._count.rating,
  };
};

export const getStats = async (sellerId: string): Promise<Record<number, number>> => {
  const stats = await prisma.review.groupBy({
    by: ["rating"],
    where: { sellerId },
    _count: {
      rating: true,
    },
    orderBy: {
      rating: "desc",
    },
  });

  const result: Record<number, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  stats.forEach(({ rating, _count }) => {
    result[rating] = _count.rating;
  });

  return result;
};
