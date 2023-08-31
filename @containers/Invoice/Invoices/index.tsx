// Core
import { type FC } from "react";

// Global components
import { TableContainer } from "@components";

interface Dashboard {}

const index: FC<Dashboard> = () => {
  return (
    <TableContainer
      path="invoice"
      tableHeader={[
        "ID",
        "Client",
        "Status",
        "Date",
        "Due Date",
        "Amount",
        "Actions",
      ]}
      filterOptions={[
        { label: "Paid", value: "1" },
        {
          label: "Not paid",
          value: "2",
        },
      ]}
    />
  );
};

export { index as Invoices };
