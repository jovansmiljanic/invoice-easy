// Core
import { FC, Fragment, useEffect, useState } from "react";

// Vendors
import { PDFDownloadLink } from "@react-pdf/renderer";
import styled, { css, keyframes } from "styled-components";
import useTranslation from "next-translate/useTranslation";

// GLobal types
import { Invoice, MyAccount } from "@types";

// FOrmat date
import { formatDate } from "@utils/client";

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
  invoice: Invoice;
  type: "icon" | "button" | "modalItem";
  userData?: MyAccount;
}

const index: FC<Download> = ({ invoice, type, userData }) => {
  // Translation
  const { t } = useTranslation();

  const fileName = `Invoice - ${
    userData?.firstName + " " + userData?.lastName
  } - ${invoice.client.clientName} - ${formatDate(invoice.issuedDate)}.pdf`;

  let renderedContent;

  switch (type) {
    case "button":
      renderedContent = (
        <Button
          variant="secondary"
          size="small"
          margin={{
            xs: { bottom: 2 },
            sm: { bottom: 2 },
            md: { bottom: 2 },
          }}
          disabled={!userData}
          isLoading={!userData}
        >
          {t("table:download")}
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
    customText: invoice.customText,
    issuedAt: t("invoice:issuedAt"),
    discount: t("invoice:discount"),
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Fragment>
      {isClient && (
        <PDFDownloadLink
          document={
            <File myAccount={userData} invoice={invoice} content={content} />
          }
          fileName={fileName}
        >
          {renderedContent}
        </PDFDownloadLink>
      )}
    </Fragment>
  );
};

export { index as DownloadInvoice };
