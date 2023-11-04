// Vendor types
import type { Types, Document } from "mongoose";

export interface Client {
  _id: Types.ObjectId;
  owner: Types.ObjectId;
  clientName: string;
  clientAddress: string;
  zipCode: string;
  city: string;
  country: string;
  taxNumber: string;
  registrationNumber: string;
  client?: Types.PopulatedDoc<Client & Document>;
}

export interface IClientFormValues {
  clientName?: string;
  clientAddress?: string;
  city?: string;
  country?: string;
  zipCode?: string;
  taxNumber?: string;
  registrationNumber?: string;
}
