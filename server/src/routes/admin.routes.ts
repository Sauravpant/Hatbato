import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.ts";
import { verifyAdmin } from "../middlewares/admin-verify.middleware.ts";
import { deleteUser, getAllUsers, getOrderStats, getProductStats, getReportStats, getUserById, getUserStats } from "../controllers/admin.controller.ts";

const router = Router();

router.use(verifyJWT);
router.use(verifyAdmin);
// Dashboard stats routes
router.get("/stats/user", getUserStats);
router.get("/stats/product", getProductStats);
router.get("/stats/order", getOrderStats);
router.get("/stats/report", getReportStats);

//User management
router.get("/get-user/all",getAllUsers);
router.get("/get-user/:userId",getUserById);
router.delete("/delete-user/:userId",deleteUser);



export default router;
