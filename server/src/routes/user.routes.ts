import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.ts";
import { deleteProfilePicture, deleteUser, getUser, updateProfileDetails, uploadProfilePicture } from "../controllers/user.controller.ts";
import { upload } from "../middlewares/multer.middleware.ts";

const router = Router();
router.get("/me", verifyJWT, getUser);
router.patch("/upload-picture", verifyJWT, upload.single("profilePicture"), uploadProfilePicture);
router.delete("/delete-picture", verifyJWT, deleteProfilePicture);
router.delete("/delete-user", verifyJWT, deleteUser);
router.patch("/update-details", verifyJWT, updateProfileDetails);
export default router;
