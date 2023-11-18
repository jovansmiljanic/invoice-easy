// Core types
import { useContext, type FC } from "react";

// Vendors
import styled, { css } from "styled-components";

// Icons
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

// Dashboard component
import { Search, ItemsPerPage } from "@components/Dashboard";
import { Button } from "@components";
import useTranslation from "next-translate/useTranslation";
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
  setSearchQuery: any;
}

const index: FC<Actions> = ({ setSearchQuery }) => {
  // Translation
  const { t } = useTranslation();

  // Grid context
  const { searchQuery, limit, queryUrl, searchUrl } = useContext(GridContext);

  const { setIsModalOpen, isModalOpen } = useContext(GridContext);

  return (
    <Wrapper>
      <Col1>
        <ItemsPerPage limit={limit} path="products" />

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
