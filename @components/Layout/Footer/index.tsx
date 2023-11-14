// Core types
import type { FC } from "react";

// Global components
import { Heading, Logo } from "@components";

// Vendors
import Link from "next/link";
import styled, { css } from "styled-components";

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  padding: 25px;

  grid-column: 2 / 3;
  grid-row: 3;
`;

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 15px;

  ${({ theme: { colors } }) => css`
    a {
      margin: 0 5px;
      color: ${colors.secondary};
    }
  `}
`;

const index: FC = () => {
  const date = new Date();
  let year = date.getFullYear();

  return (
    <Footer>
      <Logo $width="80" $height="35" $color="secondary" />

      <Wrap>
        <Link href="/">Home</Link>
        <Link href="/invoices">Invoices</Link>
        <Link href="/clients">Clients</Link>
        <Link href="/products">Products</Link>
        <Link href="/my-account">Settings</Link>
      </Wrap>

      <Heading
        as="p"
        padding={{ xs: { top: 1 }, sm: { top: 1 }, md: { top: 1 } }}
      >
        © {year} Invoice easy. All rights reserved.
      </Heading>
    </Footer>
  );
};

export { index as Footer };
