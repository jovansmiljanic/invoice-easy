// Core
import { useEffect, useState } from "react";

import { signOut } from "next-auth/react";

// Global types
import { User } from "@types";

// Local get cookie function
import { getCookie } from "../getCookie";

export const checkCookie = () => {
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    if (document && document.cookie && Boolean(getCookie("user"))) {
      setUser(JSON.parse(getCookie("user")));
    } else {
      signOut();
    }
  }, []);

  return { user };
};
