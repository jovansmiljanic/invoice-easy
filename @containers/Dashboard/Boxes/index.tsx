// Core types
import { type FC } from "react";

// Vendors
import styled, { css } from "styled-components";
import useTranslation from "next-translate/useTranslation";

// Icons
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import RequestPageOutlinedIcon from "@mui/icons-material/RequestPageOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";

// Global components
import { Heading } from "@components";

// Global types
import { Invoice } from "@types";
import { useGetCookie } from "@utils/shared";

interface Boxes {
  items?: Invoice[];
  invoicesLength: number;
  isLoading?: boolean;
}

const index: FC<Boxes> = ({ items, invoicesLength, isLoading }) => {
  // Translation
  const { t } = useTranslation();

  // Calculate the total sum of prices
  const totalInvoiced = items?.reduce((sum: number, invoice: Invoice) => {
    const items = invoice.items;
    const prices = items.map(item => parseInt(item.price.toString()));
    const total = prices.reduce((subtotal, price) => subtotal + price, 0);
    return sum + total;
  }, 0);

  const totalPaid = items?.filter((invoice: Invoice) => invoice.status === "1");

  // Calculate the total sum of prices
  const totalPaidInvoices = totalPaid?.reduce(
    (sum: number, invoice: Invoice) => {
      const items = invoice.items;
      const prices = items.map(item => parseInt(item.price.toString()));
      const total = prices.reduce((subtotal, price) => subtotal + price, 0);
      return sum + total;
    },
    0
  );

  const getTotalInvoicedPriceThisYear = (
    invoices: Invoice[] | undefined
  ): number => {
    const currentYear = new Date().getFullYear();
    return (
      invoices?.reduce((sum, invoice) => {
        const startDate = new Date(invoice.startDate);
        if (startDate.getFullYear() === currentYear) {
          const items = invoice.items;
          const prices = items.map(item => parseInt(item.price.toString()));
          const total = prices.reduce((subtotal, price) => subtotal + price, 0);
          return sum + total;
        }
        return sum;
      }, 0) ?? 0
    );
  };

  const totalInvoicedThisYear = getTotalInvoicedPriceThisYear(items);

  const curr = useGetCookie("currency");

  let a;

  switch (curr) {
    case "euro":
      a = "€";
      break;
    case "dolar":
      a = "$";
      break;
    case "rsd":
      a = "din";
      break;
    default:
      a = "";
  }

  return (
    <BoxWrapper>
      <Box isLoading={isLoading}>
        <BoxWrap>
          <ReceiptLongOutlinedIcon />

          <Heading
            as="h6"
            weight="regular"
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
          <ReceiptOutlinedIcon />

          <Heading
            as="h6"
            weight="regular"
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
          {totalInvoiced?.toLocaleString()} {a}
        </Heading>
      </Box>

      <Box isLoading={isLoading}>
        <BoxWrap>
          <RequestPageOutlinedIcon />

          <Heading
            as="h6"
            weight="regular"
            padding={{
              xs: { left: 1 },
              sm: { left: 1 },
              md: { left: 1 },
            }}
          >
            {t("home:boxInvoicedThisYear")}{" "}
          </Heading>
        </BoxWrap>

        <Heading
          as="h3"
          weight="semiBold"
          padding={{ xs: { top: 1 }, sm: { top: 1 }, md: { top: 1 } }}
        >
          {totalInvoicedThisYear.toLocaleString()} {a}
        </Heading>
      </Box>

      <Box isLoading={isLoading}>
        <BoxWrap>
          <PaidOutlinedIcon />

          <Heading
            as="h6"
            weight="regular"
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
          {totalPaidInvoices?.toLocaleString()} {a}
        </Heading>
      </Box>
    </BoxWrapper>
  );
};

export { index as Boxes };

const BoxWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  margin-bottom: 20px;
`;

const Box = styled.div<{ isPriceShown?: string; isLoading?: boolean }>`
  padding: 20px;
  flex: 0 0 24%;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;

  ${({ isPriceShown, isLoading, theme: { colors, breakpoints } }) => css`
    background-color: ${colors.white};

    ${(isLoading || isPriceShown === "false") &&
    `
    h3{
      filter: blur(10px);
    }
  `}

    @media (max-width: ${breakpoints.md}px) {
      flex: 0 0 100%;
      padding: 20px 10px;

      &:nth-child(1) {
        margin-bottom: 10px;
      }

      &:nth-child(2) {
        margin-bottom: 10px;
      }

      &:nth-child(3) {
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
