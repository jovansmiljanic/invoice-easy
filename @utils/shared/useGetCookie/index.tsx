import { useState, useEffect } from "react";

export const useGetCookie = (name: string): string => {
  const [cookieValue, setCookieValue] = useState("");

  useEffect(() => {
    // This code runs only on the client side
    const value =
      document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() ||
      "";
    setCookieValue(value);
  }, [name]); // Re-run when the name changes

  return cookieValue;
};
