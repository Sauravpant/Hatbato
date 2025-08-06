import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.ts";
import {
  createBuyRequest,
  getMyRequests,
  getReceivedRequests,
  acceptOrder,
  rejectOrder,
  cancelOrderRequest,
} from "../controllers/order.controller.ts";

const router = Router();

router.post("/request/:productId", verifyJWT, createBuyRequest);
router.get("/request/my", verifyJWT, getMyRequests);
router.get("/request/received", verifyJWT, getReceivedRequests);
router.patch("/request/accept/:orderId", verifyJWT, acceptOrder);
router.patch("/request/reject/:orderId", verifyJWT, rejectOrder);
router.delete("/request/delete/:orderId", verifyJWT, cancelOrderRequest);

export default router;
