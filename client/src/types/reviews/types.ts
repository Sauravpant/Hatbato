export interface BuyerReview {
  id: string;
  createdAt: Date;
  sellerId: string;
  reviewerId: string;
  rating: number;
  comment: string;
  seller: {
    name: string;
  };
}

export interface SellerReview {
  id: string;
  createdAt: Date;
  sellerId: string;
  reviewerId: string;
  rating: number;
  comment: string;
  reviewer: {
    name: string;
  };
}

export interface SellerAverage {
  averageRating: number;
  totalReviews: number;
}

export interface RatingStats {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: string;
  message: string;
  data: T;
}
