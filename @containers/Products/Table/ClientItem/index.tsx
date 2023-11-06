// Core types
import { type FC } from "react";

// Global types
import { Product } from "@types";

// Shared utils
import { copyText } from "@utils/shared";

// Vendors
import styled, { css } from "styled-components";

// Local components
import { Actions } from "./Actions";

interface Item {
  updatedItems: Product;
}

const index: FC<Item> = ({ updatedItems }) => {
  return (
    <>
      <TableCell onClick={() => copyText(updatedItems._id.toString())}>
        #{updatedItems._id.toString().slice(19)}
      </TableCell>
      <TableCell>{updatedItems.name}</TableCell>
      <TableCell>{updatedItems.price}</TableCell>
      <TableCell>
        <Actions updatedItems={updatedItems} />{" "}
      </TableCell>
    </>
  );
};

export { index as ClientItem };

const TableCell = styled.td`
  padding: 8px;

  ${({ theme: { colors } }) => css`
    border-bottom: 1px solid ${colors.lightGray};

    &:first-child {
      cursor: pointer;
      color: ${colors.primary};

      &:hover {
        color: ${colors.secondary};
      }
    }

    &:last-child {
      text-align: right;
    }
  `}
`;
