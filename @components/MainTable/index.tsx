// Core
import { type FC, useEffect, useState, useMemo, createContext } from "react";

// NextJS
import { useRouter } from "next/router";

// Shared utils
import { isObjectEmpty, objectToQuery } from "@utils/shared";

// Client utils
import { useDebouncedEffect } from "@utils/client";

// Vendors
import axios from "axios";

// Global types
import { Client, Invoice, MyAccount, Product } from "@types";

// Dashboard component
import { Pagination } from "@components/Dashboard";

import { DashboardTable } from "@containers/Dashboard/Table";
import { ClientTable } from "@containers/Clients/Table";
import { ProductTable } from "@containers/Products/Table";
import { Boxes } from "@containers/Dashboard/Boxes";
import { ConfirmDeleteModal } from "@components/Modals/ConfirmDelete";

interface Checkbox {
  label: string;
  value: string;
}

interface IFilters {
  status?: string | string[];
  year?: string | string[];
}

export type IItem = Invoice | Client | Product;

// Create Context base
interface IGridContext {
  page: number;
  searchQuery: string | undefined;
  setSearchQuery: Function;
  queryUrl: string;
  limit: number;
  length: number;
  searchUrl: string;
  updatedItems: Invoice[] | Client[] | Product[];
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;

  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;

  isConfirmModalOpen: boolean;
  setIsConfirmModalOpen: (isConfirmModalOpen: boolean) => void;

  modalData: any;
  setModalData: any;
}

export const GridContext = createContext({} as IGridContext);

interface Dashboard {
  path: string;
  boxes: boolean;
  currentUser: MyAccount | null;
}

const index: FC<Dashboard> = ({ path, boxes, currentUser }) => {
  const { query } = useRouter();

  // Declare filters
  const [filters, setFilters] = useState<IFilters>({});
  const filtersMemo = useMemo(() => filters, [filters]);

  // Declare pagination
  const [page, setPage] = useState(0);
  const pageMemo = useMemo(() => page, [page]);

  // Declare search query
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);

  // Store Original and Updated/Filtered items
  const [updatedItems, setupdatedItems] = useState<Invoice[]>([]);

  // Store Original and Updated/Filtered items
  const [totalInvoices, setTotalInvoices] = useState<Invoice[]>();

  // Declare length
  const [length, setLength] = useState<number>(0);

  // Indicate that new items are loading
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Indicate that new items are loading
  const [limit, setLimit] = useState<number>(10);

  // Set selected value
  const [statusSelected, setStatusSelected] = useState<
    Checkbox[] | undefined
  >();

  // Set selected value
  const [yearSelected, setYearSelected] = useState<Checkbox[] | undefined>();

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any>();

  // Fetch items
  interface IFetch {
    page: number;
  }

  const queryUrl = objectToQuery<IFilters>({ query: filters });
  const searchUrl =
    searchQuery !== undefined && searchQuery !== ""
      ? `&searchQuery=${searchQuery}`
      : "";

  const fetchItems = async ({ page }: IFetch) => {
    // Set loader
    setIsLoading(true);

    // Call axios with filters and page as a string url
    const invoiceUrl = `/api/${path}/?${queryUrl}${searchUrl}&limit=${limit}&skip=${pageMemo}`;

    await axios
      .get(invoiceUrl)
      .then(({ data: { items, length, allInvoices } }) => {
        // Invoices
        setupdatedItems(items);

        // Invoices
        setTotalInvoices(allInvoices);

        // Length
        setLength(length);

        // Set loader
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const { page: queryPage, searchQuery, limit, ...rest } = query;

    // Update filters
    if (!isObjectEmpty(rest)) setFilters(rest);
    if (isObjectEmpty(rest)) setFilters({});

    const status = rest.status
      ?.toString()
      .split(",")
      .map(type => {
        return { value: type, label: type };
      });

    if (rest.status) setStatusSelected(status);
    if (!rest.status) setStatusSelected([]);

    if (limit) setLimit(+limit);
    if (!limit) setLimit(10);

    const year = rest.year
      ?.toString()
      .split(",")
      .map(type => {
        return { value: type, label: type };
      });

    if (rest.year) setYearSelected(year);
    if (!rest.year) setYearSelected([]);

    // Update page number
    if (queryPage) setPage(Math.round(Number(queryPage.toString())));
    else setPage(0);
  }, [query]);

  useDebouncedEffect(
    () =>
      // Fetch items from page 0
      fetchItems({
        page: 0,
      }),
    [, filtersMemo],
    50
  );

  useDebouncedEffect(
    () =>
      fetchItems({
        page: pageMemo,
      }),
    [pageMemo],
    50
  );

  return (
    <GridContext.Provider
      value={{
        page: pageMemo,
        searchQuery,
        setSearchQuery,
        queryUrl: queryUrl,
        length,
        limit,
        searchUrl,
        updatedItems,
        isLoading,
        setIsLoading,
        isModalOpen,
        setIsModalOpen,
        isConfirmModalOpen,
        setIsConfirmModalOpen,
        modalData,
        setModalData,
      }}
    >
      {boxes && (
        <Boxes
          items={totalInvoices}
          invoicesLength={length}
          isLoading={isLoading}
        />
      )}

      {path === "invoice" ? (
        <DashboardTable
          statusSelected={statusSelected}
          setSearchQuery={setSearchQuery}
          currentUser={currentUser}
        />
      ) : path === "client" ? (
        <ClientTable setSearchQuery={setSearchQuery} />
      ) : (
        <ProductTable setSearchQuery={setSearchQuery} />
      )}

      {updatedItems && updatedItems.length > 0 && (
        <Pagination
          length={length}
          limit={limit}
          page={page}
          queryUrl={queryUrl}
          searchUrl={searchUrl}
          updatedItems={updatedItems}
        />
      )}

      {isConfirmModalOpen && <ConfirmDeleteModal />}
    </GridContext.Provider>
  );
};

export { index as MainTable };
