import express from "express";
import multer from "multer";
import { protect } from "../middleware/authMiddleware.js";
import {
  getInstructionSheet,
  uploadInstructionSheet,
  deleteSheet,
} from "../controllers/instructionSheetController.js";

const router = express.Router();

// Multer configured to keep file in memory (no disk writes). Memory storage
// keeps the PDF buffer in RAM so we can push it straight into GridFS.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

// Public: fetch an instruction sheet PDF for a service within a category.
// e.g. GET /api/services/identity-verification-certificates/residence-certificate/instruction-sheet
router.get(
  "/services/:serviceCategory/:subServiceSlug/instruction-sheet",
  getInstructionSheet
);

// Authenticated: upload/replace an instruction sheet PDF.
router.post(
  "/services/instruction-sheets",
  protect,
  upload.single("file"),
  uploadInstructionSheet
);

// Authenticated: delete an instruction sheet by its metadata id.
router.delete("/services/instruction-sheets/:id", protect, deleteSheet);

export default router;
