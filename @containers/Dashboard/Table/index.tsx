// Core types
import { useContext, type FC } from "react";

// Vendors
import styled, { css } from "styled-components";

// Grid store
import { GridContext } from "..";

// Local component
import { Item } from "./Item";
import { Placeholder } from "./Placeholder";
import { StoreContext } from "@context";
import { NotFoundIcon } from "public/svg";
import { Button, Heading } from "@components";

const NotFound = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme: { breakpoints } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      text-align: center;
      flex-direction: column;

      svg {
        width: 100%;
      }
    }
  `}
`;

const Table = styled.table`
  width: 100%;
  box-shadow: 0 2px 6px 0 rgba(67, 89, 113, 0.12);
  border-radius: 0 0 5px 5px;

  ${({ theme: { colors, breakpoints } }) => css`
    background-color: ${colors.white};

    @media (max-width: ${breakpoints.md}px) {
      display: flex;
      flex-wrap: wrap;
    }
  `}
`;

const Thead = styled.thead`
  font-size: 14px;

  ${({ theme: { colors, font, breakpoints } }) => css`
    font-weight: ${font.weight.bold};
    border-bottom: 1px solid ${colors.lightGray};

    td {
      padding: 15px;

      @media (max-width: ${breakpoints.md}px) {
        width: 100%;
        display: flex;
        flex-direction: column;
      }

      &:nth-child(1) {
        width: 10%;
      }

      &:nth-child(2) {
        width: 15%;
      }

      &:nth-child(3) {
        width: 15%;
      }

      &:nth-child(4) {
        width: 15%;
      }

      &:nth-child(5) {
        width: 15%;
      }

      &:nth-child(6) {
        width: 15%;
      }

      &:nth-child(7) {
        display: flex;
        justify-content: flex-end;
      }
    }
  `}
`;

const index: FC = () => {
  // Store context
  const { isPhone } = useContext(StoreContext);

  // Grid context
  const { length, updatedItems, isLoading } = useContext(GridContext);

  return (
    <>
      {isLoading || !updatedItems ? (
        <Placeholder />
      ) : length === 0 ? (
        <NotFound>
          <div>
            <Heading
              as="h4"
              weight="bold"
              padding={{
                xs: { bottom: 1 },
                sm: { bottom: 1 },
                md: { bottom: 1 },
              }}
            >
              No invoices found!
            </Heading>

            <Heading
              as="h6"
              padding={{
                xs: { bottom: 2 },
                sm: { bottom: 2 },
                md: { bottom: 2 },
              }}
            >
              Please click on create invoice to start generating
            </Heading>

            <Button variant="primary" as="a" href="/invoice/add">
              Create Invoice
            </Button>
          </div>

          <div>
            <NotFoundIcon />
          </div>
        </NotFound>
      ) : (
        <Table>
          {!isPhone && (
            <Thead>
              <tr>
                <td>ID</td>
                <td>Client</td>
                <td>Status</td>
                <td>Date</td>
                <td>Due date</td>
                <td>Amount</td>
                <td>Actions</td>
              </tr>
            </Thead>
          )}

          {Array.isArray(updatedItems) &&
            updatedItems.map((item, i) => <Item $item={item} key={i} />)}
        </Table>
      )}
    </>
  );
};

export { index as Table };
