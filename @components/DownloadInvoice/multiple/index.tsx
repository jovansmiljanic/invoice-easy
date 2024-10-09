// Core
import { FC, useEffect, useState } from "react";
import dynamic from "next/dynamic";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then(mod => mod.PDFDownloadLink),
  { ssr: false }
);

import styled, { css, keyframes } from "styled-components";
import useTranslation from "next-translate/useTranslation";

// GLobal types
import { Colors, Invoice, MyAccount } from "@types";

// GLobal components
import { Button } from "@components";

// Svg
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { File } from "./File";

// Animation
const Loading = keyframes`
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
`;

const LoadingButton = styled.div`
  position: relative;
  border-radius: 50%;
  animation: ${Loading} 1s infinite linear;
  width: 17px;
  height: 17px;
  border-width: 1px;
  border-color: #333;
  border-style: solid;
  border-bottom-color: #eee;
  margin-left: 8px;
`;

const ModalItem = styled.div<{ isLoading: boolean }>`
  padding: 10px 0 10px 20px;
  width: 100%;
  text-align: left;
  cursor: pointer;

  ${({ isLoading, theme: { colors } }) => css`
    color: ${colors.textColor};

    &:hover {
      background-color: ${colors.hoverGray};
    }

    &:nth-child(4) {
      color: ${colors.danger};
      border-top: 1px solid ${colors.lightGray};
    }

    ${isLoading &&
    `
        cursor: not-allowed;
      `}
  `}
`;

const Icon = styled.div<{ isLoading: boolean }>`
  display: flex;
  align-items: center;

  ${({ isLoading, theme: {} }) => css`
    ${isLoading &&
    `
      cursor: not-allowed;
    `}
  `}
`;

interface Download {
  type: "icon" | "button" | "modalItem";
  invoice: Invoice[];
  userData?: MyAccount | null;
  button?: {
    variant: Colors;
    icon: JSX.Element;
  };
}

const index: FC<Download> = ({ invoice, type, userData, button }) => {
  // Translation
  const { t } = useTranslation();

  const fileName = `Invoice - ${
    userData?.firstName + " " + userData?.lastName
  }.pdf`;

  let renderedContent;

  switch (type) {
    case "button":
      renderedContent = (
        <Button
          variant={button?.variant ? button.variant : "secondary"}
          size="small"
          disabled={!userData}
          isLoading={!userData}
        >
          {button?.icon}
          Download selected
        </Button>
      );
      break;

    case "icon":
      renderedContent = (
        <Icon isLoading={!userData}>
          <FileDownloadOutlinedIcon fontSize="small" />
        </Icon>
      );
      break;

    case "modalItem":
      renderedContent = (
        <ModalItem isLoading={!userData}>{t("table:download")}</ModalItem>
      );
      break;

    default:
      renderedContent = <LoadingButton />;
  }

  if (!userData) {
    renderedContent;
  }

  const content = {
    taxNumber: t("form:taxNumber"),
    trr: t("form:trr"),
    bic: t("form:bic"),
    email: t("form:emailLabel"),
    phone: t("form:phoneLabel"),
    dateFrom: t("invoice:dateFrom"),
    dateTo: t("invoice:dateTo"),
    paymentDeadline: t("invoice:paymentDeadline"),
    item: t("invoice:item"),
    cost: t("invoice:cost"),
    qty: t("invoice:qty"),
    unit: t("invoice:unit"),
    price: t("invoice:price"),
    invoice: t("invoice:invoice"),
    subTotal: t("invoice:subtotal"),
    tax: t("invoice:tax"),
    registrationNumber: t("form:registrationNumber"),
    total: t("invoice:total"),
    ddvParagraphOne: t("invoice:ddvParagraphOne"),
    ddvParagraphTwo: t("invoice:ddvParagraphTwo"),
    currency: t("invoice:currency"),
    no: t("invoice:no"),
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <PDFDownloadLink
          document={
            <File myAccount={userData} invoices={invoice} content={content} />
          }
          fileName={fileName}
        >
          {renderedContent}
        </PDFDownloadLink>
      )}
    </>
  );
};

export { index as DownloadInvoiceMultiple };
