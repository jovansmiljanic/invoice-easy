// Core types
import { type FC, useEffect, useState } from "react";

// Global components
import { Heading } from "@components";

// Vendors
import styled, { css } from "styled-components";
import { StoreContext } from "@context";
import { getUserData } from "@utils/client/getUserData";
import { MyAccount } from "@types";
import useTranslation from "next-translate/useTranslation";

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

  const [userData, setUserData] = useState<MyAccount>();

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchData = async () => {
      const data = getUserData();
      setUserData(data);
    };

    fetchData();
  }, []);

  if (!userData) {
    return <>{t("form:loading")}</>; // Or you can render a loading indicator
  }
  return (
    <>
      <Note>
        <Heading as="p">{t("invoice:ddvParagraph")}</Heading>
        <Heading as="p">
          {t("invoice:invoiceFooterOne")} {userData?.bankName},{" "}
          {t("invoice:invoiceFooterTwo")} {userData?.trr}.{" "}
          {t("invoice:invoiceFooterThree")}
        </Heading>
      </Note>

      <Footer>
        <p>
          {userData?.companyField}, {userData?.companyName}.{" "}
          {t("invoice:invoiceFooterFour")} {userData?.bankName} –{" "}
          {userData?.trr}
          ., {t("form:taxNumber")}: {userData?.taxNumber}.
        </p>
      </Footer>
    </>
  );
};

export { index as Footer };
