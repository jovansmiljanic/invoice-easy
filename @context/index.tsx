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

// Global types
import { Client, Invoice, Product } from "@types";

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

  theme: Theme | string;
  setTheme: (theme: Theme | string) => void;
  toggleTheme: () => void;

  isPriceShown: HiddenNumbers | string;
  setIsPriceShown: (isPriceShown: HiddenNumbers | string) => void;
  toggleIsPriceShown: () => void;

  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;

  isProductModalOpen: boolean;
  setIsProductModalOpen: (isProductModalOpen: boolean) => void;

  isConfirmModal: boolean;
  setIsConfirmModal: (isConformModal: boolean) => void;

  clientData: Client;
  setClientData: (clientData?: Client | Invoice) => void;

  productData: Product;
  setProductData: (productData?: Product) => void;
}

export const Store: FC<Props> = (props) => {
  const [isPhone, setIsPhone] = useState<boolean>();
  const isPhoneMemo = useMemo(() => isPhone, [isPhone]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const isModalOpenMemo = useMemo(() => isModalOpen, [isModalOpen]);

  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);
  const isProductModalOpenMemo = useMemo(
    () => isProductModalOpen,
    [isProductModalOpen]
  );

  const [isConfirmModal, setIsConfirmModal] = useState(false);
  const isConfirmModalMemo = useMemo(() => isConfirmModal, [isConfirmModal]);

  const [clientData, setClientData] = useState<Client>();
  const clientDataMemo = useMemo(() => clientData, [clientData]);

  const [productData, setProductData] = useState<Product>();
  const productDataMemo = useMemo(() => productData, [productData]);

  const [theme, setTheme] = useState<Theme | string>("light");
  const [isPriceShown, setIsPriceShown] = useState<string>("true");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const toggleIsPriceShown = () => {
    const numbersHidden = isPriceShown === "true" ? "false" : "true";
    setIsPriceShown(numbersHidden);
    localStorage.setItem("hiddenNumbers", numbersHidden);
  };

  useEffect(() => {
    // Check for the theme preference in localStorage
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }

    // Check for the numbers preference in localStorage
    const storedNumbers = localStorage.getItem("hiddenNumbers");
    if (storedNumbers) {
      setIsPriceShown(storedNumbers);
    }

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

          isModalOpen: isModalOpenMemo,
          setIsModalOpen,

          isProductModalOpen: isProductModalOpenMemo,
          setIsProductModalOpen,

          clientData: clientDataMemo,
          setClientData,

          productData: productDataMemo,
          setProductData,

          isConfirmModal: isConfirmModalMemo,
          setIsConfirmModal,

          theme: theme,
          setTheme,
          toggleTheme,

          isPriceShown,
          setIsPriceShown,
          toggleIsPriceShown,
        } as AppContext
      }
    >
      <ThemeProvider theme={Theme[theme as Theme]}>
        {props.children}
      </ThemeProvider>
    </StoreContext.Provider>
  );
};
