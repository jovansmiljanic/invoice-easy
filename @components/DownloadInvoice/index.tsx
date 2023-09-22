// Core
import { FC, useEffect, useState } from "react";

// Download File
import { File } from "@containers/Invoice/Preview/File";

// Vendors
import { PDFDownloadLink } from "@react-pdf/renderer";
import styled, { css, keyframes } from "styled-components";
import useTranslation from "next-translate/useTranslation";

// GLobal types
import { Invoice, MyAccount } from "@types";

// FOrmat date
import { formatDate } from "@utils/client/formatDate";

// GLobal components
import { Button } from "@components";

// Svg
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { getUserData } from "@utils/client/getUserData";

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

const ModalItem = styled.div`
  padding: 10px 0 10px 20px;
  width: 100%;
  text-align: left;
  cursor: pointer;

  ${({ theme: { colors } }) => css`
    color: ${colors.textColor};

    &:hover {
      background-color: ${colors.hoverGray};
    }

    &:nth-child(4) {
      color: ${colors.danger};
      border-top: 1px solid ${colors.lightGray};
    }
  `}
`;

interface Download {
  invoice: Invoice;
  type: "icon" | "button" | "modalItem";
  isClient?: boolean;
}

const index: FC<Download> = ({ invoice, type, isClient }) => {
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
          disabled={!isClient}
          isLoading={!isClient}
        >
          {t("table:download")}
        </Button>
      );
      break;
    case "icon":
      renderedContent = <FileDownloadOutlinedIcon fontSize="small" />;
      break;
    case "modalItem":
      renderedContent = <ModalItem>{t("table:download")}</ModalItem>;
      break;
    default:
      renderedContent = <LoadingButton />;
  }

  if (!isClient) {
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
    price: t("invoice:price"),
    invoice: t("invoice:invoice"),
    subTotal: t("invoice:subtotal"),
    tax: t("invoice:tax"),
    total: t("invoice:total"),
    ddvParagraph: t("invoice:ddvParagraph"),
    footerParagrapOne: t("invoice:invoiceFooterOne"),
    footerParagrapTwo: t("invoice:invoiceFooterTwo"),
    footerParagrapThree: t("invoice:invoiceFooterThree"),
    footerParagrapFour: t("invoice:invoiceFooterFour"),
  };

  return (
    <PDFDownloadLink
      document={
        <File myAccount={userData} invoice={invoice} content={content} />
      }
      fileName={fileName}
    >
      {renderedContent}
    </PDFDownloadLink>
  );
};

export { index as DownloadInvoice };
