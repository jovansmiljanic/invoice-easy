// Vendor types
import type { NextRouter } from "next/router";

// Vendors
import axios from "axios";
import type mongoose from "mongoose";

interface InvoicePaid {
  _id: mongoose.Types.ObjectId;
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
