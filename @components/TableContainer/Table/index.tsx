// Core types
import { useContext, type FC, Fragment } from "react";

// Vendors
import styled, { css } from "styled-components";

// Store context
import { StoreContext } from "@context";

// Global components
import { TablePlaceholder } from "@components";

// Table template
import { lighten } from "polished";
import { ClientItem } from "./ClientItem";
import { NotFound } from "../NotFound";
import { GridContext } from "..";
import { InvoiceItem } from "./InvoiceItem";
import { Client, Invoice } from "@types";

const Table = styled.table`
  width: 100%;
  border-radius: 0 0 5px 5px;

  ${({ theme: { colors, breakpoints } }) => css`
    border: 1px solid ${colors.lightGray};

    @media (max-width: ${breakpoints.md}px) {
      display: flex;
      flex-wrap: wrap;
    }
  `}
`;

const Thead = styled.thead`
  font-size: 14px;

  ${({ theme: { colors, font, breakpoints } }) => css`
    font-weight: ${font.weight.bold};
    border-bottom: 1px solid ${colors.lightGray};

    td {
      padding: 15px;

      @media (max-width: ${breakpoints.md}px) {
        width: 100%;
        display: flex;
        flex-direction: column;
      }

      &:nth-child(1) {
        width: 10%;
      }

      &:nth-child(2) {
        width: 25%;
      }

      &:nth-child(3) {
        width: 25%;
      }

      &:nth-child(4) {
        width: 2%;
      }
    }
  `}
`;

const Popup = styled.div`
  position: relative;

  svg {
    margin: 0 !important;
  }
`;

const Modal = styled.div`
  position: absolute;
  z-index: 1;
  top: 100%;
  right: 0;
  border-radius: 5px;
  padding: 5px 0;

  display: flex;
  flex-direction: column;

  ${({ theme: { colors } }) => css`
    min-width: 160px;
    min-height: 50px;
    box-shadow: 0 0.25rem 1rem rgba(161, 172, 184, 0.45);
    background-color: ${colors.background};
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

const Status = styled.div<{ status: "danger" | "success" }>`
  width: fit-content;
  min-width: 45px;
  text-align: center;
  font-size: 13px;
  padding: 0 5px;
  border-radius: 5px;

  ${({ status, theme: { colors, font } }) => css`
    color: ${colors[status]};
    background-color: ${lighten(0.3, colors[status])};
    font-weight: ${font.weight.semiBold};
  `}
`;

const Tbody = styled.tbody`
  ${({ theme: { colors, breakpoints } }) => css`
    padding: 10px;

    @media (max-width: ${breakpoints.md}px) {
      padding: 0;
      border-bottom: 1px solid ${colors.lightGray};
      width: 50%;
    }

    tr {
      border-bottom: 1px solid ${colors.lightGray};

      @media (max-width: ${breakpoints.md}px) {
        border-bottom: none;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
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
      }
      @media (max-width: ${breakpoints.md}px) {
        width: 100% !important;
      }
    }
  `}
`;

interface Table {
  tableHeader: string[];
  path: "invoice" | "client";
}

const index: FC<Table> = ({ tableHeader, path }) => {
  // Grid context
  const { length, updatedItems, isLoading } = useContext(GridContext);

  if (isLoading || !updatedItems) return <TablePlaceholder />;
  if (length === 0) return <NotFound />;

  return (
    <Table>
      <Thead>
        <tr>
          {tableHeader.map((item, i) => (
            <td key={i}>{item}</td>
          ))}
        </tr>
      </Thead>

      <Tbody>
        {Array.isArray(updatedItems) &&
          updatedItems.map((item, i) => (
            <Fragment key={i}>
              {path === "client" ? (
                <ClientItem updatedItems={item as Client} />
              ) : path === "invoice" ? (
                <InvoiceItem updatedItems={item as Invoice} />
              ) : (
                <></>
              )}
            </Fragment>
          ))}
      </Tbody>
    </Table>
  );
};

export { index as Table };
