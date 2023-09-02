// Core types
import type { FC } from "react";

// Global components
import { Client } from "@types";

// Shared utils
import { copyText } from "@utils/shared";

// Vendors
import styled, { css } from "styled-components";

interface Item {
  updatedItems: Client;
}

const TableCell = styled.td`
  padding: 8px;
  border-bottom: 1px solid #ddd;
`;

const index: FC<Item> = ({ updatedItems }) => {
  return (
    <>
      <TableCell onClick={() => copyText(updatedItems._id.toString())}>
        #{updatedItems._id.toString().slice(19)}
      </TableCell>
      <TableCell>{updatedItems.clientName}</TableCell>
      <TableCell>{updatedItems.clientAddress}</TableCell>
      <TableCell>{updatedItems.country}</TableCell>
    </>
  );
};

export { index as ClientItem };
