import { Prisma } from "../../generated/prisma/index.js";

export type BuyerReview = Prisma.ReviewGetPayload<{
  include: {
    seller: {
      select: {
        name: true;
      };
    };
  };
}>;

export type SellerReview = Prisma.ReviewGetPayload<{
  include: {
    reviewer: {
      select: {
        name: true;
      };
    };
  };
}>;

export interface SellerAverage {
  averageRating: number;
  totalReviews: number;
}
