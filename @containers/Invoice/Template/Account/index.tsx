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
  currentUser: MyAccount;
}

const index: FC<Account> = ({ currentUser }) => {
  return (
    <Account>
      <div>
        {currentUser?.companyName && (
          <Heading as="h6" weight="bold">
            {currentUser.companyName}
          </Heading>
        )}

        {currentUser?.companyAddress && (
          <Heading as="p">{currentUser.companyAddress}</Heading>
        )}
        <Heading as="p">
          {currentUser?.zipCode}, {currentUser?.city}, {currentUser?.country}
        </Heading>
        {currentUser?.taxNumber && (
          <Heading as="p">Davčna številka: {currentUser.taxNumber}</Heading>
        )}
      </div>

      <div>
        {currentUser?.trr && <Heading as="p">TRR: {currentUser.trr}</Heading>}
        {currentUser?.bic && (
          <Heading as="p">BIC koda: {currentUser.bic}</Heading>
        )}
        {currentUser?.email && (
          <Heading as="p">E-pošta: {currentUser.email}</Heading>
        )}
        {currentUser?.phoneNumber && (
          <Heading as="p">Telefon: {currentUser.phoneNumber}</Heading>
        )}
      </div>
    </Account>
  );
};

export { index as AccountDetails };
