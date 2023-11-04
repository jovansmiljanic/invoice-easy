// Core types
import { useContext, type FC } from "react";

// Global components
import { Button, Heading } from "@components";

// NextJS
import { useRouter } from "next/router";

// Vendors
import styled, { css } from "styled-components";
import { StoreContext } from "@context";

// Icons
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import useTranslation from "next-translate/useTranslation";

const NotFound = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme: { breakpoints } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      text-align: center;
      flex-direction: column;

      svg {
        width: 100%;
      }
    }
  `}
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
          {t("client:notFoundTitle")}
        </Heading>

        <Heading
          as="h6"
          padding={{
            xs: { bottom: 2 },
            sm: { bottom: 2 },
            md: { bottom: 2 },
          }}
        >
          {t("client:notFoundDescription")}
        </Heading>

        <Button
          variant="secondary"
          type="button"
          size="small"
          onClick={() => setIsModalOpen(!isModalOpen)}
          margin={{ md: { left: 2 } }}
        >
          <AddOutlinedIcon />
          {t("invoice:addNewClient")}
        </Button>
      </div>
    </NotFound>
  );
};

export { index as NotFound };
