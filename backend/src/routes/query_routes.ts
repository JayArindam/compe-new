import express from "express";
import authMiddleware from "../middlewares/auth";
import { sendQuery } from "../controllers/query_controller";

const router = express.Router();

// Send Query - Protected Route
router.post("/", authMiddleware, sendQuery);

export default router;