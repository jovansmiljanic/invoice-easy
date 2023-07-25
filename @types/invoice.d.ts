// Vendor types
import type { PopulatedDoc } from "mongoose";
import mongoose from "mongoose";

type Item = {
  name: string;
  cost: number;
  qty: number;
  price: number;
};

type Client = {
  clientName: string;
  clientAddress: string;
  zipCode: string;
  taxNumber: string;
  city: string;
  country: string;
};

export interface Invoice {
  _id: mongoose.Types.ObjectId;
  items: Item[];
  client: Client;
  startDate: Date;
  endDate: Date;
  issuedDate: Date;
  paymentDeadline: Date;
  totalPrice: string;
  status: string;
  year?: string;
  tax?: string;
  invoiceNumber: number;
  createdAt?: number;
  updatedAt?: number;
  invoice: PopulatedDoc<Invoice>;
}
