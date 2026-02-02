import express from "express";
import upload from "../middleware/upload.js";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";

const foodRouter = express.Router();

foodRouter.post("/add",(req, res, next) => {next()},upload.single("image"),(err, req, res, next) => {
if (err) {
      console.log("MULTER ERROR", err);
      return res.status(500).json({ error: err.message });
    }
    next();
  },
  addFood
);

foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;