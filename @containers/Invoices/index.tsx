// Core
import { type FC } from "react";

// Dashboard component
import { MainTable } from "@components";
import { MyAccount } from "@types";

interface MainTableProps {
  currentUser: MyAccount;
}

const index: FC<MainTableProps> = ({ currentUser }) => {
  return <MainTable path="invoice" boxes={false} currentUser={currentUser} />;
};

export { index as Invoices };
