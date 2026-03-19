import express from "express";
import upload from "../middleware/upload.js";
import { addFood } from "../controllers/foodController.js";

const foodRouter = express.Router();

foodRouter.post(
  "/add",
  (req, res, next) => {
    console.log("🚀 FOOD ROUTE HIT");
    next();
  },
  upload.single("image"),
  addFood
);

export default foodRouter;
