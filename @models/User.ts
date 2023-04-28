// Vendors
import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
  },
  { collection: "Users", timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", Schema);
