// Core
import { FC, useEffect, useState } from "react";

// Download File
import { File } from "@containers/Invoice/Preview/File";

// Vendors
import axios from "axios";
import { PDFDownloadLink } from "@react-pdf/renderer";
import styled, { css, keyframes } from "styled-components";

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
          Download
        </Button>
      );
      break;
    case "icon":
      renderedContent = <FileDownloadOutlinedIcon fontSize="small" />;
      break;
    case "modalItem":
      renderedContent = <ModalItem>Download</ModalItem>;
      break;
    default:
      renderedContent = <LoadingButton />;
  }

  if (!isClient) {
    renderedContent;
  }

  return (
    <PDFDownloadLink
      document={<File myAccount={userData} invoice={invoice} />}
      fileName={fileName}
    >
      {renderedContent}
    </PDFDownloadLink>
  );
};

export { index as DownloadInvoice };
