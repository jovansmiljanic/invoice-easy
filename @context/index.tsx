// Core types
import type { FC } from "react";

// Core
import { createContext, useMemo, useEffect, useState, useContext } from "react";

// Create Context base
export const StoreContext = createContext({} as AppContext);

// Vendors
import { ThemeProvider } from "styled-components";

// App context properties
import { Theme } from "@context/theme";

// Instruct component Props Types
interface Props {
  children: React.ReactNode;
}

type Theme = "light" | "dark";
type HiddenNumbers = "true" | "false";

// Instruct component State Types
interface AppContext {
  isPhone?: boolean;
  isTablet?: boolean;
}

export const Store: FC<Props> = props => {
  const [isPhone, setIsPhone] = useState<boolean>();
  const isPhoneMemo = useMemo(() => isPhone, [isPhone]);

  useEffect(() => {
    // Check if users device is smaller than 768px and enable Phone layout
    const isPhone = window.matchMedia("(max-width: 992px)").matches;

    if (isPhone) setIsPhone(isPhone);

    // Listen to window resize and resize layouts
    window.addEventListener("resize", detectLayout);
  }, []);

  // Detect window resize and enable respective layout
  const detectLayout = () => {
    const isPhone = window.matchMedia("(max-width: 992px)").matches;

    // Act accordingly by enabling isPhone layout
    setIsPhone(isPhone);
  };

  return (
    <StoreContext.Provider
      value={
        {
          isPhone: isPhoneMemo,
        } as AppContext
      }
    >
      <ThemeProvider theme={Theme["light"]}>{props.children}</ThemeProvider>
    </StoreContext.Provider>
  );
};
