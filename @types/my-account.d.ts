// Vendor types
import type { PopulatedDoc } from "mongoose";
import mongoose from "mongoose";

export interface MyAccount {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  taxNumber: string;

  companyField: string;
  companyName: string;
  companyAddress: string;
  zipCode: string;
  city: string;
  country: string;

  bankName: string;
  ttr: string;
  bic: string;
  myAccount: PopulatedDoc<MyAccount>;
}
