// Vendor types
import type { NextRouter } from "next/router";

// Vendor
import axios, { AxiosResponse } from "axios";
import type mongoose from "mongoose";

interface DeleteItem {
  id: mongoose.Types.ObjectId;
  router: NextRouter;
  path: string;
}

export const deleteItem = async ({ id, router, path }: DeleteItem) => {
  await axios({
    method: "DELETE",
    url: `/api/${path}`,
    data: id,
  })
    .then((res: AxiosResponse) => {
      router.push("/");
    })
    .catch(({ response }) => {
      // Set error message
      console.log(response?.statusText);
    });
};
