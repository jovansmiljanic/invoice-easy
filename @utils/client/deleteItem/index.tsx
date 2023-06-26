import axios, { AxiosResponse } from "axios";

export const deleteItem = async (id: any, router: any, path: string) => {
  await axios({
    method: "DELETE",
    url: `/api/${path}`,
    data: id,
  })
    .then((res: AxiosResponse) => {
      router.push(router.asPath);
    })
    .catch(({ response }) => {
      // Set error message
      console.log(response?.statusText);
    });
};
