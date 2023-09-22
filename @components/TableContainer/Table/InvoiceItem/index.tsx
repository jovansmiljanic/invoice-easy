// Core types
import { type FC } from "react";

// Global types
import { Invoice } from "@types";

// Client utils
import { daysLeft, formatDate, getTotalPrice } from "@utils/client";

// Shared utils
import { copyText } from "@utils/shared";

// Vendors
import { lighten } from "polished";
import styled, { css } from "styled-components";
import useTranslation from "next-translate/useTranslation";

// Table component
import { Actions } from "@components/TableContainer/Actions";

const Status = styled.div<{ status: "danger" | "success" }>`
  width: fit-content;
  min-width: 45px;
  text-align: center;
  font-size: 13px;
  padding: 0 5px;
  border-radius: 5px;

  ${({ status, theme: { colors, font } }) => css`
    color: ${colors[status]};
    background-color: ${lighten(0.3, colors[status])};
    font-weight: ${font.weight.semiBold};
  `}
`;

const TableCell = styled.td`
  padding: 8px;

  ${({ theme: { colors, breakpoints } }) => css`
    border-bottom: 1px solid ${colors.lightGray};

    @media (max-width: ${breakpoints.md}px) {
      border-bottom: none;
    }
  `}
`;

interface Item {
  updatedItems: Invoice;
}

const index: FC<Item> = ({ updatedItems }) => {
  // Translation
  const { t } = useTranslation();

  let status;

  switch (updatedItems.status) {
    case "1":
      status = <Status status="success">{t("table:paidStatus")}</Status>;
      break;
    case "2":
      status = <Status status="danger">{t("table:unPaidStatus")}</Status>;
      break;
    default:
      status = <></>;
  }

  return (
    <>
      <TableCell onClick={() => copyText(updatedItems._id.toString())}>
        #{updatedItems._id.toString().slice(19)}
      </TableCell>
      <TableCell>{updatedItems.client.clientName}</TableCell>
      <TableCell>{status}</TableCell>
      <TableCell>{formatDate(updatedItems.issuedDate)}</TableCell>
      <TableCell>
        {daysLeft(updatedItems.paymentDeadline, updatedItems.issuedDate)}
      </TableCell>
      <TableCell>
        {getTotalPrice(updatedItems.items, updatedItems?.tax)}
      </TableCell>
      <TableCell>
        <Actions updatedItems={updatedItems} />
      </TableCell>
    </>
  );
};

export { index as InvoiceItem };
