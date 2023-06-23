// Core types
import { useState, type FC, useContext } from "react";

// NextJS
import Link from "next/link";

// Vendors
import { useRouter } from "next/router";
import styled, { css } from "styled-components";

// Shared utils
import { copyText } from "@utils/shared";

// Client utils
import {
  daysLeft,
  formatDate,
  getTotalPrice,
  invoicePaid,
} from "@utils/client";

// GLobal types
import { Invoice } from "@types";

// Svg
import { Dots, Eye } from "public/svg";

// Global context
import { StoreContext } from "@context";

interface Item {
  $item: Invoice;
}

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

const Popup = styled.div`
  position: relative;
`;

const Modal = styled.div`
  position: absolute;
  z-index: 1;
  top: 100%;
  right: 0;
  border-radius: 5px;
  padding: 10px 0;

  display: flex;
  flex-direction: column;

  ${({ theme: { colors } }) => css`
    min-width: 160px;
    min-height: 50px;
    box-shadow: 0 0.25rem 1rem rgba(161, 172, 184, 0.45);
    background-color: ${colors.white};
  `}
`;

const ModalItem = styled.div`
  padding: 10px 0;
  width: 100%;
  text-align: center;
  cursor: pointer;

  ${({ theme: { colors } }) => css`
    &:hover {
      background-color: ${colors.hoverGray};
    }
  `}
`;

const Paid = styled.div`
  width: fit-content;
  min-width: 45px;
  text-align: center;
  font-size: 13px;
  padding: 0 5px;
  border-radius: 5px;

  ${({ theme: { colors, font } }) => css`
    color: ${colors.white};
    background-color: ${colors.success};
    font-weight: ${font.weight.semiBold};
  `}
`;

const UnPaid = styled.div`
  width: fit-content;
  min-width: 45px;
  text-align: center;
  font-size: 13px;
  padding: 0 5px;
  border-radius: 5px;

  ${({ theme: { colors, font } }) => css`
    color: ${colors.white};
    background-color: ${colors.danger};
    font-weight: ${font.weight.semiBold};
  `}
`;

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
    color: ${colors.gray};

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
        color: ${colors.primary};

        &:hover {
          color: ${colors.secondary};
        }
      }

      &:nth-child(2) {
        width: 15%;
        font-weight: 600;
      }

      &:nth-child(3) {
        width: 15%;
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

        ${Wrap} {
          display: flex;
          justify-content: flex-end;

          @media (max-width: ${breakpoints.md}px) {
            justify-content: flex-start;
          }

          svg {
            cursor: pointer;
            margin-left: 5px;

            path {
              fill: ${colors.gray};
            }
          }
        }
      }
      @media (max-width: ${breakpoints.md}px) {
        width: 100% !important;
      }
    }
  `}
`;

const index: FC<Item> = ({ $item }) => {
  const { isPhone } = useContext(StoreContext);

  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      {isPhone && (
        <Thead>
          <tr>
            <td>ID</td>
            <td>Client</td>
            <td>Total</td>
            <td>Issued date</td>
            <td>DUE</td>
            <td>Balance</td>
            <td>Actions</td>
          </tr>
        </Thead>
      )}

      <Tbody>
        <tr>
          <td onClick={() => copyText($item._id.toString())}>
            #{$item._id.toString().slice(0, 4)}
          </td>

          <td>{$item.client.clientName}</td>

          <td>
            {$item.status === "1" ? <Paid>Paid</Paid> : <UnPaid>Unpaid</UnPaid>}
          </td>

          <td>{formatDate($item.issuedDate)}</td>

          <td>{daysLeft($item.paymentDeadline, $item.issuedDate)}</td>

          <td>{getTotalPrice($item.items)} €</td>

          <td>
            <Wrap>
              <Link href={`/invoice/preview/${$item._id}`}>
                <Eye />
              </Link>

              <Popup>
                <div onClick={() => setIsOptionsOpen(!isOptionsOpen)}>
                  <Dots />
                </div>

                {isOptionsOpen && (
                  <Modal>
                    {$item.status === "2" && (
                      <ModalItem
                        onClick={() => invoicePaid({ _id: $item._id, router })}
                      >
                        Mark as paid
                      </ModalItem>
                    )}
                    <ModalItem>Download</ModalItem>
                  </Modal>
                )}
              </Popup>
            </Wrap>
          </td>
        </tr>
      </Tbody>
    </>
  );
};

export { index as Item };
