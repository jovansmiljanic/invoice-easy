// Core
import { type FC } from "react";

// Global components

// Vendors
import useTranslation from "next-translate/useTranslation";
import { TableContainer } from "@containers/InvoiceDashboard/TableContainer";

interface Dashboard {}

const index: FC<Dashboard> = () => {
  // Translation
  const { t } = useTranslation();

  return (
    <TableContainer
      path="invoice"
      tableHeader={[
        t("table:id"),
        t("table:client"),
        t("table:status"),
        t("table:date"),
        t("table:dueDate"),
        t("table:amount"),
        t("table:actions"),
      ]}
      title="Svi racuni"
      filterOptions={[
        { label: t("table:paidStatus"), value: "1" },
        {
          label: t("table:unPaidStatus"),
          value: "2",
        },
      ]}
    />
  );
};

export { index as Invoices };
