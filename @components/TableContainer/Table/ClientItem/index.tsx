// Core types
import { useState, type FC } from "react";

// Global components
import { Client } from "@types";

// Shared utils
import { copyText } from "@utils/shared";

// Vendors
import styled, { css } from "styled-components";
import { ClientModal } from "@components/ClientModal";

interface Item {
  updatedItems: Client;
}

const TableCell = styled.td`
  padding: 8px;
  border-bottom: 1px solid #ddd;

  ${({ theme: { colors } }) => css`
    &:first-child {
      cursor: pointer;
      color: ${colors.primary};
    }

    &:last-child {
      text-align: right;
    }
  `}
`;

const index: FC<Item> = ({ updatedItems }) => {
  const [a, setA] = useState(false);
  return (
    <>
      <TableCell onClick={() => copyText(updatedItems._id.toString())}>
        #{updatedItems._id.toString().slice(19)}
      </TableCell>
      <TableCell>{updatedItems.clientName}</TableCell>
      <TableCell>{updatedItems.clientAddress}</TableCell>
      <TableCell>{updatedItems.country}</TableCell>
      <TableCell>
        <div onClick={() => setA(!a)}>aaa</div>

        {a && <ClientModal />}
      </TableCell>
    </>
  );
};

export { index as ClientItem };
