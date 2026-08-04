import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, default: "" },
    language: { type: String, default: "en" },
  },
  { timestamps: true }
);

export default mongoose.model("Document", documentSchema);