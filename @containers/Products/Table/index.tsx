// Core types
import { type FC, useContext, useEffect, useState } from "react";

// Vendors
import styled, { css } from "styled-components";
import useTranslation from "next-translate/useTranslation";

// Global types
import { Product } from "@types";

// Grid context
import { StoreContext } from "@context";

// Grid context from Client
import { Placeholder } from "@components/Dashboard/Placeholder";
import { Table } from "@styles/Table";
import { GridContext } from "@components/MainTable";
import { copyText } from "@utils/shared";
import { Actions } from "./Actions";
import { DashboardFilters } from "../DashboardFilters";
import { NotFound } from "../NotFound";
import { AddProductModal } from "@components";

interface ProductTable {
  setSearchQuery: any;
}

const index: FC<ProductTable> = ({ setSearchQuery }) => {
  // Translation
  const { t } = useTranslation();

  // Sets state for not found icon
  const [isLoading, setIsLoading] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);

  // Grid context
  const { length, updatedItems, isModalOpen } = useContext(GridContext);

  // Store context
  const { isPhone } = useContext(StoreContext);

  const tableHeader = ["ID", "Name", "Price", t("")];

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
            (updatedItems as Product[]).map((item, i) => (
              <tr key={i}>
                <td onClick={() => copyText(item._id.toString())}>
                  #{item._id.toString().slice(19)}
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <Actions updatedItems={item as Product} />{" "}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      {isModalOpen && <AddProductModal />}
    </>
  );
};

export { index as ProductTable };
