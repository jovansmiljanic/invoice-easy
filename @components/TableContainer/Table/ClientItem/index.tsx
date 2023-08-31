// Core types
import type { FC } from "react";

// Global components
import { Client } from "@types";

// Shared utils
import { copyText } from "@utils/shared";

// Vendors
import styled, { css } from "styled-components";

const Item = styled.div``;

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
