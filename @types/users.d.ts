// Vendor types
import type { Types, Document } from "mongoose";

export interface User {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  companyName?: string;
  companyAddress?: string;
  zipCode?: string;
  taxNumber?: string;
  trr?: string;
  bic?: string;
  phoneNumber?: string;
  user: Types.PopulatedDoc<User & Document>;
}
