// Core types
import { type FC } from "react";

// Global components
import { Heading } from "@components";

// Vendors
import styled, { css } from "styled-components";
import useTranslation from "next-translate/useTranslation";
import { MyAccount } from "@types";

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

interface Template {
  currentUser: MyAccount;
}

const index: FC<Template> = ({ currentUser }) => {
  // Translation
  const { t } = useTranslation();

  if (!currentUser) return <>Loading....</>;

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
          <Heading as="p">
            {t("form:taxNumber")}: {currentUser.taxNumber}
          </Heading>
        )}

        {currentUser?.registrationNumber && (
          <Heading as="p">
            {t("form:registrationNumber")}: {currentUser.registrationNumber}
          </Heading>
        )}
      </div>

      <div>
        {currentUser?.trr && (
          <Heading as="p">
            {t("form:trr")}: {currentUser.trr}
          </Heading>
        )}

        {currentUser?.bic && (
          <Heading as="p">
            {t("form:bic")}: {currentUser.bic}
          </Heading>
        )}

        {currentUser?.email && (
          <Heading as="p">
            {t("form:emailLabel")}: {currentUser.email}
          </Heading>
        )}

        {currentUser?.phoneNumber && (
          <Heading as="p">
            {t("form:phoneLabel")}: {currentUser.phoneNumber}
          </Heading>
        )}
      </div>
    </Account>
  );
};

export { index as AccountDetails };
