// Core types
import { type FC, useContext, useState, useEffect } from "react";

// Local components
import { NotFound } from "../NotFound";
import { InvoiceItem } from "./InvoiceItem";
import { DashboardFilters } from "../DashboardFilters";

// Global types
import { Invoice, MyAccount } from "@types";

// Store context
import { StoreContext } from "@context";

// Global components
import { Placeholder } from "@components";

// Global styles
import { Table } from "@styles/Table";

// Grid
import { GridContext } from "@components/MainTable";
import useTranslation from "next-translate/useTranslation";

interface Table {
  statusSelected: any;
  setSearchQuery: any;
  currentUser?:MyAccount
}

const index: FC<Table> = ({ statusSelected, setSearchQuery,currentUser }) => {
  // Translation
  const { t } = useTranslation();

  // Grid context
  const { length, updatedItems } = useContext(GridContext);

  // Sets state for not found icon
  const [isLoading, setIsLoading] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);

  // Store context
  const { isPhone } = useContext(StoreContext);

  const tableHeader = [
    t("table:id"),
    t("table:client"),
    t("table:status"),
    t("table:date"),
    t("table:dueDate"),
    t("table:amount"),
    t("table:actions"),
  ];

  const filterOptions = [
    { label: t("table:paidStatus"), value: "1" },
    {
      label: t("table:unPaidStatus"),
      value: "2",
    },
  ];

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
                <InvoiceItem updatedItems={item as Invoice} currentUser={currentUser} />
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export { index as DashboardTable };
