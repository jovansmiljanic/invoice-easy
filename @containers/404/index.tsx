// Core types
import type { FC } from "react";

// Global grid components
import { Column, Container, Row } from "@components/Grid";

// SVG
import { NotFound404 } from "public/svg";

// Global components
import { Button, Heading } from "@components";

const index: FC = () => {
  return (
    <Container height={80}>
      <Row
        padding={{
          xs: { top: 8, bottom: 8 },
          sm: { top: 8, bottom: 8 },
          md: { top: 10, bottom: 10 },
        }}
        alignItems={{ md: "center" }}
      >
        <Column responsivity={{ md: 6 }}>
          <Heading
            as="h1"
            weight="bold"
            padding={{
              xs: { bottom: 1 },
              sm: { bottom: 1 },
              md: { bottom: 1 },
            }}
          >
            404
          </Heading>

          <Heading
            as="h4"
            weight="semiBold"
            padding={{
              xs: { bottom: 1 },
              sm: { bottom: 1 },
              md: { bottom: 1 },
            }}
          >
            Sorry, page you requested was not found
          </Heading>

          <Heading
            as="h6"
            weight="medium"
            padding={{
              xs: { bottom: 1 },
              sm: { bottom: 1 },
              md: { bottom: 1 },
            }}
          >
            We suggest you go back to home
          </Heading>

          <Button variant="secondary" as="a" href="/">
            Back to home
          </Button>
        </Column>
        <Column responsivity={{ md: 6 }}>
          <NotFound404 />
        </Column>
      </Row>
    </Container>
  );
};

export { index as NotFound };
