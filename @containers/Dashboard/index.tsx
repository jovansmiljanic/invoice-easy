// Core
import { type FC } from "react";

// Global grid components
import { Table } from "@components";

interface Dashboard {}

const index: FC<Dashboard> = () => {
  return <Table />;
};

export { index as Dashboard };
