import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.ts";
import { verifyUser } from "../middlewares/user-verify.middleware.ts";
import { upload } from "../middlewares/multer.middleware.ts";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getMyProducts,
  getProductById,
  updateProduct,
} from "../controllers/product.controller.ts";
const router = Router();
router.get("/",getAllProducts);
router.post("/create", verifyJWT, verifyUser,upload.single("productImage"), createProduct);
router.get("/my-products", verifyJWT, verifyUser,getMyProducts);
router.get("/get/:id", verifyJWT, getProductById);
router.delete("/delete-product/:productId", verifyJWT,verifyUser, deleteProduct);
router.patch("/update/:productId", verifyJWT,verifyUser, upload.single("imagePath"), updateProduct);
export default router;
