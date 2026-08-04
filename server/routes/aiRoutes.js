import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { generateContent } from "../controllers/aiController.js";

const router = express.Router();
router.post("/generate", protect, generateContent);

export default router;