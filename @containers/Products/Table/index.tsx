// Core types
import { type FC, useContext, useEffect, useState } from "react";

// Vendors
import styled, { css } from "styled-components";
import useTranslation from "next-translate/useTranslation";

// Local components
import { ClientItem } from "./ClientItem";

// Global types
import { Product } from "@types";

// Grid context
import { StoreContext } from "@context";

// Grid context from Client
import { Placeholder } from "@components/Dashboard/Placeholder";
import { GridContext } from "..";

const index: FC = () => {
  // Translation
  const { t } = useTranslation();

  // Sets state for not found icon
  const [showNotFound, setShowNotFound] = useState(false);

  // Grid context
  const { length, updatedItems, isLoading, limit } = useContext(GridContext);

  // Store context
  const { isPhone } = useContext(StoreContext);

  const tableHeader = ["ID", "Name", "Price", t("")];

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

  if (isLoading || !updatedItems || length === 0)
    return <Placeholder items={tableHeader} limit={limit} />;

  // if (showNotFound) {
  //   return <NotFound />;
  // }

  return (
    <>
      <Table>
        {!isPhone && (
          <thead>
            <tr>
              {tableHeader.map((item, i) => (
                <TableHeader key={i}>{item}</TableHeader>
              ))}
            </tr>
          </thead>
        )}

        <tbody>
          {Array.isArray(updatedItems) &&
            updatedItems.map((item, i) => (
              <tr key={i}>
                <ClientItem updatedItems={item as Product} />
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export { index as Table };

const Table = styled.table`
  width: 100%;

  ${({ theme: { colors, breakpoints } }) => css`
    border: 1px solid ${colors.lightGray};

    thead {
      border-bottom: 1px solid ${colors.lightGray};
    }

    @media (max-width: ${breakpoints.md}px) {
      tr {
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid ${colors.lightGray};
      }
    }
  `}
`;

const TableHeader = styled.th`
  padding: 8px;
  text-align: left;

  &:last-child {
    text-align: right;
  }

  ${({ theme: { breakpoints } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      &:last-child {
        text-align: left;
      }
    }
  `}
`;
