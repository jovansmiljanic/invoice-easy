// Core
import { type FC } from "react";

// Dashboard component
import { MainTable } from "@components";

const index: FC = () => {
  return <MainTable path="client" boxes={false} />;
};

export { index as ClientsDashboard };
