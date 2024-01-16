// Core types
import { useContext, type FC } from "react";

// NextJS
import { useRouter } from "next/router";

// Vendors
import styled, { css } from "styled-components";
import useTranslation from "next-translate/useTranslation";

// Icons
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
// Dashboard component
import { Search, Filters, ItemsPerPage } from "@components/Dashboard";

// Global components
import { Button } from "@components";

// Shared utils
import { objectToQuery } from "@utils/shared";

// Main table
import { GridContext } from "@components/MainTable";
import { DownloadInvoiceMultiple } from "@components/DownloadInvoice/multiple";
import { Invoice, MyAccount } from "@types";

const Wrapper = styled.div`
  padding: 15px;
  border-radius: 5px;
  background-color: white;

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;

  ${({ theme: { colors } }) => css`
    background-color: ${colors.white};
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

interface Actions {
  filterOptions: any;
  statusSelected: any;
  setSearchQuery: any;
  invoice: Invoice[];
  userData?: MyAccount | null;
}

interface Checkbox {
  label: string;
  value: string;
}

const index: FC<Actions> = ({
  filterOptions,
  statusSelected,
  setSearchQuery,
  invoice,
  userData,
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
            xs: { right: 1, left: 1 },
            sm: { right: 1, left: 1 },
            md: { left: 1 },
          }}
          as="a"
          href={`/${locale}/invoice/add`}
        >
          <AddOutlinedIcon />
          {t("table:createInvoiceCta")}
        </Button>

        {invoice.length > 0 && (
          <DownloadInvoiceMultiple
            invoice={invoice}
            userData={userData}
            type="button"
            button={{
              variant: "success",
              icon: <FileDownloadOutlinedIcon />,
            }}
          />
        )}
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
