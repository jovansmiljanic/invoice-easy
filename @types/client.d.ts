// Vendor types
import type { PopulatedDoc } from "mongoose";
import mongoose from "mongoose";

export interface Client {
  _id: mongoose.Types.ObjectId;
  owner: mongoose.Types.ObjectId;
  clientName: string;
  clientAddress: string;
  zipCode: string;
  city: string;
  country: string;
  taxNumber: string;
  registrationNumber: string;
  client?: PopulatedDoc<Client>;
}
