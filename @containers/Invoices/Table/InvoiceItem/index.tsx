// Core types
import { type FC, useContext } from "react";

// Global types
import { Invoice } from "@types";

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
import { Actions } from "../../Actions";

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
  ${({ isPriceShown }) => css`
    ${isPriceShown === "false" &&
    `
      filter: blur(10px);
    `}
  `}
`;

interface Item {
  updatedItems: Invoice;
}

const index: FC<Item> = ({ updatedItems }) => {
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
      <TableCell isPriceShown={isPriceShown}>{totalPrice}</TableCell>
      <TableCell>
        <Actions updatedItems={updatedItems} />
      </TableCell>
    </>
  );
};

export { index as InvoiceItem };