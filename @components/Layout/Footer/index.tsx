// Core types
import type { FC } from "react";

// Global components
import { Heading, Logo } from "@components";

// Vendors
import styled, { css } from "styled-components";

const Footer = styled.div`
  max-width: 1340px;
  width: 100%;
  margin: auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 20px;

  grid-column: 2 / 3;
  grid-row: 3;

  ${({ theme: { breakpoints } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      flex-direction: column;
    }
  `}
`;

const index: FC = () => {
  const date = new Date();
  let year = date.getFullYear();

  return (
    <Footer>
      <Logo $width="100" $height="40" $color="secondary" />

      <Heading
        as="p"
        padding={{ xs: { top: 1 }, sm: { top: 1 }, md: { top: 1 } }}
        weight="regular"
        color="textColorSecondary"
      >
        © {year} Invoice easy. All rights reserved.
      </Heading>
    </Footer>
  );
};

export { index as Footer };
