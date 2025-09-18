import { Router } from "express";
import {
  createReview,
  updateReview,
  deleteReview,
  getMyGivenReviews,
  getMyReceivedReviews,
  getAverageData,
  getSellerStats,
} from "../controllers/review.controller";
import { verifyJWT } from "../middlewares/auth.middleware";
import { verifyUser } from "../middlewares/user-verify.middleware";

const router = Router();

router.post("/:sellerId", verifyJWT, verifyUser, createReview);
router.patch("/update/:reviewId", verifyJWT, verifyUser, updateReview);
router.delete("/delete/:reviewId", verifyJWT, deleteReview);
router.get("/my/given", verifyJWT, getMyGivenReviews);
router.get("/my/received", verifyJWT, getMyReceivedReviews);
router.get("/my/average", verifyJWT, getAverageData);
router.get("/my/stats", verifyJWT, getSellerStats);

export default router;
