// Vendors
import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    owner: { type: mongoose.Types.ObjectId },
    clientName: { type: String, required: true },
    clientAddress: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: String, required: true },
    taxNumber: { type: String, required: true },
  },
  { collection: "Client", timestamps: true }
);

export const Client =
  mongoose.models.Client || mongoose.model("Client", Schema);
