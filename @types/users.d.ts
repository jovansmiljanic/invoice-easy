// Vendor types
import type { PopulatedDoc } from "mongoose";
import mongoose from "mongoose";

export interface User {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  companyName?: string;
  companyAddress?: string;
  zipCode?: string;
  taxNumber?: string;
  ttr?: string;
  bic?: string;
  phoneNumber?: string;
  user: PopulatedDoc<User>;
}
