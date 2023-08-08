// Core types
import { type FC, useContext } from "react";

// Vendors
import { lighten } from "polished";
import styled, { css } from "styled-components";

// Shared utils
import { copyText } from "@utils/shared";

// GLobal types
import { Client } from "@types";

// Global context
import { StoreContext } from "@context";

const Item = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  ${({ theme: { breakpoints } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      flex-direction: column;
    }
  `}
`;

const Wrap = styled.div``;

const Thead = styled.thead`
  font-size: 14px;

  ${({ theme: { colors, font, breakpoints } }) => css`
    padding: 10px;
    font-weight: ${font.weight.bold};
    border-bottom: 1px solid ${colors.lightGray};

    @media (max-width: ${breakpoints.md}px) {
      width: 50%;
    }

    td {
      @media (max-width: ${breakpoints.md}px) {
        padding: 10px 5px;
        width: 100%;
        display: flex;
        flex-direction: column;
      }
    }
  `}
`;

const Tbody = styled.tbody`
  ${({ theme: { colors, breakpoints } }) => css`
    padding: 10px;

    @media (max-width: ${breakpoints.md}px) {
      padding: 10px 0;
      border-bottom: 1px solid ${colors.lightGray};
      width: 50%;
    }

    tr {
      border-bottom: 1px solid ${colors.lightGray};

      @media (max-width: ${breakpoints.md}px) {
        border-bottom: none;
        width: 100%;
        display: flex;
        flex-direction: column;
      }
    }

    td {
      padding: 10px 15px;

      &:nth-child(1) {
        width: 10%;

        cursor: pointer;
        color: ${colors.secondary};

        &:hover {
          color: ${colors.primary};
        }
      }

      &:nth-child(2) {
        width: 15%;
        font-weight: 600;
      }

      &:nth-child(3) {
        width: 20%;
      }

      &:nth-child(4) {
        width: 15%;
      }

      &:nth-child(5) {
        width: 15%;
      }

      &:nth-child(6) {
        width: 15%;
      }

      @media (max-width: ${breakpoints.md}px) {
        width: 100% !important;
      }
    }
  `}
`;

interface Item {
  $item: Client;
}

const index: FC<Item> = ({ $item }) => {
  const { isPhone } = useContext(StoreContext);

  return (
    <>
      {isPhone && (
        <Thead>
          <tr>
            <td>ID</td>
            <td>Client</td>
            <td>Address</td>
            <td>City</td>
            <td>Country</td>
            <td>ZIP code</td>
          </tr>
        </Thead>
      )}

      <Tbody>
        <tr>
          <td onClick={() => copyText($item._id.toString())}>
            #{$item._id.toString().slice(19)}
          </td>
          <td>{$item.clientName}</td>
          <td>{$item.clientAddress}</td>
          <td>{$item.city}</td>
          <td>{$item.country}</td>
          <td>{$item.zipCode}</td>
        </tr>
      </Tbody>
    </>
  );
};

export { index as Item };
