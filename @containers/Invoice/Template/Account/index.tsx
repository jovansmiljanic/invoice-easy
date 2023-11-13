// Core types
import { type FC } from "react";

// Global components
import { Heading } from "@components";

// Vendors
import styled, { css } from "styled-components";
import useTranslation from "next-translate/useTranslation";

// CLient utils
import { useFetchUserData } from "@utils/client";

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

const index: FC = () => {
  // Translation
  const { t } = useTranslation();

  const { userData, loading, error } = useFetchUserData();

  console.log(userData);

  if (loading) return <>Loading....</>;
  if (!userData) return <>{t("form:loading")}</>;

  return (
    <Account>
      <div>
        {userData?.companyName && (
          <Heading as="h6" weight="bold">
            {userData.companyName}
          </Heading>
        )}

        {userData?.companyAddress && (
          <Heading as="p">{userData.companyAddress}</Heading>
        )}
        <Heading as="p">
          {userData?.zipCode}, {userData?.city}, {userData?.country}
        </Heading>
        {userData?.taxNumber && (
          <Heading as="p">
            {t("form:taxNumber")}: {userData.taxNumber}
          </Heading>
        )}
        {userData?.registrationNumber && (
          <Heading as="p">
            {t("form:registrationNumber")}: {userData.registrationNumber}
          </Heading>
        )}
      </div>

      <div>
        {userData?.trr && (
          <Heading as="p">
            {t("form:trr")}: {userData.trr}
          </Heading>
        )}
        {userData?.bic && (
          <Heading as="p">
            {t("form:bic")}: {userData.bic}
          </Heading>
        )}
        {userData?.email && (
          <Heading as="p">
            {t("form:emailLabel")}: {userData.email}
          </Heading>
        )}
        {userData?.phoneNumber && (
          <Heading as="p">
            {t("form:phoneLabel")}: {userData.phoneNumber}
          </Heading>
        )}
      </div>
    </Account>
  );
};

export { index as AccountDetails };
