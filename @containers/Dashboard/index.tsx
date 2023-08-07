// Core
import { type FC, createContext, useEffect, useState, useMemo } from "react";

// NextJS
import { useRouter } from "next/router";

// Shared utils
import { isObjectEmpty, objectToQuery } from "@utils/shared";

// Client utils
import { useDebouncedEffect } from "@utils/client";

// Local components
import { Table } from "./Table";
import { Search } from "./Search";
import { Filters } from "./Filters";
import { Pagination } from "./Pagination";
import { LineChart } from "./LineChart";

// Vendors
import axios from "axios";
import styled, { css } from "styled-components";

// Icons
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

// Global types
import { Client, Invoice, MyAccount } from "@types";

// GLobal grid components
import { Column, Container, Row } from "@components/Grid";

// Global components
import { Button, Heading } from "@components";

interface IFilters {
  status?: string | string[];
  year?: string | string[];
}

interface Filter {
  label: string;
  value: string;
}

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

const BoxWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Box = styled.div`
  padding: 20px;
  border-radius: 5px;
  flex: 0 0 49%;
  max-height: 150px;

  ${({ theme: { colors, breakpoints } }) => css`
    border: 1px solid ${colors.lightGray};

    @media (max-width: ${breakpoints.md}px) {
      padding: 20px 10px;
    }
  `}
`;

const BoxWrap = styled.div`
  display: flex;
  align-items: center;

  ${({ theme: { colors } }) => css`
    svg {
      fill: ${colors.textColor};
    }
  `}
`;

interface Checkbox {
  label: string;
  value: string;
}

// Create Context base
interface IGridContext {
  page: number;
  searchQuery: string | undefined;
  setSearchQuery: Function;
  queryUrl: string;
  limit: number;
  length: number;
  searchUrl: string;
  updatedInvoices?: Invoice[];
  isLoading: boolean;
}

export const GridContext = createContext({} as IGridContext);

interface Dashboard {
  clients?: Client[];
  invoices?: Invoice[];
  currentUser: MyAccount;
}

