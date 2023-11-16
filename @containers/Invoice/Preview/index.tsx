// Core
import { FC } from "react";

// Core types
import { Invoice, MyAccount } from "@types";

// Vendors
import styled, { css } from "styled-components";

// Clients download
import { Actions } from "./Actions";
import { ClientData } from "./ClientData";
import { UserData } from "./UserData";
import { Table } from "./Table";
import { Total } from "./Total";

interface NewInvoice {
  invoice: Invoice;
  currentUser: MyAccount;
}

const index: FC<NewInvoice> = ({ invoice, currentUser }) => {
  if (!currentUser) return <>Loading...</>;

  return (
    <Container>
      <NewInvoice>
        <UserData
          userData={currentUser}
          invoice={invoice}
          logo={currentUser?.logo}
        />

        <ClientData invoice={invoice} city={currentUser?.city} />

        <Table invoice={invoice} />

        <Total invoice={invoice} companyName={currentUser?.companyName} />
      </NewInvoice>

      <Actions invoice={invoice} userData={currentUser} />
    </Container>
  );
};

export { index as PreviewInvoice };

const Container = styled.div`
  display: flex;

  ${({ theme: { breakpoints } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      flex-direction: column;
    }
  `}
`;

const NewInvoice = styled.div`
  flex: 0 0 65%;
  margin-right: 40px;

  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px,
    rgb(209, 213, 219) 0px 0px 0px 1px inset;

  ${({ theme: { breakpoints } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      flex: 0 0 100%;
      margin-right: 0;
    }
  `}
`;
