// Core types
import { type FC, useContext, useState, useEffect } from "react";

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
  const { length, updatedItems } = useContext(GridContext);

  // Sets state for not found icon
  const [isLoading, setIsLoading] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);

  // Store context
  const { isPhone } = useContext(StoreContext);
  useEffect(() => {
    if (length === 0) {
      setIsLoading(true);

      const timer = setTimeout(() => {
        setShowNotFound(true);
        setIsLoading(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setShowNotFound(false);
      setIsLoading(false);
    }
  }, [length]);

  return (
    <>
      <DashboardFilters
        filterOptions={filterOptions}
        statusSelected={statusSelected}
        setSearchQuery={setSearchQuery}
      />

      {isLoading ? <Placeholder /> : showNotFound && <NotFound />}

      <Table>
        {!isPhone && !showNotFound && !isLoading && (
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
