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

interface AddInvoice {
  clients: Client[];
}

const index: FC<AddInvoice> = ({ clients }) => {
  return (
    <Container backgroundColor="background">
      <Row padding={{ md: { top: 10, bottom: 10 } }}>
        <Column
          responsivity={{ md: 9 }}
          padding={{
            xs: { top: 4, bottom: 4 },
            sm: { top: 4, bottom: 4 },
            md: { top: 0, bottom: 10 },
          }}
        >
          {clients.map((client, i) => (
            <div key={i}>
              <Link href={`/invoice/add/${client._id}`}>
                {client.clientName}
              </Link>
            </div>
          ))}
        </Column>
      </Row>
    </Container>
  );
};

export { index as NewInvoice };
