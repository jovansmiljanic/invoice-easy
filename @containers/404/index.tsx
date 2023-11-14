// Core types
import type { FC } from "react";

// Global components
import { Button, Heading } from "@components";

// Vendors
import useTranslation from "next-translate/useTranslation";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const index: FC = () => {
  // Translation
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Heading
        as="h2"
        weight="bold"
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
    </Wrapper>
  );
};

export { index as NotFound };
