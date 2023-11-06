// Vendor types
import type { Types, Document } from "mongoose";

export interface Product {
  _id: Types.ObjectId;
  owner: Types.ObjectId;
  name: string;
  price: string;
  product?: Types.PopulatedDoc<Product & Document>;
}
