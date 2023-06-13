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
      &:not(:last-child) {
        border-bottom: 1px solid ${colors.lightGray};
      }
    }

    td {
      padding: 10px 15px;

      svg {
        cursor: pointer;
        margin-right: 15px;
      }

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
        width: 15%;
      }

      &:nth-child(8) {
        width: 15%;

        div {
          display: flex;

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
        <td>Status</td>
        <td>
          <div>
            <Link href={`/invoice/preview/${$item._id}`}>
              <svg
                width="19"
                height="19"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.1012 9.4162C11.9953 9.4162 9.47625 11.9353 9.47625 15.0412C9.47625 18.1471 11.9953 20.6662 15.1012 20.6662C18.2072 20.6662 20.7262 18.1481 20.7262 15.0412C20.7262 11.9343 18.2081 9.4162 15.1012 9.4162ZM15.1012 18.7912C13.0331 18.7912 11.3081 17.0681 11.3081 14.9999C11.3081 12.9318 12.99 11.2499 15.0581 11.2499C17.1262 11.2499 18.8081 12.9318 18.8081 14.9999C18.8081 17.0681 17.1694 18.7912 15.1012 18.7912ZM29.9906 14.7824C29.9794 14.7356 29.985 14.6849 29.9709 14.639C29.9653 14.6193 29.9522 14.6081 29.9456 14.5912C29.9353 14.5649 29.9381 14.5331 29.9241 14.5078C27.1969 8.26401 21.3206 4.67151 15.0581 4.67151C8.79563 4.67151 2.80125 8.25838 0.073125 14.5021C0.061875 14.5284 0.06375 14.5556 0.0534375 14.5856C0.046875 14.6043 0.03375 14.6137 0.0271875 14.6315C0.013125 14.6784 0.01875 14.7281 0.009375 14.7759C-0.0075 14.8603 -0.0234375 14.9428 -0.0234375 15.0281C-0.0234375 15.1134 -0.0075 15.194 0.009375 15.2793C0.01875 15.3262 0.0121875 15.3778 0.0271875 15.4218C0.0328125 15.4434 0.046875 15.4518 0.0534375 15.4706C0.0628125 15.4959 0.0609375 15.5278 0.073125 15.554C2.80125 21.7959 8.7375 25.3303 15 25.3303C21.2625 25.3303 27.1978 21.8034 29.925 15.5596C29.9391 15.5324 29.9363 15.5053 29.9466 15.4753C29.9531 15.4593 29.9653 15.4471 29.9709 15.4284C29.985 15.3824 29.9812 15.3328 29.9906 15.284C30.0075 15.1996 30.0225 15.1181 30.0225 15.0309C30.0225 14.9484 30.0066 14.8668 29.9897 14.7815L29.9906 14.7824ZM15 23.4553C9.68906 23.4553 4.46062 20.6559 1.89187 15.0271C4.43625 9.41807 9.73406 6.54557 15.0581 6.54557C20.3812 6.54557 25.5609 9.42088 28.1062 15.0328C25.5628 20.6409 20.325 23.4553 15 23.4553Z"
                  fill="black"
                />
              </svg>
            </Link>

            {/* <svg
              width="20"
              height="20"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25.4125 4.58748C25.176 4.35269 24.8794 4.18763 24.5553 4.11044C24.2312 4.03327 23.8919 4.04694 23.575 4.14998L5.28753 10.25C4.94837 10.3574 4.64867 10.563 4.42627 10.8407C4.20387 11.1184 4.06876 11.4558 4.03799 11.8103C4.00723 12.1647 4.08219 12.5203 4.25342 12.8322C4.42465 13.144 4.68445 13.3982 5.00003 13.5625L12.5875 17.3125L16.3375 24.925C16.4883 25.2229 16.7189 25.4732 17.0037 25.6475C17.2884 25.8219 17.6162 25.9137 17.95 25.9125H18.075C18.4327 25.8862 18.774 25.7529 19.0549 25.5299C19.3358 25.307 19.5432 25.0048 19.65 24.6625L25.8375 6.42498C25.948 6.10989 25.9668 5.7699 25.8915 5.44459C25.8163 5.11929 25.6502 4.82205 25.4125 4.58748ZM6.06253 11.975L22.025 6.64998L13.1625 15.5125L6.06253 11.975ZM18.0375 23.9375L14.4875 16.8375L23.35 7.97498L18.0375 23.9375Z"
                fill="black"
              />
            </svg>

            <svg
              width="20"
              height="20"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5 6.25C17.5 7.63071 16.3807 8.75 15 8.75C13.6193 8.75 12.5 7.63071 12.5 6.25C12.5 4.86929 13.6193 3.75 15 3.75C16.3807 3.75 17.5 4.86929 17.5 6.25Z"
                fill="black"
              />
              <path
                d="M17.5 15C17.5 16.3807 16.3807 17.5 15 17.5C13.6193 17.5 12.5 16.3807 12.5 15C12.5 13.6193 13.6193 12.5 15 12.5C16.3807 12.5 17.5 13.6193 17.5 15Z"
                fill="black"
              />
              <path
                d="M15 26.25C16.3807 26.25 17.5 25.1307 17.5 23.75C17.5 22.3693 16.3807 21.25 15 21.25C13.6193 21.25 12.5 22.3693 12.5 23.75C12.5 25.1307 13.6193 26.25 15 26.25Z"
                fill="black"
              />
            </svg> */}
          </div>
        </td>
      </tr>
    </Tbody>
  );
};

export { index as Item };
