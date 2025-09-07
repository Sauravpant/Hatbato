import { Router } from "express";
import { getCategory } from "../controllers/category.controller.ts";

const router = Router();

router.get("/get", getCategory);


export default router;
