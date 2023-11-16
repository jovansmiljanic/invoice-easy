// Core types
import { useContext, type FC } from "react";

// Local components
import { InvoiceItem } from "./InvoiceItem";

// Global types
import { Invoice, MyAccount } from "@types";

// Grid context

// Local components
import { NotFound } from "../NotFound";

// Store context
import { StoreContext } from "@context";
import { Placeholder } from "@components/Dashboard";
import { Table } from "@styles/Table";
import { GridContext } from "@components/MainTable";
import useTranslation from "next-translate/useTranslation";

interface Table {
  currentUser: MyAccount | null;
}

const index: FC<Table> = ({ currentUser }) => {
  // Translation
  const { t } = useTranslation();

  // Grid context
  const { length, updatedItems, isLoading, limit } = useContext(GridContext);

  // Store context
  const { isPhone } = useContext(StoreContext);

  if (length === 0) {
    return <NotFound />;
  }

  if (isLoading || !updatedItems || length === 0) return <Placeholder />;

  const tableHeader = [
    t("table:id"),
    t("table:client"),
    t("table:status"),
    t("table:date"),
    t("table:dueDate"),
    t("table:amount"),
    t("table:actions"),
  ];

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
                <InvoiceItem
                  updatedItems={item as Invoice}
                  currentUser={currentUser}
                />
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export { index as InvoicesTable };
