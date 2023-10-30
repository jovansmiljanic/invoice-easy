export const deleteCookie = ({ res, name }: { res?: any; name: string }) => {
  if (typeof document === "undefined") {
    // On the server-side, you can delete a cookie by setting an expiration date in the past
    res.setHeader(
      "Set-Cookie",
      `${name}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/`
    );
  } else {
    // On the client-side, you can delete a cookie by setting its value to an empty string and an expiration date in the past
    const pastDate = new Date(0).toUTCString();
    document.cookie = `${name}=; expires=${pastDate}; path=/`;
  }
};
