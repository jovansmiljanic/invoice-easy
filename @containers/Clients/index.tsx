// Core
import { type FC, useEffect, useState, useMemo, useContext } from "react";

// NextJS
import { useRouter } from "next/router";

// Shared utils
import { isObjectEmpty, objectToQuery } from "@utils/shared";

// Client utils
import { useDebouncedEffect } from "@utils/client";

// Local components
import { Table } from "./Table";

// Vendors
import axios from "axios";
import styled, { css } from "styled-components";

// Icons
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

// Global types
import { Client } from "@types";

// GLobal grid components
import { Column, Container, Row } from "@components/Grid";

// Global components
import { Button, Heading, Pagination, Search, TableContext } from "@components";
import { StoreContext } from "@context";

interface IFilters {
  status?: string | string[];
  year?: string | string[];
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

interface Dashboard {
  clients?: Client[];
}

const index: FC<Dashboard> = () => {
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
  const [updatedInvoices, setUpdatedInvoices] = useState<Client[]>();

  // Declare length
  const [length, setLength] = useState<number>(0);

  // Indicate that new items are loading
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Store the current limit of the pagination
  const limit = 16;

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
    const invoiceUrl = `/api/client/?${queryUrl}${searchUrl}&limit=${limit}&skip=${pageMemo}`;

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

  const { isModalOpen, setIsModalOpen, setIsClientData } =
    useContext(StoreContext);
  return (
    <>
      <TableContext
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
              md: { top: 0, bottom: 0 },
            }}
          >
            <Column responsivity={{ md: 12 }}>
              <Heading
                as="h4"
                padding={{
                  xs: { top: 6, bottom: 2 },
                  sm: { top: 6, bottom: 2 },
                  md: { top: 6, bottom: 2 },
                }}
              >
                Clients
              </Heading>

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
                    onClick={() => {
                      setIsClientData();

                      setIsModalOpen(!isModalOpen);
                    }}
                  >
                    <AddOutlinedIcon />
                    Add new client
                  </Button>
                </Col1>

                <Col2>
                  <Search />
                </Col2>
              </Wrapper>
            </Column>

            <Column responsivity={{ md: 12 }}>
              <Table />
            </Column>

            {updatedInvoices && updatedInvoices.length > 0 && (
              <Column responsivity={{ md: 12 }}>
                <Pagination />
              </Column>
            )}
          </Row>
        </Container>
      </TableContext>
    </>
  );
};

export { index as Clients };
