import mongoose from "mongoose";

// Multilingual name fields (English, Sinhala, Tamil).
const nameSchema = new mongoose.Schema(
  {
    en: { type: String, required: true },
    si: { type: String, default: "" },
    ta: { type: String, default: "" },
  },
  { _id: false }
);

const officerNameSchema = new mongoose.Schema(
  {
    en: { type: String, default: "" },
    si: { type: String, default: "" },
    ta: { type: String, default: "" },
  },
  { _id: false }
);

const divisionSchema = new mongoose.Schema(
  {
    code: { type: String },
    name: { type: nameSchema, required: true },
    officerName: { type: officerNameSchema, default: { en: "", si: "", ta: "" } },
    contactNo: { type: String, default: "" },
  },
  { _id: false }
);

const districtSchema = new mongoose.Schema(
  {
    name: { type: nameSchema, required: true },
    divisions: [divisionSchema],
  },
  { _id: false }
);

const locationSchema = new mongoose.Schema(
  {
    name: { type: nameSchema, required: true, unique: true },
    districts: [districtSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Location", locationSchema);
