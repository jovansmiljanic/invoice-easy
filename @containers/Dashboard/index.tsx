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
import Select from "react-select";
import styled, { css } from "styled-components";
import useTranslation from "next-translate/useTranslation";

// Icons
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

// Global types
import { Client, Invoice } from "@types";

// GLobal grid components
import { Container, Column, Row } from "@components/Grid";

// Global components
import { Button, Boxes } from "@components";

// Chart components
import { LineChart } from "@components/Charts";

// Local components
import { Table } from "./Table";

// Dashboard component
import { Pagination, Search, Filters } from "@components/Dashboard";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  border-radius: 5px 5px 0 0;

  ${({ theme: { colors } }) => css`
    border: 1px solid ${colors.lightGray};
  `}
`;

const Col1 = styled.div`
  display: flex;
  align-items: center;

  ${({ theme: { breakpoints } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      width: 100%;

      a {
        width: 100%;
      }
    }
  `}
`;

const Col2 = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  ${({ theme: { breakpoints } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      flex-wrap: wrap;
      margin: 0 10px;
      margin-bottom: 10px;
    }
  `}
`;

const CustomSelect = styled(Select)`
  margin-left: 15px;

  ${({ theme: { colors } }) => css`
    #react-select-newClient-placeholder {
      z-index: 1;
    }

    * > input {
      padding: 5px 0 !important;
    }

    * {
      font-size: 14px;
      border-radius: 5px !important;
      border-color: ${colors.lightGray} !important;
      color: ${colors.textColor} !important;
      background-color: ${colors.background} !important;
    }

    .css-1dimb5e-singleValue {
      color: ${colors.textColor} !important;
      z-index: 10;
    }
  `}
`;

interface Checkbox {
  label: string;
  value: string;
}

interface IFilters {
  status?: string | string[];
  year?: string | string[];
}

export type IItem = Invoice | Client;

// Create Context base
interface IGridContext {
  page: number;
  searchQuery: string | undefined;
  setSearchQuery: Function;
  queryUrl: string;
  limit: number;
  length: number;
  searchUrl: string;
  updatedItems: Invoice[] | Client[];
  isLoading: boolean;
}

interface Dashboard {}

export const GridContext = createContext({} as IGridContext);

const index: FC<Dashboard> = () => {
  // Translation
  const { t } = useTranslation();

  const { query, push, locale } = useRouter();

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

  // Declare length
  const [clientsLength, setClientsLength] = useState<number>(0);

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

  // Handle types
  const handleChangeType = (selected: any) => {
    push(`/?&page=${0}&limit=${selected.value}`);
  };

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
    const invoiceUrl = `/api/invoice/?${queryUrl}${searchUrl}&limit=${limit}&skip=${pageMemo}`;

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

    // Call axios with filters and page as a string url
    const clientUrl = `/api/client/`;

    await axios.get(clientUrl).then(({ data: { length } }) => {
      // Length
      setClientsLength(length);

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
      .map((type) => {
        return { value: type, label: type };
      });

    if (rest.status) setStatusSelected(status);
    if (!rest.status) setStatusSelected([]);

    if (limit) setLimit(+limit);
    if (!limit) setLimit(10);

    const year = rest.year
      ?.toString()
      .split(",")
      .map((type) => {
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

  const tableHeader = [
    t("table:id"),
    t("table:client"),
    t("table:status"),
    t("table:date"),
    t("table:dueDate"),
    t("table:amount"),
    t("table:actions"),
  ];

  const filterOptions = [
    { label: t("table:paidStatus"), value: "1" },
    {
      label: t("table:unPaidStatus"),
      value: "2",
    },
  ];

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
      }}
    >
      <Container height={82}>
        <Row padding={{ md: { top: 2, bottom: 3 } }}>
          <Column
            responsivity={{ sm: 12, md: 6, xs: 6 }}
            padding={{
              xs: { bottom: 5 },
              sm: { bottom: 5 },
              md: { bottom: 0 },
            }}
          >
            <Boxes
              items={totalInvoices}
              invoicesLength={length}
              clientsLenght={clientsLength}
              isLoading={isLoading}
            />
          </Column>

          <Column responsivity={{ sm: 12, md: 6, xs: 6 }}>
            <LineChart invoices={totalInvoices} />
          </Column>
        </Row>

        <Row
          padding={{
            xs: { top: 2, bottom: 2 },
            sm: { top: 2, bottom: 2 },
            md: { top: 0, bottom: 0 },
          }}
        >
          <Column responsivity={{ md: 12 }}>
            <Wrapper>
              <Col1>
                <CustomSelect
                  instanceId="newClient"
                  options={[
                    {
                      options: [
                        { value: "10", label: "10" },
                        { value: "20", label: "20" },
                        { value: "30", label: "30" },
                      ],
                    },
                  ]}
                  placeholder={limit}
                  onChange={(selected) => handleChangeType(selected)}
                />

                <Button
                  size="small"
                  variant="secondary"
                  margin={{
                    xs: { right: 1, left: 1, top: 1, bottom: 1 },
                    sm: { right: 1, left: 1, top: 1, bottom: 1 },
                    md: { left: 1 },
                  }}
                  as="a"
                  href={`/${locale}/invoice/add`}
                >
                  <AddOutlinedIcon />
                  {t("table:createInvoiceCta")}
                </Button>
              </Col1>

              <Col2>
                <Search
                  placeholder={t("table:searchLabel")}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  queryUrl={queryUrl}
                  searchUrl={searchUrl}
                />
                {filterOptions && (
                  <Filters
                    name="status"
                    label={t("table:filterLabel")}
                    preSelected={statusSelected}
                    options={filterOptions}
                    callback={(e: Checkbox[]) => {
                      if (
                        e &&
                        (e.map((a) => a.value !== null) ||
                          e.map((a) => a.value !== undefined))
                      ) {
                        const { status, page, searchQuery, ...oldQuery } =
                          query;
                        const mp = e.map((el) => el.value);
                        const filterQuery = objectToQuery({
                          query: { ...oldQuery, status: mp },
                        });

                        push(`/?${filterQuery}${searchUrl}&page=${0}`);
                      }
                    }}
                  />
                )}
              </Col2>
            </Wrapper>
          </Column>

          <Column responsivity={{ md: 12 }}>
            <Table tableHeader={tableHeader} />
          </Column>

          {updatedItems && updatedItems.length > 0 && (
            <Column responsivity={{ md: 12 }}>
              <Pagination
                length={length}
                limit={limit}
                page={page}
                queryUrl={queryUrl}
                searchUrl={searchUrl}
                updatedItems={updatedItems}
              />
            </Column>
          )}
        </Row>
      </Container>
    </GridContext.Provider>
  );
};

export { index as Dashboard };
