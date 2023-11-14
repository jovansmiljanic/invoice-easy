// Core types
import type { FC } from "react";

// Global components
import { Heading } from "@components";

// Global types
import { Invoice, MyAccount } from "@types";

// Vendors
import styled, { css } from "styled-components";
import useTranslation from "next-translate/useTranslation";

const UserDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 40px;

  ${({ theme: { colors, breakpoints } }) => css`
    border-bottom: 1px solid ${colors.lightGray};

    @media (max-width: ${breakpoints.md}px) {
      padding: 10px;
      align-items: flex-start;
      flex-direction: column;
    }
  `}
`;

const Col1 = styled.div`
  flex: 0 0 38%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Col2 = styled.div`
  flex: 0 0 40%;
`;

const Logo = styled.img`
  width: 120px;
  margin-bottom: 10px;
`;

interface UserData {
  userData: MyAccount | null;
  invoice: Invoice;
  logo?: string;
}

const index: FC<UserData> = ({ userData, invoice, logo }) => {
  // Translation
  const { t } = useTranslation();

  return (
    <UserDetails>
      {logo ? (
        <>
          <Col1>
            {userData?.logo && <Logo src={userData?.logo} alt="Logo" />}

            <Heading as="h6" weight="bold">
              {userData?.companyName}
            </Heading>
          </Col1>

          <Col2>
            <Heading as="p">
              {t("form:taxNumber")}: {userData?.taxNumber}
            </Heading>

            {invoice?.client?.registrationNumber && (
              <Heading as="p">
                {t("form:registrationNumber")}:{" "}
                {invoice.client.registrationNumber}
              </Heading>
            )}

            <Heading as="p">
              {t("form:trr")}: {userData?.trr}
            </Heading>

            {userData?.bic && (
              <Heading as="p">
                {t("form:bic")}: {userData?.bic}
              </Heading>
            )}

            <Heading as="p">
              {userData?.companyAddress}, {userData?.zipCode}, {userData?.city},{" "}
              {userData?.country}
            </Heading>

            <Heading as="p">
              {t("form:emailLabel")}: {userData?.email}
            </Heading>

            <Heading as="p">
              {t("form:phoneLabel")}: {userData?.phoneNumber}
            </Heading>
          </Col2>
        </>
      ) : (
        <>
          <div>
            <Heading as="h6" weight="bold">
              {userData?.companyName}
            </Heading>

            <Heading as="p">{userData?.companyAddress}</Heading>

            <Heading as="p">
              {userData?.zipCode}, {userData?.city}, {userData?.country}
            </Heading>

            <Heading as="p">
              {t("form:taxNumber")}: {userData?.taxNumber}
            </Heading>
          </div>

          <div>
            <Heading as="p">
              {t("form:trr")}: {userData?.trr}
            </Heading>

            {userData?.bic && (
              <Heading as="p">
                {t("form:bic")}: {userData?.bic}
              </Heading>
            )}

            <Heading as="p">
              {t("form:emailLabel")}: {userData?.email}
            </Heading>

            <Heading as="p">
              {t("form:phoneLabel")}: {userData?.phoneNumber}
            </Heading>

            {invoice?.client?.registrationNumber && (
              <Heading as="p">
                {t("form:registrationNumber")}:{" "}
                {invoice.client.registrationNumber}
              </Heading>
            )}
          </div>
        </>
      )}
    </UserDetails>
  );
};

export { index as UserData };
