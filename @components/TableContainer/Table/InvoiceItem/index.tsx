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

// Table component
import { Actions } from "@components/TableContainer/Actions";

const Item = styled.div``;

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

interface Item {
  updatedItems: Invoice;
}

const index: FC<Item> = ({ updatedItems }) => {
  let status;

  switch (updatedItems.status) {
    case "1":
      status = <Status status="success">Paid</Status>;
      break;
    case "2":
      status = <Status status="danger">Unpaid</Status>;
      break;
    default:
      status = <>not</>;
  }

  return (
    <tr>
      <td onClick={() => copyText(updatedItems._id.toString())}>
        #{updatedItems._id.toString().slice(19)}
      </td>
      <td>{updatedItems.client.clientName}</td>
      <td>{status}</td>
      <td>{formatDate(updatedItems.issuedDate)}</td>
      <td>{daysLeft(updatedItems.paymentDeadline, updatedItems.issuedDate)}</td>
      <td>{getTotalPrice(updatedItems.items, updatedItems?.tax)}</td>
      <td>
        <Actions updatedItems={updatedItems} />
      </td>
    </tr>
  );
};

export { index as InvoiceItem };
