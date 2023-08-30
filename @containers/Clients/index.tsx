// Core
import { type FC } from "react";

import { TableContainer } from "@components/TableContainer";
import { Client } from "@types";

interface Dashboard {
  clients?: Client[];
}

const index: FC<Dashboard> = () => {
  return (
    <TableContainer
      path="client"
      tableHeader={["ID", "Client name", "Client address", "Client country"]}
    />
  );
};

export { index as Clients };
