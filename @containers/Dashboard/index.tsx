// Core
import { type FC } from "react";

import { TableContainer } from "@components/TableContainer";

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
      lineChart={true}
      boxes={true}
    />
  );
};

export { index as Dashboard };
