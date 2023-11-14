// Core
import { FC, useContext } from "react";

// Core types
import { Invoice } from "@types";

// Global components
import { Heading } from "@components";

// Vendors
import styled, { css } from "styled-components";
import useTranslation from "next-translate/useTranslation";

// Client utils
import {
  formatDate,
  useFetchUserData,
  useSubTotalPrice,
  useTotalPrice,
} from "@utils/client";

// Store context
import { StoreContext } from "@context";

// Clients download
import { Actions } from "./Actions";
import { ClientData } from "./ClientData";
import { UserData } from "./UserData";
import { Table } from "./Table";
import { Total } from "./Total";

interface NewInvoice {
  invoice: Invoice;
}

const index: FC<NewInvoice> = ({ invoice }) => {
  const { userData, loading, error } = useFetchUserData();

  if (loading) return <>Loading...</>;

  return (
    <Container>
      <NewInvoice>
        <UserData userData={userData} invoice={invoice} logo={userData?.logo} />

        <ClientData invoice={invoice} city={userData?.city} />

        <Table invoice={invoice} />

        <Total invoice={invoice} companyName={userData?.companyName} />
      </NewInvoice>

      <Actions invoice={invoice} userData={userData} />
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
