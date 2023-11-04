// Vendor types
import type { NextRouter } from "next/router";

// Vendor
import axios, { AxiosResponse } from "axios";

// Vendor types
import type { Types } from "mongoose";

interface DeleteItem {
  id: Types.ObjectId;
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
      router.asPath === "/clients" ? router.push("/clients") : router.push("/");
    })
    .catch(({ response }) => {
      // Set error message
      console.log(response?.statusText);
    });
};
