// Vendor types
import type { PopulatedDoc } from "mongoose";
import mongoose from "mongoose";

export interface MyAccount {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  companyName: string;
  companyAddress: string;
  zipCode: string;
  taxNumber: string;
  ttr: string;
  bic: string;
  email: string;
  phoneNumber: string;
  myAccount: PopulatedDoc<MyAccount>;
}
