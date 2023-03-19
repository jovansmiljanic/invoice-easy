// Core types
import type { FC } from "react";

// NextJS
import Link from "next/link";

// Vendors
import styled, { css } from "styled-components";

// Global grid components
import { Column, Container, Row } from "@components/Grid";

const CustomLink = styled.span`
  padding: 0 5px;
  text-decoration: underline;
  font-weight: bold;
  color: initial;
  cursor: pointer;
`;

const index: FC = () => {
  return (
    <Container>
      <Row
        justifyContent={{ md: "center", sm: "space-between" }}
        alignItems={{ md: "center", sm: "center" }}
        padding={{ md: { top: 2, bottom: 2 }, sm: { top: 2, bottom: 2 } }}
      >
        <Column responsivity={{ md: 3, sm: 4 }}>
          <Link href="/">
            <CustomLink>Logo</CustomLink>
          </Link>
        </Column>

        <Column responsivity={{ md: 9, sm: 4 }}>Items</Column>
      </Row>
    </Container>
  );
};

export { index as Header };
