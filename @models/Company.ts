// Vendors
import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    companyAddress: { type: String, required: true },
    zipCode: { type: String, required: true },
    taxNumber: { type: String, required: true },
  },
  { collection: "Company", timestamps: true }
);

export const Company =
  mongoose.models.Company || mongoose.model("Company", Schema);
