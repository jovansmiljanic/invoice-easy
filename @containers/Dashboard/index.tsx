// Core
import { type FC } from "react";

// Dashboard component
import { MainTable } from "@components";
import { MyAccount } from "@types";

interface Dashboard {
  currentUser: MyAccount;
}

const index: FC<Dashboard> = ({ currentUser }) => {
  return <MainTable path="invoice" boxes={true} currentUser={currentUser} />;
};

export { index as Dashboard };
