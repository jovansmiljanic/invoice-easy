// Core types
import { useContext, type FC, Fragment } from "react";

// Vendors
import styled, { css } from "styled-components";

// Local components
import { NotFound } from "../NotFound";
import { ClientItem } from "./ClientItem";
import { InvoiceItem } from "./InvoiceItem";
import { Placeholder } from "../Placeholder";

// Global types
import { Client, Invoice } from "@types";

// Grid context
import { GridContext } from "..";

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

  if (isLoading || !updatedItems) return <Placeholder />;

  if (length === 0) return <NotFound />;

  return (
    <>
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

      <Placeholder />
    </>
  );
};

export { index as Table };
