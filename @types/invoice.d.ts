// Vendor types
import type { PopulatedDoc } from "mongoose";
import mongoose from "mongoose";

type Item = {
  name: string;
  description: string;
  cost: string;
  qty: string;
  price: string;
};

type Client = {
  clientName: string;
  clientAddress: string;
  zipCode: string;
  taxNumber: string;
};

export interface Invoice {
  _id: mongoose.Types.ObjectId;
  items: Item[];
  client: Client;
  userId: mongoose.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  issuedDate: Date;
  paymentDeadline: Date;
  totalPrice: string;
  payed: boolean;
  invoice: PopulatedDoc<Invoice>;
}
