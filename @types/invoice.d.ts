// Vendor types
import type { Types, Document } from "mongoose";

export interface IInvoiceItem {
  name: string;
  cost: number;
  qty: number;
  price: number;
}

type Client = {
  clientName: string;
  clientAddress: string;
  zipCode: string;
  taxNumber: string;
  registrationNumber?: string;
  city: string;
  country: string;
};

export interface Invoice extends Document {
  _id: Types.ObjectId;
  items: IInvoiceItem[];
  client: Client;
  startDate: Date;
  endDate: Date;
  issuedDate: Date;
  paymentDeadline: Date;
  totalPrice: string;
  status: string;
  year?: string;
  tax?: any;
  invoiceNumber: number;
  customText?: string;
  createdAt?: number;
  discount?: number;
  updatedAt?: number;
  invoice?: Types.PopulatedDoc<Invoice & Document>;
}
