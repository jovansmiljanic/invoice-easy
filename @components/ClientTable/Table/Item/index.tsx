// Core types
import { useState, type FC } from "react";

// NextJS
import Link from "next/link";

// Vendors
import styled, { css } from "styled-components";
import { copyText } from "@utils/shared";

// GLobal types
import { Client, Invoice } from "@types";
import { Dots, Eye } from "public/svg";

interface Item {
  $item: Client;
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
        width: 25%;

        cursor: pointer;
        color: ${colors.primary};

        &:hover {
          color: ${colors.secondary};
        }
      }

      &:nth-child(2) {
        width: 25%;
      }

      &:nth-child(3) {
        width: 25%;
      }

      &:nth-child(4) {
        width: 25%;

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

const index: FC<Item> = ({ $item }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  return (
    <Tbody>
      <tr>
        <td onClick={() => copyText($item._id.toString())}>
          #{$item._id.toString().slice(0, 4)}
        </td>
        <td>{$item.clientName}</td>
        <td>{$item.clientAddress}</td>

        <td>
          <Wrap>
            <Link href={`/invoice/add/${$item._id}`}>
              <Eye />
            </Link>

            <Popup>
              <div onClick={() => setIsOptionsOpen(!isOptionsOpen)}>
                <Dots />
              </div>

              {isOptionsOpen && (
                <Modal>
                  <ModalItem>Edit client</ModalItem>
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
