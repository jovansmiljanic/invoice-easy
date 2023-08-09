// Core types
import { createContext, type FC } from "react";

// Create Context base
interface IGridContext {
  page: number;
  searchQuery: string | undefined;
  setSearchQuery: Function;
  queryUrl: string;
  limit: number;
  length: number;
  searchUrl: string;
  updatedInvoices?: any[];
  isLoading: boolean;
  pageName?: string;
}

export const GridContext = createContext({} as IGridContext);

interface Table {
  children: any;
  value: any;
}

const index: FC<Table> = ({ children, value }) => {
  return <GridContext.Provider value={value}>{children}</GridContext.Provider>;
};

export { index as TableContext };
