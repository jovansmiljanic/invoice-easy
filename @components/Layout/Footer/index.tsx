// Core types
import type { FC } from "react";

// Global components
import { Heading, Logo } from "@components";

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
        padding={{
          xs: { top: 1, bottom: 1 },
          sm: { top: 1, bottom: 1 },
          md: { top: 1, bottom: 1 },
        }}
      >
        <Column responsivity={{ md: 6 }} textAlign={{ md: "right" }}>
          <Logo $width="100" $height="50" $color="secondary" />
        </Column>

        <Column responsivity={{ md: 6 }} textAlign={{ md: "left" }}>
          <Heading as="p">© {year} Invoice easy. All rights reserved.</Heading>
        </Column>
      </Row>
    </Container>
  );
};

export { index as Footer };
