import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createDocument,
  getDocuments,
  updateDocument,
  deleteDocument,
} from "../controllers/documentController.js";

const router = express.Router();
router.use(protect);
router.post("/", createDocument);
router.get("/", getDocuments);
router.put("/:id", updateDocument);
router.delete("/:id", deleteDocument);

export default router;