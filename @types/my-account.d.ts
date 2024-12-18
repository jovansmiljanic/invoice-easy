// Vendor types
import type { Types, Document } from "mongoose";

export interface MyAccount {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  taxNumber: string;
  registrationNumber?: string;

  companyField: string;
  companyName: string;
  companyAddress: string;
  zipCode: string;
  city: string;
  country: string;

  bankName: string;
  trr: string;
  bic?: string;

  logo: string;
  signInvoice: boolean;
  myAccount: Types.PopulatedDoc<MyAccount & Document>;
}

export interface IMyAccountForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  taxNumber: string;
  registrationNumber: string;

  companyField: string;
  companyName: string;
  companyAddress: string;
  zipCode: string;
  city: string;
  country: string;

  bankName: string;
  trr: string;
  bic?: string;
}

export interface IContentValues {
  taxNumber: string;
  registrationNumber: string;
  trr: string;
  bic: string;
  email: string;
  phone: string;
  dateFrom: string;
  dateTo: string;
  paymentDeadline: string;
  item: string;
  cost: string;
  qty: string;
  unit: string;
  price: string;
  subTotal: string;
  tax: string;
  total: string;
  invoice: string;
  ddvParagraphOne: string;
  ddvParagraphTwo: string;
  currency: string;
  no: string;
  customText?: string;
  issuedAt?: string;
  discount?: string;
}
