// Core types
import { useContext, type FC } from "react";

// Vendors
import styled, { css } from "styled-components";

// Local components
import { InvoiceItem } from "./InvoiceItem";

// Global types
import { Invoice } from "@types";

// Grid context

// Local components
import { NotFound } from "../NotFound";

// Store context
import { StoreContext } from "@context";
import { Placeholder } from "@components/Dashboard";
import { GridContext } from "..";

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
}

const index: FC<Table> = ({ tableHeader }) => {
  // Grid context
  const { length, updatedItems, isLoading, limit } = useContext(GridContext);

  // Store context
  const { isPhone } = useContext(StoreContext);

  if (length === 0) {
    return <NotFound />;
  }

  if (isLoading || !updatedItems || length === 0)
    return <Placeholder items={tableHeader} limit={limit} />;

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
                <InvoiceItem updatedItems={item as Invoice} />
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export { index as Table };
