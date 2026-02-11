import express from "express";
import authMiddleware from "../middleware/auth.js";
import { placeOrder, userOrders } from "../controllers/orderController.js";
import { updateStatus } from "../controllers/orderController.js";

const router = express.Router();

router.post("/status", updateStatus);
router.post("/place", authMiddleware, placeOrder);
router.post("/userorders", authMiddleware, userOrders);

export default router;