import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.ts";
import {
  deactivateAccount,
  deleteProfilePicture,
  deleteUser,
  getUser,
  getUserById,
  resetPassword,
  sendOtp,
  submitForm,
  updateProfileDetails,
  uploadProfilePicture,
} from "../controllers/user.controller.ts";
import { upload } from "../middlewares/multer.middleware.ts";

const router = Router();
router.get("/me", verifyJWT, getUser);
router.get("/:id", verifyJWT, getUserById);
router.patch("/upload-picture", verifyJWT, upload.single("profilePicture"), uploadProfilePicture);
router.delete("/delete-picture", verifyJWT, deleteProfilePicture);
router.delete("/delete-user", verifyJWT, deleteUser);
router.patch("/update-details", verifyJWT, updateProfileDetails);
router.post("/forget-password", sendOtp);
router.patch("/reset-password", resetPassword);
router.patch("/deactivate-account", verifyJWT, deactivateAccount);
router.post("/contact", submitForm);
export default router;
