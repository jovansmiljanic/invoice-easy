// Core types
import { type FC, useContext } from "react";

// Global types
import { Invoice, MyAccount } from "@types";

// Client utils
import { daysLeft, formatDate, useTotalPrice } from "@utils/client";

// Shared utils
import { copyText, useGetCookie } from "@utils/shared";

// Vendors
import { lighten } from "polished";
import styled, { css } from "styled-components";
import useTranslation from "next-translate/useTranslation";

// Table component
import { StoreContext } from "@context";
import { ActionItems } from "./Actions";
import { DownloadInvoice } from "@components";

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

const TableCell = styled.td<{ isPriceShown?: string }>`
  padding: 8px;
  border-radius: 5px;

  ${({ isPriceShown, theme: { colors, breakpoints } }) => css`
    ${isPriceShown === "false" &&
    css`
      filter: blur(10px);
    `}

    &:first-child {
      cursor: pointer;
      color: ${colors.primary};
    }

    @media (max-width: ${breakpoints.md}px) {
      border-bottom: none;
    }
  `}
`;

interface Item {
  updatedItems: Invoice;
  currentUser: MyAccount | null;

  onSelect: (invoiceId: string, isSelected: boolean) => void; // Function to update selection
  isSelected: boolean; // Indicates if the item is selected
}

const index: FC<Item> = ({
  updatedItems,
  currentUser,
  onSelect,
  isSelected,
}) => {
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

  const totalPrice = useTotalPrice(updatedItems.items, updatedItems?.tax);

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
    <>
      <TableCell>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={e => onSelect(e.target.checked as any, isSelected)}
        />
      </TableCell>
      <TableCell>{updatedItems.client.clientName}</TableCell>
      <TableCell>{status}</TableCell>
      <TableCell>{formatDate(updatedItems.issuedDate)}</TableCell>
      <TableCell>
        {daysLeft(updatedItems.paymentDeadline, updatedItems.issuedDate)}
      </TableCell>
      <TableCell>
        {totalPrice} {a}
      </TableCell>
      <TableCell>
        <ActionItems updatedItems={updatedItems} currentUser={currentUser} />
      </TableCell>
    </>
  );
};

export { index as InvoiceItem };
