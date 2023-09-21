// Core types
import { useContext, type FC } from "react";

// Vendors
import styled, { css } from "styled-components";

// Local components
import { ClientItem } from "./ClientItem";
import { InvoiceItem } from "./InvoiceItem";
import { Placeholder } from "../Placeholder";

// Global types
import { Client, Invoice } from "@types";

// Grid context
import { GridContext } from "..";
import { StoreContext } from "@context";

const Table = styled.table`
  width: 100%;

  ${({ theme: { colors, breakpoints } }) => css`
    border: 1px solid ${colors.lightGray};

    thead {
      border-bottom: 1px solid ${colors.lightGray};
    }

    @media (max-width: ${breakpoints.md}px) {
      tr {
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid ${colors.lightGray};
      }
    }
  `}
`;

const TableHeader = styled.th`
  padding: 8px;
  text-align: left;

  &:last-child {
    text-align: right;
  }

  ${({ theme: { breakpoints } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      &:last-child {
        text-align: left;
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
  // Store context
  const { isPhone } = useContext(StoreContext);

  if (isLoading || !updatedItems || length === 0)
    return <Placeholder items={tableHeader} />;

  return (
    <>
      <Table>
        {!isPhone && (
          <thead>
            <tr>
              {tableHeader.map((item, i) => (
                <TableHeader key={i}>{item}</TableHeader>
              ))}
            </tr>
          </thead>
        )}

        <tbody>
          {Array.isArray(updatedItems) &&
            updatedItems.map((item, i) => (
              <tr key={i}>
                {path === "client" ? (
                  <ClientItem updatedItems={item as Client} />
                ) : path === "invoice" ? (
                  <InvoiceItem updatedItems={item as Invoice} />
                ) : (
                  <></>
                )}
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export { index as Table };