const index: FC<Dashboard> = ({ currentUser, invoices, clients }) => {
  const { query, push } = useRouter();

  // Declare filters
  const [filters, setFilters] = useState<IFilters>({});
  const filtersMemo = useMemo(() => filters, [filters]);

  // Declare pagination
  const [page, setPage] = useState(0);
  const pageMemo = useMemo(() => page, [page]);

  // Declare search query
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);

  // Store Original and Updated/Filtered items
  const [updatedInvoices, setUpdatedInvoices] = useState<Invoice[]>(
    invoices ? invoices : []
  );

  // Declare length
  const [length, setLength] = useState<number>(0);

  // Indicate that new items are loading
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Store the current limit of the pagination
  const limit = 9;

  // Set selected value
  const [statusSelected, setStatusSelected] = useState<
    Checkbox[] | undefined
  >();

  // Set selected value
  const [yearSelected, setYearSelected] = useState<Checkbox[] | undefined>();

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

    await axios.get(invoiceUrl).then(({ data: { items, length } }) => {
      // Invoices
      setUpdatedInvoices(items);

      // Length
      setLength(length);

      // Set loader
      setIsLoading(false);
    });
  };

  useEffect(() => {
    const { page: queryPage, searchQuery, ...rest } = query;

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

  // Calculate the total sum of prices
  const totalPrice = invoices?.reduce((sum: number, invoice: Invoice) => {
    const items = invoice.items;
    const prices = items.map((item) => parseInt(item.price.toString()));
    const total = prices.reduce((subtotal, price) => subtotal + price, 0);
    return sum + total;
  }, 0);

  const totalPaid = invoices?.filter(
    (invoice: Invoice) => invoice.status === "1"
  );

  // Calculate the total sum of prices
  const totalPaidInvoices = totalPaid?.reduce(
    (sum: number, invoice: Invoice) => {
      const items = invoice.items;
      const prices = items.map((item) => parseInt(item.price.toString()));
      const total = prices.reduce((subtotal, price) => subtotal + price, 0);
      return sum + total;
    },
    0
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
        updatedInvoices,
        isLoading,
      }}
    >
      <Container height={82}>
        <Row
          padding={{
            xs: { top: 2, bottom: 2 },
            sm: { top: 2, bottom: 2 },
            md: { top: 8, bottom: 2 },
          }}
          justifyContent={{ md: "space-between" }}
        >
          <Column
            responsivity={{ md: 6 }}
            padding={{
              xs: { bottom: 5 },
              sm: { bottom: 5 },
              md: { bottom: 0 },
            }}
          >
            <BoxWrapper>
              <Box>
                <BoxWrap>
                  <ReceiptLongOutlinedIcon />

                  <Heading
                    as="h6"
                    padding={{
                      xs: { left: 1 },
                      sm: { left: 1 },
                      md: { left: 1 },
                    }}
                  >
                    Invoices
                  </Heading>
                </BoxWrap>

                <Heading
                  as="h3"
                  weight="semiBold"
                  padding={{ xs: { top: 1 }, sm: { top: 1 }, md: { top: 1 } }}
                >
                  {invoices?.length}
                </Heading>
              </Box>

              <Box>
                <BoxWrap>
                  <GroupOutlinedIcon />

                  <Heading
                    as="h6"
                    padding={{
                      xs: { left: 1 },
                      sm: { left: 1 },
                      md: { left: 1 },
                    }}
                  >
                    Clients
                  </Heading>
                </BoxWrap>

                <Heading
                  as="h3"
                  weight="semiBold"
                  padding={{ xs: { top: 1 }, sm: { top: 1 }, md: { top: 1 } }}
                >
                  {clients?.length}
                </Heading>
              </Box>

              <Box>
                <BoxWrap>
                  <ReceiptOutlinedIcon />

                  <Heading
                    as="h6"
                    padding={{
                      xs: { left: 1 },
                      sm: { left: 1 },
                      md: { left: 1 },
                    }}
                  >
                    Invoiced
                  </Heading>
                </BoxWrap>

                <Heading
                  as="h3"
                  weight="semiBold"
                  padding={{ xs: { top: 1 }, sm: { top: 1 }, md: { top: 1 } }}
                >
                  {totalPrice?.toLocaleString()} €
                </Heading>
              </Box>

              <Box>
                <BoxWrap>
                  <PaidOutlinedIcon />

                  <Heading
                    as="h6"
                    padding={{
                      xs: { left: 1 },
                      sm: { left: 1 },
                      md: { left: 1 },
                    }}
                  >
                    Paid
                  </Heading>
                </BoxWrap>

                <Heading
                  as="h3"
                  weight="semiBold"
                  padding={{ xs: { top: 1 }, sm: { top: 1 }, md: { top: 1 } }}
                >
                  {totalPaidInvoices?.toLocaleString()} €
                </Heading>
              </Box>
            </BoxWrapper>
          </Column>

          <Column responsivity={{ md: 6 }}>
            <LineChart invoices={invoices} />
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
                <Button
                  size="small"
                  variant="secondary"
                  margin={{
                    xs: { right: 1, left: 1, top: 1, bottom: 1 },
                    sm: { right: 1, left: 1, top: 1, bottom: 1 },
                    md: { left: 1 },
                  }}
                  as="a"
                  href="/invoice/add"
                >
                  <AddOutlinedIcon />
                  Create invoice
                </Button>
              </Col1>

              <Col2>
                <Search />

                {/* <Filters
                  name="year"
                  label="Select year"
                  preSelected={yearSelected}
                  options={[
                    { label: "2022", value: "2022" },
                    {
                      label: "2023",
                      value: "2023",
                    },
                  ]}
                  callback={(e: Filter[]) => {
                    if (
                      e &&
                      (e.map((a) => a.value !== null) ||
                        e.map((a) => a.value !== undefined))
                    ) {
                      const { year, page, searchQuery, ...oldQuery } = query;
                      const mp = e.map((el) => el.value);
                      const filterQuery = objectToQuery({
                        query: { ...oldQuery, year: mp },
                      });

                      push(`/?${filterQuery}${searchUrl}&page=${0}`);
                    }
                  }}
                /> */}

                <Filters
                  name="status"
                  label="Filter by status"
                  preSelected={statusSelected}
                  options={[
                    { label: "Paid", value: "1" },
                    {
                      label: "Not paid",
                      value: "2",
                    },
                  ]}
                  callback={(e: Filter[]) => {
                    if (
                      e &&
                      (e.map((a) => a.value !== null) ||
                        e.map((a) => a.value !== undefined))
                    ) {
                      const { status, page, searchQuery, ...oldQuery } = query;
                      const mp = e.map((el) => el.value);
                      const filterQuery = objectToQuery({
                        query: { ...oldQuery, status: mp },
                      });

                      push(`/?${filterQuery}${searchUrl}&page=${0}`);
                    }
                  }}
                />
              </Col2>
            </Wrapper>
          </Column>

          <Column responsivity={{ md: 12 }}>
            <Table currentUser={currentUser} />
          </Column>

          {updatedInvoices && updatedInvoices.length > 0 && (
            <Column responsivity={{ md: 12 }}>
              <Pagination />
            </Column>
          )}
        </Row>
      </Container>
    </GridContext.Provider>
  );
};

export { index as Dashboard };
