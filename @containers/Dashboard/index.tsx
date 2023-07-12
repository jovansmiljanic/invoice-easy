// Core
import { type FC, createContext, useEffect, useState, useMemo } from "react";

// NextJS
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

// Shared utils
import { isObjectEmpty, objectToQuery } from "@utils/shared";

// Client utils
import { useDebouncedEffect } from "@utils/client";

// Local components
import { Table } from "./Table";
import { Search } from "./Search";
import { Filters } from "./Filters";
import { Pagination } from "./Pagination";

// Vendors
import axios from "axios";
import styled, { css } from "styled-components";

// Global types
import { Invoice } from "@types";

// GLobal grid components
import { Column, Container, Row } from "@components/Grid";

// Global components
import { Button } from "@components";

// Svg
import { Plus } from "public/svg";

interface IFilters {
  status?: string | string[];
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
  padding: 10px 0;

  ${({ theme: { colors } }) => css`
    color: ${colors.textColor};
    background-color: ${colors.white};
    border-bottom: 1px solid ${colors.lightGray};
  `}
`;

const Col1 = styled.div`
  display: flex;
  align-items: center;
`;

const Col2 = styled.div`
  display: flex;
  justify-content: flex-end;

  ${({ theme: { breakpoints } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      flex-wrap: wrap;
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
  updatedItems?: Invoice[];
  isLoading: boolean;
}

export const GridContext = createContext({} as IGridContext);

const index: FC = () => {
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
  const [updatedItems, setUpdatedItems] = useState<Invoice[]>();

  // Declare length
  const [length, setLength] = useState<number>(0);

  // Indicate that new items are loading
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Store the current limit of the pagination
  const limit = 6;

  // Set selected value
  const [statusSelected, setStatusSelected] = useState<
    Checkbox[] | undefined
  >();

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
    const url = `/api/invoice/?${queryUrl}${searchUrl}&limit=${limit}&skip=${pageMemo}`;

    const session = await getSession();

    await axios.get(url).then(({ data: { items, length } }) => {
      const uItems = items.filter(
        (item: any) => item.owner === session?.user._id
      );

      // Invoices
      setUpdatedItems(uItems);

      // Length
      setLength(uItems.length);

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
      }}
    >
      <Container backgroundColor="background" height={82}>
        <Row
          padding={{
            xs: { top: 6, bottom: 6 },
            sm: { top: 6, bottom: 6 },
            md: { top: 10, bottom: 10 },
          }}
        >
          <Column responsivity={{ md: 12 }}>
            <Wrapper>
              <Col1>
                <Button
                  size="small"
                  variant="secondary"
                  margin={{
                    xs: { left: 0 },
                    sm: { left: 0 },
                    md: { left: 1 },
                  }}
                  as="a"
                  href="/invoice/add"
                >
                  <Plus />
                  Create invoice
                </Button>
              </Col1>

              <Col2>
                <Search />

                <Filters
                  name="status"
                  label="Select status"
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
            <Table />
          </Column>

          {updatedItems && updatedItems.length > 0 && (
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
