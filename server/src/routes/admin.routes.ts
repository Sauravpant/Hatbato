import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.ts";
import { verifyAdmin } from "../middlewares/admin-verify.middleware.ts";
import {
  addCategory,
  deleteCategory,
  deleteProduct,
  deleteReview,
  deleteUser,
  getAllCategory,
  getAllReviews,
  getAllUsers,
  getCategoryDetails,
  getOrderStats,
  getProductStats,
  getReportStats,
  getUserById,
  getUserStats,
  updateCategory,
  getAllOrdersController,
  getAllReportsController,
  resolveReportController,
  deleteReportController,
  getCategoryInfo,
  getUserQueries,
  deleteQueries,
} from "../controllers/admin.controller.ts";
import { getAllProducts, getProductById } from "../controllers/product.controller.ts";

const router = Router();

router.use(verifyJWT);
router.use(verifyAdmin);

// Dashboard stats routes
router.get("/stats/user", getUserStats);
router.get("/stats/product", getProductStats);
router.get("/stats/order", getOrderStats);
router.get("/stats/report", getReportStats);

// User management
router.get("/get-user/all", getAllUsers);
router.get("/get-user/:userId", getUserById);
router.delete("/delete-user/:userId", deleteUser);

// Category management
router.post("/create-category", addCategory);
router.get("/get-category-info", getCategoryInfo);
router.get("/get-all-category", getAllCategory);
router.get("/get-single-category/:categoryId", getCategoryDetails);
router.delete("/delete-category/:categoryId", deleteCategory);
router.patch("/update-category/:categoryId", updateCategory);

// Product management
router.delete("/delete-product/:productId", deleteProduct);
router.get("/product",getAllProducts)
router.get("/get-all-products", getAllProducts);
router.get("/get-single-product/:id", getProductById);

// Review Management
router.get("/get-all-reviews", getAllReviews);
router.delete("/delete-review/:reviewId", deleteReview);

// Order Management
router.get("/get-all-orders", getAllOrdersController);

// Report Management
router.get("/get-all-reports", getAllReportsController);
router.patch("/resolve-report/:reportId", resolveReportController);
router.delete("/delete-report/:reportId", deleteReportController);

//Contact management
router.get("/contacts", getUserQueries);
router.delete("/delete-contact/:id", deleteQueries);

export default router;
