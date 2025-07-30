import { Router } from "express";
import { changePassword, loginUser, logOutUser, registerUser, sendOtp, verifyAccount } from "../controllers/auth.controller.ts";
import { verifyJWT } from "../middlewares/auth.middleware.ts";
const router = Router();

router.post("/register-user", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT, logOutUser);
router.patch("/change-password", verifyJWT, changePassword);
router.post("/send-otp", verifyJWT, sendOtp);
router.patch("/verify-account", verifyJWT, verifyAccount);

export default router;
