// Core types
import type { FC } from "react";

// Global components
import { Heading, Logo } from "@components";

// Global grid components
import { Column, Container, Row } from "@components/Grid";

// Vendors
import styled, { css } from "styled-components";

const Border = styled.div`
  width: 100%;

  ${({ theme: { colors } }) => css`
    border-bottom: 1px solid ${colors.lightGray};
  `}
`;

const index: FC = () => {
  const date = new Date();
  let year = date.getFullYear();

  return (
    <Container>
      <Border />
      <Row
        justifyContent={{ md: "center" }}
        alignItems={{ md: "center" }}
        padding={{
          xs: { top: 3, bottom: 1 },
          sm: { top: 3, bottom: 1 },
          md: { top: 3, bottom: 1 },
        }}
      >
        <Column responsivity={{ md: 6 }} textAlign={{ md: "right" }}>
          <Logo $width="80" $height="35" $color="secondary" />
        </Column>

        <Column responsivity={{ md: 6 }} textAlign={{ md: "left" }}>
          <Heading as="p">© {year} Invoice easy. All rights reserved.</Heading>
        </Column>
      </Row>
    </Container>
  );
};

export { index as Footer };
