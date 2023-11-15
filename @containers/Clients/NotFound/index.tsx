// Core types
import { useContext, type FC } from "react";

// Global components
import { Button, Heading } from "@components";

// Vendors
import styled, { css } from "styled-components";
import { StoreContext } from "@context";

// Icons
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import useTranslation from "next-translate/useTranslation";

const NotFound = styled.div`
  padding: 40px 0;
  display: flex;
  justify-content: flex-start;
`;

const index: FC = () => {
  // Translation
  const { t } = useTranslation();

  const { setIsModalOpen, isModalOpen } = useContext(StoreContext);

  return (
    <NotFound>
      <div>
        <Heading
          as="h4"
          weight="bold"
          padding={{
            xs: { bottom: 1, top: 4 },
            sm: { bottom: 1, top: 4 },
            md: { bottom: 1 },
          }}
        >
          {t("clientDashboard:notFoundTitle")}
        </Heading>

        <Heading
          as="h6"
          padding={{
            xs: { bottom: 2 },
            sm: { bottom: 2 },
            md: { bottom: 2 },
          }}
        >
          {t("clientDashboard:notFoundDescription")}
        </Heading>

        <Button
          variant="secondary"
          type="button"
          size="small"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <AddOutlinedIcon />
          {t("table:createClientCta")}
        </Button>
      </div>
    </NotFound>
  );
};

export { index as NotFound };
