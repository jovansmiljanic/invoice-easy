// Core types
import { type FC, useContext, useEffect, useState } from "react";

// Vendors
import styled, { css } from "styled-components";
import useTranslation from "next-translate/useTranslation";

// Local components
import { NotFound } from "../NotFound";

// Global types
import { Client } from "@types";

// Grid context
import { StoreContext } from "@context";

// Grid context from Client
import { Placeholder } from "@components/Dashboard/Placeholder";
import { Table } from "@styles/Table";
import { GridContext } from "@components/MainTable";
import { copyText } from "@utils/shared";
import { Actions } from "./Actions";
import { DashboardFilters } from "../ClientFilters";

interface ClientTable {
  setSearchQuery: any;
}

const index: FC<ClientTable> = ({ setSearchQuery }) => {
  // Translation
  const { t } = useTranslation();

  // Sets state for not found icon
  const [showNotFound, setShowNotFound] = useState(false);

  // Grid context
  const { length, updatedItems, isLoading, limit } = useContext(GridContext);

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
      const timer = setTimeout(() => {
        setShowNotFound(true);
      }, 4000);
      return () => clearTimeout(timer);
    } else {
      setShowNotFound(false);
    }
  }, [length]);

  if (isLoading) return <Placeholder items={tableHeader} limit={limit} />;
  if (!isLoading && length === 0) return <NotFound />;

  return (
    <>
      <DashboardFilters setSearchQuery={setSearchQuery} />

      <Table>
        {!isPhone && (
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
    </>
  );
};

export { index as ClientTable };
