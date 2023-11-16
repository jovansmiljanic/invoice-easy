// Core types
import { type FC, useContext } from "react";

// Global types
import { Invoice, MyAccount } from "@types";

// Client utils
import { daysLeft, formatDate, useTotalPrice } from "@utils/client";

// Shared utils
import { copyText } from "@utils/shared";

// Vendors
import { lighten } from "polished";
import styled, { css } from "styled-components";
import useTranslation from "next-translate/useTranslation";

// Table component
import { StoreContext } from "@context";
import { ActionItems } from "./Actions";

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

  ${({ isPriceShown, theme: { colors, breakpoints } }) => css`
    ${isPriceShown === "false" &&
    `
    
      filter: blur(10px);
    
  `}

    border-bottom: 1px solid ${colors.lightGray};

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
  currentUser?: MyAccount;
}

const index: FC<Item> = ({ updatedItems, currentUser }) => {
  // Translation
  const { t } = useTranslation();

  const { isPriceShown } = useContext(StoreContext);

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
      <TableCell isPriceShown={isPriceShown}>
        {totalPrice}
        {t("invoice:currency")}
      </TableCell>
      <TableCell>
        <ActionItems updatedItems={updatedItems} currentUser={currentUser} />
      </TableCell>
    </>
  );
};

export { index as InvoiceItem };
