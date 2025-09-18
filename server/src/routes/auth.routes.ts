import { Router } from "express";
import { changePassword, loginUser, logOutUser, refreshAccessToken, registerUser, sendOtp, verifyAccount } from "../controllers/auth.controller";
import { verifyJWT } from "../middlewares/auth.middleware";
const router = Router();

router.post("/register-user", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT, logOutUser);
router.patch("/change-password", verifyJWT, changePassword);
router.post("/send-otp", verifyJWT, sendOtp);
router.patch("/verify-account", verifyJWT, verifyAccount);
router.get("/refresh-token", refreshAccessToken);

export default router;
