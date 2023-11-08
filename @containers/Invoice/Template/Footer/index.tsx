// Core types
import { type FC } from "react";

// Global components
import { Heading } from "@components";

// Vendors
import styled, { css } from "styled-components";
import useTranslation from "next-translate/useTranslation";

// Client utils
import { useFetchUserData } from "@utils/client";

// Global types
import { MyAccount } from "@types";

const Note = styled.div`
  width: 60%;
  padding: 80px 15px;

  p {
    font-size: 10px;
    line-height: 1.5;
  }

  ${({ theme: { breakpoints } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      width: 100%;
      padding: 50px 15px;
    }
  `}
`;

const Footer = styled.div`
  text-align: center;

  ${({ theme: { font, breakpoints } }) => css`
    p {
      font-size: 10px;
      font-weight: ${font.weight.semiBold};
    }

    @media (max-width: ${breakpoints.md}px) {
      padding: 0 15px;
    }
  `}
`;

const index: FC = () => {
  // Translation
  const { t } = useTranslation();

  const { userData, loading, error } = useFetchUserData();

  if (loading) return <>Loading....</>;
  if (!userData) return <>{t("form:loading")}</>;

  return (
    <>
      <Note>
        <Heading as="p">{t("invoice:ddvParagraphOne")}</Heading>
        <Heading as="p">
          {t("invoice:invoiceFooterOne")} {userData?.bankName},{" "}
          {t("invoice:invoiceFooterTwo")} {userData?.trr}.
        </Heading>
      </Note>

      <Footer>
        <p>
          {userData?.companyField}, {userData?.companyName}.
        </p>
      </Footer>
    </>
  );
};

export { index as Footer };
