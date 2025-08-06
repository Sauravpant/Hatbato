import { Router } from "express";
import {
  createReview,
  updateReview,
  deleteReview,
  getMyGivenReviews,
  getMyReceivedReviews,
  getAverageData,
  getSellerStats,
} from "../controllers/review.controller.ts";
import { verifyJWT } from "../middlewares/auth.middleware.ts";

const router = Router();

router.post("/:sellerId", verifyJWT, createReview);
router.patch("/update/:reviewId", verifyJWT, updateReview);
router.delete("/delete/:reviewId", verifyJWT, deleteReview);
router.get("/my/given", verifyJWT, getMyGivenReviews);
router.get("/my/received", verifyJWT, getMyReceivedReviews);
router.get("/my/average", verifyJWT, getAverageData);
router.get("/my/stats", verifyJWT, getSellerStats);

export default router;
