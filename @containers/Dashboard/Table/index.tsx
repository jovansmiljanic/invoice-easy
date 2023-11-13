// Core types
import { type FC, useContext } from "react";

// Local components
import { NotFound } from "../NotFound";
import { InvoiceItem } from "./InvoiceItem";
import { DashboardFilters } from "../DashboardFilters";

// Global types
import { Invoice } from "@types";

// Store context
import { StoreContext } from "@context";

// Global components
import { Placeholder } from "@components";

// Global styles
import { Table } from "@styles/Table";

// Grid
import { GridContext } from "@components/MainTable";

interface Table {
  tableHeader: string[];
  filterOptions: any;
  statusSelected: any;
  setSearchQuery: any;
}

const index: FC<Table> = ({
  tableHeader,
  filterOptions,
  statusSelected,
  setSearchQuery,
}) => {
  // Grid context
  const { length, updatedItems, isLoading, limit } = useContext(GridContext);

  // Store context
  const { isPhone } = useContext(StoreContext);

  if (isLoading) return <Placeholder items={tableHeader} limit={limit} />;
  if (!isLoading && length === 0) return <NotFound />;

  return (
    <>
      <DashboardFilters
        filterOptions={filterOptions}
        statusSelected={statusSelected}
        setSearchQuery={setSearchQuery}
      />

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

export { index as DashboardTable };
