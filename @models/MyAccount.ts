// Vendors
import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    companyAddress: { type: String, required: true },
    zipCode: { type: String, required: true },
    taxNumber: { type: String, required: true },
    ttr: { type: String, required: true },
    bic: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
  },
  { collection: "MyAccount", timestamps: true }
);

export const MyAccount =
  mongoose.models.MyAccount || mongoose.model("MyAccount", Schema);
