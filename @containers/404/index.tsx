// Core types
import type { FC } from "react";

// Global grid components
import { Column, Container, Row } from "@components/Grid";

// Global components
import { Button, Heading } from "@components";

// Vendors
import useTranslation from "next-translate/useTranslation";

const index: FC = () => {
  // Translation
  const { t } = useTranslation();

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
            {t("404:title")}
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
            {t("404:description")}
          </Heading>

          <Button variant="secondary" as="a" href="/">
            {t("404:cta")}
          </Button>
        </Column>
      </Row>
    </Container>
  );
};

export { index as NotFound };
