// Core types
import { useEffect, type FC, useContext } from "react";

// Styles form
import { Field } from "@styles/Form";

// Nextjs
import { useRouter } from "next/router";

// Vendors
import styled, { css } from "styled-components";

// Icon
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const SearchWrapper = styled.div`
  flex: 0 0 100%;
  position: relative;

  svg {
    position: absolute;
    top: 67% !important;
    left: 10px !important;
  }

  ${({ theme: { defaults, breakpoints, colors } }) => css`
    ${Field} {
      width: 100%;
      min-height: 45px;

      color: ${colors.textColor};
      border: 1px solid ${colors.lightGray};
      background-color: ${colors.white};

      padding-left: ${defaults.gutter * 2}px;
      padding: 10px 20px;
    }

    @media (max-width: ${breakpoints.md}px) {
      flex: 0 0 100%;
      margin-bottom: 10px;
    }
  `}
`;

const Clear = styled.div`
  position: absolute;
  width: 25px;
  height: 25px;
  top: -6px;
  right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  z-index: 100;
`;

interface Search {
  placeholder: string;
  searchQuery?: string;
  setSearchQuery: (searchQuery: string) => void;
  queryUrl: string;
  searchUrl: string;
}

const index: FC<Search> = ({
  placeholder,
  searchQuery,
  setSearchQuery,
  queryUrl,
  searchUrl,
}) => {
  const { push, query } = useRouter();

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const router = useRouter();

  useEffect(() => {
    let delayDebounceFn: NodeJS.Timeout;

    // Delay search on 1.5 seconds on typing
    if (searchQuery !== undefined) {
      delayDebounceFn = setTimeout(() => {
        push(`${router.pathname}?${queryUrl}${searchUrl}&page=${0}`);
      }, 300);
    }

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery === undefined && query["searchQuery"])
      setSearchQuery(query["searchQuery"].toString());
  }, [, query]);

  return (
    <SearchWrapper>
      <Field
        id="search"
        name="search"
        value={searchQuery}
        onChange={handleChangeSearch}
        placeholder={placeholder}
      />

      {searchQuery && (
        <Clear
          onClick={() => {
            // Clear the search query
            setSearchQuery("");

            push(`/?${queryUrl}${searchUrl}&page=${0}`);
          }}
        >
          <CloseOutlinedIcon />
        </Clear>
      )}
    </SearchWrapper>
  );
};

export { index as Search };
