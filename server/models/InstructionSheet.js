import mongoose from "mongoose";

/**
 * Metadata record for a service instruction-sheet PDF.
 *
 * The actual PDF binary is stored in MongoDB GridFS (a separate `fs.files`
 * and `fs.chunks` collection pair). This document references the GridFS file
 * via its ObjectId (`fileId`) so the binary never needs to be embedded here.
 */
const instructionSheetSchema = new mongoose.Schema(
  {
    // Stable name used as the GridFS filename and download filename.
    filename: { type: String, required: true, unique: true },
    // Human-friendly original name (what admin uploaded / seed used).
    originalName: { type: String, required: true },
    contentType: { type: String, default: "application/pdf" },
    // Which service this sheet belongs to (e.g. "residence-certificate").
    service: { type: String, required: true },
    // Category slug the service belongs to.
    serviceCategory: { type: String, required: true },
    description: { type: String, default: "" },
    // Size of the PDF binary in bytes.
    fileSize: { type: Number, default: 0 },
    // GridFS file id (in the `fs.files` collection).
    fileId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("InstructionSheet", instructionSheetSchema);
