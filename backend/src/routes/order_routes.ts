import express from "express";
import authMiddleware from "../middlewares/auth";
import { placeOrder } from "../controllers/order_controller";

const router = express.Router();

// Place an Order - Protected Route
router.post("/", authMiddleware, placeOrder);

export default router;