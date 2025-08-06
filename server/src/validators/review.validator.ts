import { z } from "zod";

export const createReviewSchema = z.object({
  rating: z.coerce.number().min(0, "Rating should be in the range 0-5").max(5, "Rating should be in the range 0-5"),
  comment: z.string().max(200, "Review can be at most 200 characters").optional(),
});

export type CreateReview = z.infer<typeof createReviewSchema>;

export const updateReviewSchema = z.object({
  rating: z.coerce.number().min(0, "Rating should be in the range 0-5").max(5, "Rating should be in the range 0-5"),
  comment: z.string().max(200, "Review can be at most 200 characters").optional(),
});

export type UpdateReview = z.infer<typeof updateReviewSchema>;
