import express from "express";
import { generateContent, testAI } from "../controllers/aiController.js";

const router = express.Router();
// The AI assistant is a public, provider-neutral endpoint. It does not require
// authentication because it does not access user-specific data.
router.post("/generate", generateContent);
// Provider-neutral test endpoint (does not require auth so it is easy to test).
router.post("/test", testAI);

export default router;
