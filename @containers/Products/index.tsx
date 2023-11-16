// Core
import { type FC } from "react";

// Dashboard component
import { MainTable } from "@components";

const index: FC = ({}) => {
  return <MainTable path="products" boxes={false} currentUser={null} />;
};

export { index as ProductDashboard };
