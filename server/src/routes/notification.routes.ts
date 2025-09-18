import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { getAllNotificatons, markAllNotificationsAsRead, markNotificationAsRead } from "../controllers/notification.controller";

const router = Router();

router.get("/", verifyJWT, getAllNotificatons);
router.patch("/mark-read/:id", verifyJWT, markNotificationAsRead);
router.patch("/mark-all-read", verifyJWT, markAllNotificationsAsRead);

export default router;
