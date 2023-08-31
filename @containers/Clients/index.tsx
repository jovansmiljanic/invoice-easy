// Core
import { type FC } from "react";

// Global components
import { TableContainer } from "@components";

interface Dashboard {}

const index: FC<Dashboard> = () => {
  return (
    <TableContainer
      path="client"
      tableHeader={["ID", "Client name", "Client address", "Client country"]}
    />
  );
};

export { index as Clients };
