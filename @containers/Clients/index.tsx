// Core
import {
  type FC,
  useEffect,
  useState,
  useMemo,
  createContext,
  useContext,
} from "react";

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
import { Client } from "@types";

// GLobal grid components
import { Container, Column, Row } from "@components/Grid";

// Global components
import { Button, Heading } from "@components";

// Store context
import { StoreContext } from "@context";

// Local components
import { Table } from "./Table";

// Dashboard component
import { Pagination, Search } from "@components/Dashboard";

export type IItem = Client;

// Create Context base
interface IGridContext {
  page: number;
  searchQuery: string | undefined;
  setSearchQuery: Function;
  queryUrl: string;
  limit: number;
  length: number;
  searchUrl: string;
  updatedItems: Client[];
  isLoading: boolean;
}

export const GridContext = createContext({} as IGridContext);

const index: FC = ({}) => {
  // Translation
  const { t } = useTranslation();

  const { setIsModalOpen, isModalOpen, setClientData } =
    useContext(StoreContext);

  const { query, push } = useRouter();

  // Declare filters
  const [filters, setFilters] = useState({});
  const filtersMemo = useMemo(() => filters, [filters]);

  // Declare pagination
  const [page, setPage] = useState(0);
  const pageMemo = useMemo(() => page, [page]);

  // Declare search query
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);

  // Store Original and Updated/Filtered items
  const [updatedItems, setupdatedItems] = useState<Client[]>([]);

  // Declare length
  const [length, setLength] = useState<number>(0);

  // Indicate that new items are loading
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Indicate that new items are loading
  const [limit, setLimit] = useState<number>(10);

  // Handle types
  const handleChangeType = (selected: any) => {
    push(`/clients/?&page=${0}&limit=${selected.value}`);
  };

  // Fetch items
  interface IFetch {
    page: number;
  }

  const queryUrl = objectToQuery({ query: filters });
  const searchUrl =
    searchQuery !== undefined && searchQuery !== ""
      ? `&searchQuery=${searchQuery}`
      : "";

  const fetchItems = async ({ page }: IFetch) => {
    // Set loader
    setIsLoading(true);

    // Call axios with filters and page as a string url
    const clientUrl = `/api/client/?${queryUrl}${searchUrl}&limit=${limit}&skip=${pageMemo}`;

    await axios.get(clientUrl).then(({ data: { items, length } }) => {
      // Client
      setupdatedItems(items);

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

    if (limit) setLimit(+limit);
    if (!limit) setLimit(10);

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
      <Container height={82}>
        <Row
          padding={{
            xs: { top: 4, bottom: 3 },
            sm: { top: 4, bottom: 3 },
            md: { top: 5, bottom: 4 },
          }}
        >
          <Column responsivity={{ md: 12 }}>
            <Heading as="h2" weight="semiBold" color="gray">
              {t("clientDashboard:title")}
            </Heading>
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
              <OptionsWrap>
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
                  variant="secondary"
                  type="button"
                  size="small"
                  onClick={() => {
                    setIsModalOpen(!isModalOpen), setClientData();
                  }}
                  margin={{
                    xs: { left: 0, top: 1, bottom: 1 },
                    sm: { left: 0, top: 1, bottom: 1 },
                    md: { left: 2, top: 0, bottom: 0 },
                  }}
                >
                  <AddOutlinedIcon />
                  {t("invoice:addNewClient")}
                </Button>
              </OptionsWrap>

              <SearchWrap>
                <Search
                  placeholder={t("table:searchLabel")}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  queryUrl={queryUrl}
                  searchUrl={searchUrl}
                />
              </SearchWrap>
            </Wrapper>
          </Column>

          <Column responsivity={{ md: 12 }}>
            <Table />
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

export { index as ClientsDashboard };

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  border-radius: 5px 5px 0 0;

  ${({ theme: { colors } }) => css`
    border: 1px solid ${colors.lightGray};
  `}
`;

const OptionsWrap = styled.div`
  display: flex;
  align-items: center;

  ${({ theme: { breakpoints } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      align-items: flex-start;
      flex-direction: column;
    }
  `}
`;

const SearchWrap = styled.div`
  flex: 0 0 50%;

  ${({ theme: { breakpoints } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      flex: 0 0 100%;
      flex-wrap: wrap;
    }
  `}
`;

const CustomSelect = styled(Select)`
  ${({ theme: { colors } }) => css`
    #react-select-newClient-placeholder {
      z-index: 1;
    }

    * > input {
      padding: 5px 0 !important;
    }

    * {
      flex-wrap: nowrap;
      font-size: 14px;length, limit, page, queryUrl, searchUrl, updatedItems
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
