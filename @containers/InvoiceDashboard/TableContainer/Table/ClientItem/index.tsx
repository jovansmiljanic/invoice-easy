// Core types
import { useState, type FC, useContext } from "react";

// Global components
import { Client } from "@types";

// Shared utils
import { copyText } from "@utils/shared";

// Vendors
import styled, { css } from "styled-components";
import { AddClientModal } from "@components/AddClientModal";
import { StoreContext } from "@context";
import useTranslation from "next-translate/useTranslation";

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

const ModalItem = styled.div`
  padding: 10px 0 10px 20px;
  width: 100%;
  text-align: left;
  cursor: pointer;

  ${({ theme: { colors } }) => css`
    color: ${colors.textColor};

    &:hover {
      background-color: ${colors.hoverGray};
    }

    &:nth-child(4) {
      color: ${colors.danger};
      border-top: 1px solid ${colors.lightGray};
    }
  `}
`;

const index: FC<Item> = ({ updatedItems }) => {
  // Translation
  const { t } = useTranslation();

  const { setClientData, setIsConfirmModal, isConfirmModal } =
    useContext(StoreContext);

  return (
    <>
      <TableCell onClick={() => copyText(updatedItems._id.toString())}>
        #{updatedItems._id.toString().slice(19)}
      </TableCell>
      <TableCell>{updatedItems.clientName}</TableCell>
      <TableCell>{updatedItems.clientAddress}</TableCell>
      <TableCell>{updatedItems.country}</TableCell>
      <TableCell>
        <ModalItem
          onClick={() => {
            // Edit client
            setClientData(updatedItems);

            setIsConfirmModal(!isConfirmModal);
          }}
        >
          {t("table:delete")}
        </ModalItem>
      </TableCell>
    </>
  );
};

export { index as ClientItem };
