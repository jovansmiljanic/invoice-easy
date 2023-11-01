// Core types
import { type FC, useContext } from "react";

// Vendors
import styled, { css } from "styled-components";
import useTranslation from "next-translate/useTranslation";

// Icons
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";

// Global components
import { Heading } from "@components";

// Global types
import { Invoice } from "@types";

// Global context
import { StoreContext } from "@context";

interface Boxes {
  items?: Invoice[];
  invoicesLength: number;
  clientsLenght: number;
  isLoading?: boolean;
}

const index: FC<Boxes> = ({
  items,
  invoicesLength,
  clientsLenght,
  isLoading,
}) => {
  // Translation
  const { t } = useTranslation();

  const { isPriceShown } = useContext(StoreContext);

  // Calculate the total sum of prices
  const totalInvoiced = items?.reduce((sum: number, invoice: Invoice) => {
    const items = invoice.items;
    const prices = items.map((item) => parseInt(item.price.toString()));
    const total = prices.reduce((subtotal, price) => subtotal + price, 0);
    return sum + total;
  }, 0);

  const totalPaid = items?.filter((invoice: Invoice) => invoice.status === "1");

  // Calculate the total sum of prices
  const totalPaidInvoices = totalPaid?.reduce(
    (sum: number, invoice: Invoice) => {
      const items = invoice.items;
      const prices = items.map((item) => parseInt(item.price.toString()));
      const total = prices.reduce((subtotal, price) => subtotal + price, 0);
      return sum + total;
    },
    0
  );

  return (
    <BoxWrapper>
      <Box isLoading={isLoading}>
        <BoxWrap>
          <ReceiptLongOutlinedIcon />

          <Heading
            as="h6"
            padding={{
              xs: { left: 1 },
              sm: { left: 1 },
              md: { left: 1 },
            }}
          >
            {t("home:boxInvoices")}
          </Heading>
        </BoxWrap>

        <Heading
          as="h3"
          weight="semiBold"
          padding={{ xs: { top: 1 }, sm: { top: 1 }, md: { top: 1 } }}
        >
          {invoicesLength}
        </Heading>
      </Box>

      <Box isLoading={isLoading}>
        <BoxWrap>
          <GroupOutlinedIcon />

          <Heading
            as="h6"
            padding={{
              xs: { left: 1 },
              sm: { left: 1 },
              md: { left: 1 },
            }}
          >
            {t("home:boxClients")}
          </Heading>
        </BoxWrap>

        <Heading
          as="h3"
          weight="semiBold"
          padding={{ xs: { top: 1 }, sm: { top: 1 }, md: { top: 1 } }}
        >
          {clientsLenght}
        </Heading>
      </Box>

      <Box isPriceShown={isPriceShown} isLoading={isLoading}>
        <BoxWrap>
          <ReceiptOutlinedIcon />

          <Heading
            as="h6"
            padding={{
              xs: { left: 1 },
              sm: { left: 1 },
              md: { left: 1 },
            }}
          >
            {t("home:boxInvoiced")}
          </Heading>
        </BoxWrap>

        <Heading
          as="h3"
          weight="semiBold"
          padding={{ xs: { top: 1 }, sm: { top: 1 }, md: { top: 1 } }}
        >
          {totalInvoiced?.toLocaleString()} €
        </Heading>
      </Box>

      <Box isPriceShown={isPriceShown} isLoading={isLoading}>
        <BoxWrap>
          <PaidOutlinedIcon />

          <Heading
            as="h6"
            padding={{
              xs: { left: 1 },
              sm: { left: 1 },
              md: { left: 1 },
            }}
          >
            {t("home:boxPaid")}
          </Heading>
        </BoxWrap>

        <Heading
          as="h3"
          weight="semiBold"
          padding={{ xs: { top: 1 }, sm: { top: 1 }, md: { top: 1 } }}
        >
          {totalPaidInvoices?.toLocaleString()} €
        </Heading>
      </Box>
    </BoxWrapper>
  );
};

export { index as Boxes };

const BoxWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Box = styled.div<{ isPriceShown?: string; isLoading?: boolean }>`
  padding: 20px;
  flex: 0 0 49%;
  max-height: 150px;
  border-radius: 5px;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;

  ${({ isPriceShown, isLoading, theme: { colors, breakpoints } }) => css`
    ${(isLoading || isPriceShown === "false") &&
    `
    h3{
      filter: blur(10px);
    }
  `}

    border: 1px solid ${colors.lightGray};

    @media (max-width: ${breakpoints.md}px) {
      padding: 20px 10px;

      &:nth-child(1) {
        margin-bottom: 10px;
      }

      &:nth-child(2) {
        margin-bottom: 10px;
      }
    }
  `}
`;

const BoxWrap = styled.div`
  display: flex;
  align-items: center;

  ${({ theme: { colors } }) => css`
    svg {
      fill: ${colors.textColor};
    }
  `}
`;
