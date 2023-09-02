export const getCookie = ({ req, name }: { req?: any; name: string }) => {
  if (typeof window !== "undefined") {
    const cookieHeader = req ? req.headers.cookie : document.cookie;
    if (!cookieHeader) {
      return null;
    }

    const cookies = cookieHeader.split("; ");

    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
  }
  return null;
};
