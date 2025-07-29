import { Router } from "express";
import { loginUser, logOutUser, registerUser } from "../controllers/auth.controller.ts";
import { verifyJWT } from "../middlewares/auth.middleware.ts";
const router = Router();

router.post("/register-user", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyJWT, logOutUser);

export default router;
