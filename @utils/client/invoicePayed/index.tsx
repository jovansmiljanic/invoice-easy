import axios from "axios";

export const invoicePayed = async ({ _id, router }: any) => {
  await axios
    .put("/api/invoice", { _id, payed: true })
    .then((res) => {
      router.push("/");
    })
    .catch((err) => {
      console.log(err);
    });
};
