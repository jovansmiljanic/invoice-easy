// Vendor types
import type { PopulatedDoc } from "mongoose";
import mongoose from "mongoose";

export interface Invoice {
  _id: mongoose.Types.ObjectId;
  items: any[];
  client: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  issuedDate: Date;
  paymentDeadline: Date;
  totalPrice: string;
  invoice: PopulatedDoc<Invoice>;
}
