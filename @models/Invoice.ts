// Vendors
import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    owner: { type: mongoose.Types.ObjectId, required: true },
    items: { type: Array, required: true },
    client: { type: Object, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    issuedDate: { type: Date, required: true },
    paymentDeadline: { type: Date, required: true },
    status: { type: String, default: "2" },
  },
  { collection: "Invoice", timestamps: true }
);

export const Invoice =
  mongoose.models.Invoice || mongoose.model("Invoice", Schema);
