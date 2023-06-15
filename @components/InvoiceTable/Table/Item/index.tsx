// Core types
import { useState, type FC } from "react";

// NextJS
import Link from "next/link";

// Vendors
import styled, { css } from "styled-components";
import { copyText } from "@utils/shared";
import { daysLeft, formatDate, getTotalPrice } from "@utils/client";

// GLobal types
import { Invoice } from "@types";
import { Dots, Eye } from "public/svg";
import { invoicePaid } from "@utils/client";
import { useRouter } from "next/router";

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

const Tbody = styled.tbody`
  ${({ theme: { colors } }) => css`
    color: ${colors.gray};

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
        font-weight: 600;
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

        ${Wrap} {
          display: flex;
          justify-content: flex-end;

          svg {
            cursor: pointer;
            margin-left: 5px;

            path {
              fill: ${colors.gray};
            }
          }
        }
      }
    }
  `}
`;

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
  font-size: 14px;

  ${({ theme: { defaults, colors, font, ...theme } }) => css`
    color: ${colors.white};
    background-color: ${colors.success};
    font-weight: ${font.weight.semiBold};
  `}
`;

const index: FC<Item> = ({ $item }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const router = useRouter();

  return (
    <Tbody>
      <tr>
        <td onClick={() => copyText($item._id.toString())}>
          #{$item._id.toString().slice(0, 4)}
        </td>
        <td>{$item.client.clientName}</td>
        <td>{getTotalPrice($item.items)}</td>
        <td>{formatDate($item.issuedDate)}</td>
        <td>{daysLeft($item.paymentDeadline, $item.issuedDate)}</td>
        <td>
          {$item.status === "1" ? (
            <Paid>PAID</Paid>
          ) : (
            getTotalPrice($item.items)
          )}
        </td>
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
  );
};

export { index as Item };
