// Core
import { type FC } from "react";

// Core types
import { Invoice } from "@types";

// Client utils
import { getClientName } from "@utils/client";

// Vendors
import styled, { css } from "styled-components";
import { Column, Container, Row } from "@components/Grid";

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

interface Dashboard {
  invoices: Invoice[];
}

const index: FC<Dashboard> = ({ invoices }) => {
  return (
    <Container backgroundColor="background" fullHeight>
      <Row padding={{ md: { top: 10, bottom: 10 } }}>
        <Column responsivity={{ md: 12 }}>
          <Table>
            <Thead>
              <tr>
                <td>ID</td>
                <td>Client</td>
                <td>Total</td>
                <td>Issued date</td>
                <td>Balance</td>
                <td>Actions</td>
              </tr>
            </Thead>

            <Tbody>
              {invoices.map((invoice, i) => (
                <tr key={i}>
                  <td>{invoice._id.toString()}</td>
                  <td>{getClientName(invoice.client)}</td>
                </tr>
              ))}
            </Tbody>
          </Table>
        </Column>
      </Row>
    </Container>
  );
};

export { index as Dashboard };
