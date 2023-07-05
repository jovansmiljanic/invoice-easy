// Core types
import type { FC } from "react";

// Global components
import { Heading } from "@components";

// Global types
import { MyAccount } from "@types";

// Vendors
import styled, { css } from "styled-components";

const Account = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px 40px;

  ${({ theme: { colors, breakpoints } }) => css`
    border-bottom: 1px solid ${colors.lightGray};

    @media (max-width: ${breakpoints.md}px) {
      padding: 10px 15px;
      flex-direction: column;
      align-items: flex-start;

      div {
        padding: 5px 0;
      }
    }
  `}
`;

interface Account {
  account?: MyAccount;
}

const index: FC<Account> = ({ account }) => {
  return (
    <Account>
      <div>
        {account?.companyName && (
          <Heading as="h6" weight="bold">
            {account.companyName}
          </Heading>
        )}

        {account?.companyAddress && (
          <Heading as="p">{account.companyAddress}</Heading>
        )}
        <Heading as="p">
          {account?.zipCode}, {account?.city}, {account?.country}
        </Heading>
        {account?.taxNumber && (
          <Heading as="p">Davčna številka: {account.taxNumber}</Heading>
        )}
      </div>

      <div>
        {account?.trr && <Heading as="p">TRR: {account.trr}</Heading>}
        {account?.bic && <Heading as="p">BIC koda: {account.bic}</Heading>}
        {account?.email && <Heading as="p">E-pošta: {account.email}</Heading>}
        {account?.phoneNumber && (
          <Heading as="p">Telefon: {account.phoneNumber}</Heading>
        )}
      </div>
    </Account>
  );
};

export { index as AccountDetails };
