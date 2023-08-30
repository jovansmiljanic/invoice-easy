// Core types
import type { FC } from "react";

import { NotFound } from "@components/TableContainer/NotFound";
import { Client, Invoice } from "@types";
import { daysLeft, formatDate, getTotalPrice } from "@utils/client";
import { copyText } from "@utils/shared";

// Vendors
import styled, { css } from "styled-components";
import { lighten } from "polished";

const Item = styled.div`
  ${({ theme: { defaults, colors, font, ...theme } }) => css``}
`;

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
  updatedItems: Client;
}

const index: FC<Item> = ({ updatedItems }) => {
  return (
    <tr>
      <td onClick={() => copyText(updatedItems._id.toString())}>
        #{updatedItems._id.toString().slice(19)}
      </td>
      <td>{updatedItems.clientName}</td>
      <td>{updatedItems.clientAddress}</td>
      <td>{updatedItems.country}</td>
    </tr>
  );
};

export { index as ClientItem };
