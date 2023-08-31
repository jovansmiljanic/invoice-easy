// Core types
import { type FC, useContext } from "react";

// Global components
import { Heading } from "@components";

// Vendors
import styled, { css } from "styled-components";

// Store context
import { StoreContext } from "@context";

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

interface Account {}

const index: FC<Account> = () => {
  const { isUserData } = useContext(StoreContext);

  return (
    <Account>
      <div>
        {isUserData?.companyName && (
          <Heading as="h6" weight="bold">
            {isUserData.companyName}
          </Heading>
        )}

        {isUserData?.companyAddress && (
          <Heading as="p">{isUserData.companyAddress}</Heading>
        )}
        <Heading as="p">
          {isUserData?.zipCode}, {isUserData?.city}, {isUserData?.country}
        </Heading>
        {isUserData?.taxNumber && (
          <Heading as="p">Davčna številka: {isUserData.taxNumber}</Heading>
        )}
      </div>

      <div>
        {isUserData?.trr && <Heading as="p">TRR: {isUserData.trr}</Heading>}
        {isUserData?.bic && (
          <Heading as="p">BIC koda: {isUserData.bic}</Heading>
        )}
        {isUserData?.email && (
          <Heading as="p">E-pošta: {isUserData.email}</Heading>
        )}
        {isUserData?.phoneNumber && (
          <Heading as="p">Telefon: {isUserData.phoneNumber}</Heading>
        )}
      </div>
    </Account>
  );
};

export { index as AccountDetails };
