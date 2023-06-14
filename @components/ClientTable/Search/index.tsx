// Core types
import { useEffect, type FC, useContext } from "react";

// Styles form
import { Field } from "@styles/Form";
// import { Icon as IconStyle } from "@styles";

// Nextjs
import { useRouter } from "next/router";

// Global components
import { Heading } from "@components";

// Vendors
import styled, { css } from "styled-components";

// Local context
import { GridContext } from "..";
import { ClearSvg } from "public/svg";

const SearchWrapper = styled.div`
  flex: 1;
  position: relative;

  svg {
    position: absolute;
    top: 67% !important;
    left: 10px !important;
  }

  ${Field} {
    width: 100%;
    border: 1px solid black;
    min-height: 45px;
  }

  ${({ theme: { defaults, breakpoints } }) => css`
    ${Field} {
      padding-left: ${defaults.gutter * 2}px;
      padding: 10px 20px 10px 40px;
    }

    @media (max-width: ${breakpoints.sm}px) {
      flex: 0 0 100%;
    }
  `}
`;

const Clear = styled.div`
  position: absolute;
  right: 20px;
  width: 25px;
  height: 25px;
  top: 42%;
  background-color: rgba(255, 255, 255, 0.123);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  z-index: 100;
`;

const index: FC = () => {
  // Grid context
  const { searchQuery, setSearchQuery, queryUrl, searchUrl } =
    useContext(GridContext);

  const { push, query } = useRouter();

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    let delayDebounceFn: NodeJS.Timeout;

    // Delay search on 1.5 seconds on typing
    if (searchQuery !== undefined) {
      delayDebounceFn = setTimeout(() => {
        push(`/?${queryUrl}${searchUrl}&page=${0}`);
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
      {/* <Icon $icon="search" $color="black" /> */}
      Icon
      <Heading as="h6" weight="semiBold">
        Search
      </Heading>
      <Field
        id="search"
        name="search"
        value={searchQuery}
        onChange={handleChangeSearch}
        placeholder="Search"
      />
      {searchQuery && (
        <Clear
          onClick={() => {
            // Clear the search query
            setSearchQuery("");

            push(`/?${queryUrl}${searchUrl}&page=${0}`);
          }}
        >
          <ClearSvg />
        </Clear>
      )}
    </SearchWrapper>
  );
};

export { index as Search };
