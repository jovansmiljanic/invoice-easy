"use client";

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
  currentUser: MyAccount | null;
}

const index: FC<Table> = ({ statusSelected, setSearchQuery, currentUser }) => {
  // Translation
  const { t } = useTranslation();

  // Grid context
  const { length, updatedItems } = useContext(GridContext);

  // Sets state for not found icon
  const [isLoading, setIsLoading] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);

  // Store context
  const { isPhone } = useContext(StoreContext);

  // State for tracking the header checkbox
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [selectedInvoices, setSelectedInvoices] = useState<Invoice[]>([]);

  // Handle the change for the header checkbox
  const handleSelectAllInvoices = (isSelected: boolean) => {
    setIsAllSelected(isSelected);
    if (isSelected) {
      // Select all invoices
      setSelectedInvoices(updatedItems as Invoice[]);
    } else {
      // Deselect all invoices
      setSelectedInvoices([]);
    }
  };

  // Update individual invoice selection
  const handleSelectInvoice = (
    selectedInvoice: Invoice,
    isSelected: boolean
  ) => {
    if (isSelected) {
      setSelectedInvoices([...selectedInvoices, selectedInvoice]);
    } else {
      setSelectedInvoices(
        selectedInvoices.filter(invoice => invoice._id !== selectedInvoice._id)
      );
    }
  };

  // Update the isAllSelected state when invoices update
  useEffect(() => {
    setIsAllSelected(selectedInvoices.length === updatedItems.length);
  }, [selectedInvoices, updatedItems]);

  const tableHeader = [
    <input
      type="checkbox"
      checked={isAllSelected}
      onChange={e => handleSelectAllInvoices(e.target.checked)}
    />,
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
        invoice={selectedInvoices}
        userData={currentUser}
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
                <InvoiceItem
                  updatedItems={item as Invoice}
                  currentUser={currentUser}
                  onSelect={isSelected =>
                    handleSelectInvoice(item as Invoice, isSelected as any)
                  }
                  isSelected={selectedInvoices.some(
                    invoice => invoice._id === item._id
                  )}
                />
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export { index as DashboardTable };
