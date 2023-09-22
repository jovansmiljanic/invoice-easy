// Core
import { type FC } from "react";

// Global components
import { TableContainer } from "@components";

// Vendors
import useTranslation from "next-translate/useTranslation";

interface Dashboard {}

const index: FC<Dashboard> = () => {
  // Translation
  const { t } = useTranslation();

  return (
    <TableContainer
      path="client"
      tableHeader={[
        t("table:id"),
        t("table:clientName"),
        t("table:clientAddress"),
        t("table:clientCountry"),
      ]}
    />
  );
};

export { index as Clients };
