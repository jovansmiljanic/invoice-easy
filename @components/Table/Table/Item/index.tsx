// Core types
import type { FC } from "react";

// Global components
import { Button, Heading } from "@components";

// NextJS
import Link from "next/link";
import Image from "next/image";

// Vendors
import styled, { css } from "styled-components";
import { copyText } from "@utils/shared";
import {
  daysLeft,
  formatDate,
  getClientName,
  getTotalPrice,
} from "@utils/client";
import { Invoice } from "@types";
import { Eye } from "public/svg";

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

interface Item {
  $item: Invoice;
}

const Tbody = styled.tbody`
  ${({ theme: { colors } }) => css`
    tr {
      border-bottom: 1px solid ${colors.lightGray};
    }

    td {
      padding: 10px 15px;

      &:nth-child(1) {
        width: 10%;

        cursor: pointer;
        color: ${colors.primary};

        &:hover {
          color: ${colors.secondary};
        }
      }

      &:nth-child(2) {
        width: 15%;
      }

      &:nth-child(3) {
        width: 12%;
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

      &:nth-child(7) {
        width: 5%;

        div {
          display: flex;
          justify-content: flex-end;

          svg {
            margin: 0;

            &:not(:last-child) {
              margin-left: 5px;
            }
          }
        }
      }
    }
  `}
`;

const index: FC<Item> = ({ $item }) => {
  return (
    <Tbody>
      <tr>
        <td onClick={() => copyText($item._id.toString())}>
          #{$item._id.toString().slice(0, 4)}
        </td>
        <td>{getClientName($item.client)}</td>
        <td>{getTotalPrice($item.items)} €</td>
        <td>{formatDate($item.issuedDate)}</td>
        <td>{daysLeft(formatDate($item.paymentDeadline))}</td>
        <td>PAID</td>
        <td>
          <div>
            <Link href={`/invoice/preview/${$item._id}`}>
              <Eye />
            </Link>
          </div>
        </td>
      </tr>
    </Tbody>
  );
};

export { index as Item };
