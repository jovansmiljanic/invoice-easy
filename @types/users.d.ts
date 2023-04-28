// Vendor types
import type { PopulatedDoc } from "mongoose";
import mongoose from "mongoose";

export interface User {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  user: PopulatedDoc<User>;
}
