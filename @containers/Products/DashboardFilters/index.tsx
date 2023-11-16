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
import { Search, Filters } from "@components/Dashboard";
import { Button } from "@components";
import useTranslation from "next-translate/useTranslation";
import { GridContext } from "@components/MainTable";
import { StoreContext } from "@context";

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

interface Actions {
  setSearchQuery: any;
}

interface Checkbox {
  label: string;
  value: string;
}

const index: FC<Actions> = ({ setSearchQuery }) => {
  // Translation
  const { t } = useTranslation();

  const { query, push, locale } = useRouter();

  // Grid context
  const { searchQuery, limit, queryUrl, searchUrl } = useContext(GridContext);

  const { setIsModalOpen, isModalOpen } = useContext(GridContext);

  // Handle types
  const handleChangeType = (selected: any) => {
    push(`/?&page=${0}&limit=${selected.value}`);
  };

  return (
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
          onChange={selected => handleChangeType(selected)}
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
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <AddOutlinedIcon />

          {t("table:createProductCta")}
        </Button>
      </Col1>

      <Col2>
        <Search
          placeholder={t("table:productSearchLabel")}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          queryUrl={queryUrl}
          searchUrl={searchUrl}
        />
      </Col2>
    </Wrapper>
  );
};

export { index as DashboardFilters };
