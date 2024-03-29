// Core types
import { type FC, useContext, useEffect, useState } from "react";

// Vendors
import useTranslation from "next-translate/useTranslation";

// Local components
import { Actions } from "./Actions";
import { NotFound } from "../NotFound";
import { DashboardFilters } from "../ClientFilters";

// Global types
import { Client } from "@types";

// Grid context
import { StoreContext } from "@context";

// Dashboard component
import { Placeholder } from "@components/Dashboard";

// Global ccoponents
import { AddClientModal } from "@components";

// Global stypes
import { Table } from "@styles/Table";

// Grid context
import { GridContext } from "@components/MainTable";

// Shared utils
import { copyText } from "@utils/shared";

interface ClientTable {
  setSearchQuery: any;
}

const index: FC<ClientTable> = ({ setSearchQuery }) => {
  // Translation
  const { t } = useTranslation();

  // Sets state for not found icon
  const [isLoading, setIsLoading] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);

  // Grid context
  const { length, updatedItems, isModalOpen } = useContext(GridContext);

  // Store context
  const { isPhone } = useContext(StoreContext);

  const tableHeader = [
    t("table:id"),
    t("table:clientName"),
    t("table:clientAddress"),
    t("table:clientCountry"),
    t("table:taxNumber"),
    t(""),
  ];

  useEffect(() => {
    if (length === 0) {
      setIsLoading(true);

      const timer = setTimeout(() => {
        setShowNotFound(true);
        setIsLoading(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setShowNotFound(false);
      setIsLoading(false);
    }
  }, [length]);

  return (
    <>
      <DashboardFilters setSearchQuery={setSearchQuery} />

      {isLoading ? <Placeholder /> : showNotFound && <NotFound />}

      <Table>
        {!isPhone && !showNotFound && !isLoading && (
          <thead>
            <tr>
              {tableHeader.map((item, i) => (
                <th key={i}>{item}</th>
              ))}
            </tr>
          </thead>
        )}

        <tbody>
          {Array.isArray(updatedItems) &&
            (updatedItems as Client[]).map((item: Client, i) => (
              <tr key={i}>
                <td onClick={() => copyText(item._id.toString())}>
                  #{item._id.toString().slice(19)}
                </td>
                <td>{item.clientName}</td>
                <td>{item.clientAddress}</td>
                <td>{item.country}</td>
                <td>{item.taxNumber}</td>
                <td>
                  <Actions updatedItems={item as Client} />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      {isModalOpen && <AddClientModal />}
    </>
  );
};

export { index as ClientTable };
