// Core
import { type FC } from "react";

// Dashboard component
import { MainTable } from "@components";

const index: FC = () => {
  return <MainTable path="invoice" boxes={true} />;
};

export { index as Dashboard };
