// Vendors
import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    phoneNumber: { type: String },
    taxNumber: { type: String },
    registrationNumber: { type: String },

    companyField: { type: String },
    companyName: { type: String },
    companyAddress: { type: String },
    zipCode: { type: String },
    city: { type: String },
    country: { type: String },

    bankName: { type: String },
    trr: { type: String },
    bic: { type: String },
  },
  { collection: "Users", timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", Schema);
