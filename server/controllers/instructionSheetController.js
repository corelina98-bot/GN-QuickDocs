import InstructionSheet from "../models/InstructionSheet.js";
import {
  storeInstructionSheet,
  streamInstructionSheet,
  deleteInstructionSheet,
} from "../services/gridfsService.js";

/**
 * GET an instruction-sheet PDF for a given service/category.
 *
 * Public endpoint (no auth): any visitor can view/download the sheet.
 * Streams the PDF binary from GridFS with a proper `application/pdf`
 * Content-Type, or returns 404 when the sheet does not exist.
 */
export const getInstructionSheet = async (req, res) => {
  const { serviceCategory, subServiceSlug } = req.params;
  try {
    const sheet = await InstructionSheet.findOne({
      serviceCategory,
      service: subServiceSlug,
    });

    if (!sheet) {
      return res.status(404).json({ message: "Instruction sheet not found" });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${sheet.filename}"`
    );
    res.setHeader("Content-Length", sheet.fileSize);

    await streamInstructionSheet(sheet.fileId, res);
  } catch (error) {
    // If the file was already deleted from GridFS but the metadata remains.
    if (error?.message?.includes("FileNotFound") || error?.code === "ENOENT") {
      return res.status(404).json({ message: "Instruction sheet not found" });
    }
    console.error("getInstructionSheet error:", error);
    // Don't send a second response if streaming already started.
    if (!res.headersSent) {
      return res
        .status(500)
        .json({ message: "Error retrieving instruction sheet" });
    }
    res.end();
  }
};

/**
 * POST upload/replace an instruction sheet PDF.
 *
 * Requires authentication (JWT protect via the route). Validates that the
 * uploaded file is a PDF (MIME type + extension) and within size limits.
 * If a sheet already exists for the same service, it is replaced (old GridFS
 * file deleted) rather than duplicated.
 */
export const uploadInstructionSheet = async (req, res) => {
  const { service, serviceCategory, description } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  if (!service || !serviceCategory) {
    return res
      .status(400)
      .json({ message: "service and serviceCategory are required" });
  }

  try {
    const { originalname, mimetype, size, buffer } = req.file;

    // ----- PDF validation -----
    const isPdfMime = mimetype === "application/pdf";
    const isPdfExt = originalname.toLowerCase().endsWith(".pdf");
    if (!isPdfMime || !isPdfExt) {
      return res
        .status(400)
        .json({ message: "Only PDF files are allowed" });
    }

    const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
    if (size > MAX_SIZE) {
      return res
        .status(400)
        .json({ message: "File too large (max 5 MB)" });
    }

    const filename = `${service}-instruction-sheet.pdf`;

    // Replace any existing sheet for this service (idempotent behaviour).
    const existing = await InstructionSheet.findOne({ service });
    if (existing) {
      await deleteInstructionSheet(existing.fileId).catch(() => {});
      await InstructionSheet.deleteOne({ _id: existing._id });
    }

    const fileId = await storeInstructionSheet(buffer, {
      filename,
      contentType: "application/pdf",
    });

    const sheet = await InstructionSheet.create({
      filename,
      originalName: originalname,
      contentType: "application/pdf",
      service,
      serviceCategory,
      description: description || "",
      fileSize: size,
      fileId,
    });

    res.status(201).json(sheet);
  } catch (error) {
    console.error("uploadInstructionSheet error:", error);
    res.status(500).json({ message: "Error uploading instruction sheet" });
  }
};

/**
 * DELETE an instruction sheet (authenticated).
 */
export const deleteSheet = async (req, res) => {
  try {
    const sheet = await InstructionSheet.findById(req.params.id);
    if (!sheet) {
      return res.status(404).json({ message: "Instruction sheet not found" });
    }
    await deleteInstructionSheet(sheet.fileId).catch(() => {});
    await InstructionSheet.deleteOne({ _id: sheet._id });
    res.json({ message: "Instruction sheet deleted" });
  } catch (error) {
    console.error("deleteSheet error:", error);
    res.status(500).json({ message: "Error deleting instruction sheet" });
  }
};
