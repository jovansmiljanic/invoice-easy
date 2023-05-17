// Vendors
import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    items: { type: Array, required: true },
    clientId: { type: mongoose.Types.ObjectId, required: true },
    userId: { type: mongoose.Types.ObjectId, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
  },
  { collection: "Invoice", timestamps: true }
);

export const Invoice =
  mongoose.models.Invoice || mongoose.model("Invoice", Schema);
