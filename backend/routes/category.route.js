import express from "express";
import upload from "../middleware/upload.js";
import { createCategory, getCategories, getCategory, updateCategory, deleteCategory,getAllProductsOfCategory } from "../controllers/categoryController.js";
const router = express.Router();
router.post("/", upload.single("image"), createCategory);
router.get("/", getCategories);
router.get("/:id", getCategory);
router.put("/:id",updateCategory);
router.delete("/:id",deleteCategory);
router.get("/allProducts/:id",getAllProductsOfCategory)

export default router;