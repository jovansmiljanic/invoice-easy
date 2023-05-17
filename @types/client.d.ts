// Vendor types
import type { PopulatedDoc } from "mongoose";
import mongoose from "mongoose";

export interface Client {
  _id: mongoose.Types.ObjectId;
  clientName: string;
  clientAddress: string;
  zipCode: string;
  taxNumber: string;
  client: PopulatedDoc<Client>;
}
