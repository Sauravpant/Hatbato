import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.ts";
import { deleteReport, getAllReports, reportProduct, reportUser } from "../controllers/report.controller.ts";

const router = Router();

router.post("/user/:userId", verifyJWT, reportUser);
router.post("/product/:productId", verifyJWT, reportProduct);
router.delete("/delete/:reportId", verifyJWT, deleteReport);
router.get("/get-all-reports", verifyJWT, getAllReports);

export default router;
