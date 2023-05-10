// Vendor types
import type { PopulatedDoc } from "mongoose";
import mongoose from "mongoose";

export interface Company {
  _id: mongoose.Types.ObjectId;
  companyName: string;
  companyAddress: string;
  zipCode: string;
  taxNumber: string;
  company: PopulatedDoc<Company>;
}
