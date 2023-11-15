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
import { Table } from "@styles/Table";
import { GridContext } from "@components/MainTable";

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

  if (isLoading || !updatedItems || length === 0) return <Placeholder />;

  return (
    <>
      <Table>
        {!isPhone && (
          <thead>
            <tr>
              {tableHeader.map((item, i) => (
                <th key={i}>{item}</th>
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
