import mongoose from "mongoose";

const divisionSchema = new mongoose.Schema(
  {
    code: { type: String },
    name: { type: String, required: true },
  },
  { _id: false }
);

const districtSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    divisions: [divisionSchema],
  },
  { _id: false }
);

const locationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    districts: [districtSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Location", locationSchema);
