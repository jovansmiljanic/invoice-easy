// Core types
import type { FC } from "react";

// Vendors
import styled, { css } from "styled-components";

// Icons
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import { Heading } from "@components";
import { Invoice } from "@types";

const BoxWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Box = styled.div`
  padding: 20px;
  border-radius: 5px;
  flex: 0 0 49%;
  max-height: 150px;

  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;

  ${({ theme: { colors, breakpoints } }) => css`
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

interface Boxes {
  items?: Invoice[];
  invoicesLength: number;
  clientsLenght: number;
}

const index: FC<Boxes> = ({ items, invoicesLength, clientsLenght }) => {
  // Calculate the total sum of prices
  const totalPrice = items?.reduce((sum: number, invoice: Invoice) => {
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
      <Box>
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
            Invoices
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

      <Box>
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
            Clients
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

      <Box>
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
            Invoiced
          </Heading>
        </BoxWrap>

        <Heading
          as="h3"
          weight="semiBold"
          padding={{ xs: { top: 1 }, sm: { top: 1 }, md: { top: 1 } }}
        >
          {totalPrice?.toLocaleString()} €
        </Heading>
      </Box>

      <Box>
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
            Paid
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
