// Core types
import { useContext, type FC } from "react";

// Global components
import { Button, Heading } from "@components";

// Vendors
import styled from "styled-components";
import { StoreContext } from "@context";
import useTranslation from "next-translate/useTranslation";
import { GridContext } from "@components/MainTable";

const NotFound = styled.div`
  padding: 40px 0;
  display: flex;
  justify-content: flex-start;
`;

const index: FC = () => {
  // Translation
  const { t } = useTranslation();

  const { isModalOpen, setIsModalOpen } = useContext(GridContext);

  return (
    <NotFound>
      <div>
        <Heading
          as="h4"
          weight="bold"
          padding={{
            xs: { bottom: 1 },
            sm: { bottom: 1 },
            md: { bottom: 1 },
          }}
        >
          {t("product:notFoundTitle")}
        </Heading>

        <Heading
          as="h6"
          padding={{
            xs: { bottom: 2 },
            sm: { bottom: 2 },
            md: { bottom: 2 },
          }}
        >
          {t("product:notFoundDescription")}
        </Heading>

        <Button
          variant="secondary"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          {t("product:addNewProduct")}
        </Button>
      </div>
    </NotFound>
  );
};

export { index as NotFound };
