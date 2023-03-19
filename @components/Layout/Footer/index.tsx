// Core types
import type { FC } from "react";

// Global components
import { Heading } from "@components";

// Global grid components
import { Column, Container, Row } from "@components/Grid";

const index: FC = () => {
  const date = new Date();
  let year = date.getFullYear();

  return (
    <Container>
      <Row
        justifyContent={{ md: "center" }}
        alignItems={{ md: "center" }}
        padding={{ md: { top: 1, bottom: 1 } }}
      >
        <Column responsivity={{ md: 6 }} textAlign={{ md: "right" }}>
          Logo
        </Column>

        <Column responsivity={{ md: 6 }} textAlign={{ md: "left" }}>
          <Heading as="p">© {year} Invoice easy. All rights reserved.</Heading>
        </Column>
      </Row>
    </Container>
  );
};

export { index as Footer };
