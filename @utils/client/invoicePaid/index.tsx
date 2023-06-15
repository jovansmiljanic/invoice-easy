import axios from "axios";

export const invoicePaid = async ({ _id, router }: any) => {
  await axios
    .put("/api/invoice", { _id, status: "1" })
    .then((res) => {
      router.push("/");
    })
    .catch((err) => {
      console.log(err);
    });
};
