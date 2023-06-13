// Vendors
import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    items: { type: Array, required: true },
    client: { type: mongoose.Types.ObjectId, required: true },
    userId: { type: mongoose.Types.ObjectId, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    issuedDate: { type: Date, required: true },
    paymentDeadline: { type: Date, required: true },
  },
  { collection: "Invoice", timestamps: true }
);

export const Invoice =
  mongoose.models.Invoice || mongoose.model("Invoice", Schema);
