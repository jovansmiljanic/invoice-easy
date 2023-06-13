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

// Vendors
import axios from "axios";
import styled, { css } from "styled-components";
import { Invoice } from "@types";
import { Column, Container, Row } from "@components/Grid";
import { getSession } from "next-auth/react";

interface IFilters {
  type?: string | string[];
}

interface Filter {
  label: string;
  value: string;
}

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  z-index: 10;

  ${({ theme: { colors } }) => css`
    color: ${colors.textColor};
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

  // // Set selected value
  // const [typesSelected, setTypesSelected] = useState<Checkbox[] | undefined>();
  // const [topicsSelected, setTopicsSelected] = useState<
  //   Checkbox[] | undefined
  // >();

  // Store the current limit of the pagination
  const limit = 6;

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
        (item: any) => item.userId === session?.user._id
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

    // const types = rest.type
    //   ?.toString()
    //   .split(",")
    //   .map((type) => {
    //     return { value: type, label: type };
    //   });

    // const topics = rest.topic
    //   ?.toString()
    //   .split(",")
    //   .map((topic) => {
    //     return { value: topic, label: topic };
    //   });

    // if (rest.type) setTypesSelected(types);
    // if (!rest.type) setTypesSelected([]);

    // if (rest.topic) setTopicsSelected(topics);
    // if (!rest.topic) setTopicsSelected([]);

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
      <Container backgroundColor="background" fullHeight>
        <Row
          padding={{
            xs: { top: 6, bottom: 6 },
            sm: { top: 6, bottom: 6 },
            md: { top: 10, bottom: 10 },
          }}
        >
          <Column responsivity={{ md: 12 }}>
            <Table />
          </Column>

          <Column responsivity={{ md: 12 }}>
            <Pagination />
          </Column>
        </Row>
      </Container>
    </GridContext.Provider>
  );
};

export { index as Table };
