import express from "express";
import { generateContent } from "../controllers/aiController.js";

const router = express.Router();

// Note: The AI endpoint is intentionally not protected by the `protect`
// middleware because the current app has no login flow wired into the UI.
// Users reach the dashboard and AI Assistant directly, so requiring a JWT
// here would block the feature. If authentication is added later, re-enable
// the middleware.
router.post("/generate", generateContent);

export default router;
