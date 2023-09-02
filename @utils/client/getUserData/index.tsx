import { getCookie } from "@utils/shared";

export const getUserData = () => {
  const userDataCookie = getCookie({ name: "user" });

  const parsedUserData = userDataCookie ? JSON.parse(userDataCookie) : null;

  return parsedUserData;
};
