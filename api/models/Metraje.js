import mongoose from "mongoose";

const metrajeSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    tipo: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("Metraje", metrajeSchema);