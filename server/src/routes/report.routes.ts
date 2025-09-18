import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { deleteReport, getAllReports, reportProduct, reportUser } from "../controllers/report.controller";
import { verifyUser } from "../middlewares/user-verify.middleware";

const router = Router();

router.post("/user/:userId", verifyJWT, verifyUser, reportUser);
router.post("/product/:productId", verifyJWT, verifyUser, reportProduct);
router.delete("/delete/:reportId", verifyJWT, verifyUser, deleteReport);
router.get("/get-all-reports", verifyJWT, verifyUser, getAllReports);

export default router;
