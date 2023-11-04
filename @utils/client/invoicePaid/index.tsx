// Vendor types
import type { NextRouter } from "next/router";

// Vendors
import axios from "axios";

// Vendor types
import type { Types } from "mongoose";

interface InvoicePaid {
  _id: Types.ObjectId;
  router: NextRouter;
}
export const invoicePaid = async ({ _id, router }: InvoicePaid) => {
  await axios
    .put("/api/invoice", { _id, status: "1" })
    .then((res) => {
      router.push("/");
    })
    .catch((err) => {
      console.log(err);
    });
};
