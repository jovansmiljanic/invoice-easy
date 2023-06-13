// Core types
import type { FC } from "react";

// Global grid components
import { Column, Container, Row } from "@components/Grid";

// Global types
import { Client } from "@types";

// Vendors
import Link from "next/link";
import styled, { css } from "styled-components";

const AddInvoice = styled.div`
  border-radius: 5px;
  box-shadow: 0 2px 6px 0 rgba(67, 89, 113, 0.12);

  ${({ theme: { colors } }) => css`
    background-color: ${colors.white};
  `}
`;

const Table = styled.table`
  width: 100%;
  box-shadow: 0 2px 6px 0 rgba(67, 89, 113, 0.12);
  border-radius: 5px;

  ${({ theme: { colors } }) => css`
    background-color: ${colors.white};
  `}
`;

const Thead = styled.thead`
  font-size: 14px;

  ${({ theme: { colors, font } }) => css`
    font-weight: ${font.weight.bold};
    border-bottom: 1px solid ${colors.lightGray};
  `}

  td {
    padding: 15px;

    &:nth-child(1) {
      width: 20%;
    }

    &:nth-child(2) {
      width: 30%;
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
  }
`;

const Tbody = styled.tbody`
  ${({ theme: { colors } }) => css`
    tr {
      &:not(:last-child) {
        border-bottom: 1px solid ${colors.lightGray};
      }
    }

    td {
      padding: 15px;

      input {
        width: 100%;
      }

      svg {
        cursor: pointer;
        margin-right: 15px;
      }

      &:nth-child(1) {
        width: 20%;
      }

      &:nth-child(2) {
        width: 30%;
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
    }
  `}
`;

interface AddInvoice {
  clients: Client[];
}

const index: FC<AddInvoice> = ({ clients }) => {
  return (
    <Container backgroundColor="background" fullHeight>
      <Row
        padding={{
          xs: { top: 6, bottom: 6 },
          sm: { top: 6, bottom: 6 },
          md: { top: 10, bottom: 10 },
        }}
      >
        <Column
          responsivity={{ md: 12 }}
          padding={{
            xs: { top: 4, bottom: 4 },
            sm: { top: 4, bottom: 4 },
            md: { top: 0, bottom: 10 },
          }}
        >
          <Table>
            <Thead>
              <tr>
                <td>ID</td>
                <td>Client name</td>
                <td>Client address</td>
                <td>Actions</td>
              </tr>
            </Thead>

            <Tbody>
              {clients.map((client, i) => (
                <tr key={i}>
                  <td>{client._id.toString()}</td>
                  <td>{client.clientName}</td>
                  <td>{client.clientAddress}</td>
                  <td>
                    <Link href={`/invoice/add/${client._id}`}>Actions</Link>
                  </td>
                </tr>
              ))}
            </Tbody>
          </Table>
        </Column>
      </Row>
    </Container>
  );
};

export { index as NewInvoice };
