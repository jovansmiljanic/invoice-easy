// Core types
import type { FC } from "react";

// Core
import { createContext, useMemo, useEffect, useState } from "react";

// Create Context base
export const StoreContext = createContext({} as AppContext);

// Vendors
import { ThemeProvider } from "styled-components";

// App context properties
import { Theme } from "@context/theme";
import { Client } from "@types";

// Instruct component Props Types
interface Props {
  children: React.ReactNode;
}

// Instruct component State Types
interface AppContext {
  isPhone?: boolean;
  isTablet?: boolean;
  theme: "light" | "dark";
  setTheme?: any;
  isModalOpen?: boolean;
  setIsModalOpen?: any;
  isConfirmModal?: boolean;
  setIsConfirmModal?: any;
  isClientData?: Client;
  setIsClientData?: any;
}

export const Store: FC<Props> = (props) => {
  const [isPhone, setIsPhone] = useState<boolean>();
  const isPhoneMemo = useMemo(() => isPhone, [isPhone]);

  const [isTablet, setIsTablet] = useState<boolean>();
  const isTabletMemo = useMemo(() => isTablet, [isTablet]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const isModalOpenMemo = useMemo(() => isModalOpen, [isModalOpen]);

  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const isConfirmModalMemo = useMemo(() => isConfirmModal, [isConfirmModal]);

  const [isClientData, setIsClientData] = useState<Client>();
  const isClientDataMemo = useMemo(() => isClientData, [isClientData]);

  const [theme, setTheme] = useState<"light" | "dark">("dark"); // Set initial theme

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (prefersDark) {
      setTheme("dark");
    }

    // Check if users device is smaller than 768px and enable Phone layout
    const isPhone = window.matchMedia("(max-width: 992px)").matches;

    if (isPhone) setIsPhone(isPhone);

    // Check if users device is smaller than 1192px and enable Tablet layout
    const isTablet = window.matchMedia("(max-width: 1192px)").matches;

    if (isTablet) setIsTablet(isTablet);

    // Listen to window resize and resize layouts
    window.addEventListener("resize", detectLayout);
  }, []);

  // Detect window resize and enable respective layout
  const detectLayout = () => {
    const isPhone = window.matchMedia("(max-width: 992px)").matches;

    // Act accordingly by enabling isPhone layout
    setIsPhone(isPhone);

    const isTablet = window.matchMedia("(max-width: 1192px)").matches;

    // Act accordingly by enabling Tablet layout
    setIsTablet(isTablet);
  };

  return (
    <StoreContext.Provider
      value={
        {
          isPhone: isPhoneMemo,
          isTablet: isTabletMemo,
          isModalOpen: isModalOpenMemo,
          setIsModalOpen,
          isClientData: isClientDataMemo,
          setIsClientData,
          isConfirmModal: isConfirmModalMemo,
          setIsConfirmModal,
          theme: theme,
          setTheme,
        } as AppContext
      }
    >
      <ThemeProvider theme={Theme[theme]}>{props.children}</ThemeProvider>
    </StoreContext.Provider>
  );
};
