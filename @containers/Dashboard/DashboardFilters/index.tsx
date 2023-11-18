// Core types
import { useContext, type FC } from "react";

// NextJS
import { useRouter } from "next/router";

// Vendors
import Select from "react-select";
import styled, { css } from "styled-components";

// Icons
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

// Dashboard component
import { Search, Filters, ItemsPerPage } from "@components/Dashboard";
import { Button } from "@components";
import useTranslation from "next-translate/useTranslation";
import { objectToQuery } from "@utils/shared";
import { GridContext } from "@components/MainTable";

const Wrapper = styled.div`
  padding: 15px;
  border-radius: 5px;
  background-color: white;

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  ${({ theme: { colors } }) => css`
    background-color: ${colors.white};
  `}
`;

const Col1 = styled.div`
  display: flex;
  align-items: center;

  ${({ theme: { breakpoints, colors } }) => css`

    a{
      color ${colors.textColor};
    }

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

interface Actions {
  filterOptions: any;
  statusSelected: any;
  setSearchQuery: any;
}

interface Checkbox {
  label: string;
  value: string;
}

const index: FC<Actions> = ({
  filterOptions,
  statusSelected,
  setSearchQuery,
}) => {
  // Translation
  const { t } = useTranslation();

  const { query, push, locale } = useRouter();

  // Grid context
  const { searchQuery, limit, queryUrl, searchUrl } = useContext(GridContext);

  return (
    <Wrapper>
      <Col1>
        <ItemsPerPage limit={limit} path="/" />

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
                (e.map(a => a.value !== null) ||
                  e.map(a => a.value !== undefined))
              ) {
                const { status, page, searchQuery, ...oldQuery } = query;
                const mp = e.map(el => el.value);
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
  );
};

export { index as DashboardFilters };
