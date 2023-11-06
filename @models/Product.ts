// Vendors
import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    owner: { type: mongoose.Types.ObjectId },
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { collection: "Product", timestamps: true }
);

export const Product =
  mongoose.models.Product || mongoose.model("Product", Schema);
