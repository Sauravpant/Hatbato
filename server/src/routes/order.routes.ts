import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { verifyUser } from "../middlewares/user-verify.middleware";
import { createBuyRequest, getMyRequests, getReceivedRequests, acceptOrder, rejectOrder, cancelOrderRequest } from "../controllers/order.controller";

const router = Router();

router.post("/request/:productId", verifyJWT, verifyUser, createBuyRequest);
router.get("/request/my", verifyJWT, verifyUser, getMyRequests);
router.get("/request/received", verifyJWT, verifyUser, getReceivedRequests);
router.patch("/request/accept/:orderId", verifyJWT, verifyUser, acceptOrder);
router.patch("/request/reject/:orderId", verifyJWT, verifyUser, rejectOrder);
router.delete("/request/delete/:orderId", verifyJWT, verifyUser, cancelOrderRequest);

export default router;
