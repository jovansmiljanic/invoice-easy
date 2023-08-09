// Core
import { FC, useEffect, useState } from "react";

// Download File
import { File } from "@containers/Invoice/Preview/File";

// Vendors
import { PDFDownloadLink } from "@react-pdf/renderer";

// GLobal types
import { Invoice, MyAccount } from "@types";

// FOrmat date
import { formatDate } from "@utils/client/formatDate";

// GLobal components
import { Button } from "@components";

// Svg
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import axios from "axios";

interface Download {
  invoice: Invoice;
  icon?: boolean;
}

const index: FC<Download> = ({ invoice, icon }) => {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isUser, setIsUser] = useState<MyAccount>();

  useEffect(() => {
    // Set loader
    setIsLoading(true);

    // Call axios with filters and page as a string url
    axios.get(`/api/registration/`).then(({ data: { currentUser } }) => {
      setIsUser(currentUser);
      setIsLoading(false);
      setIsClient(true);
    });
  }, []);

  return (
    <>
      {isClient && (
        <PDFDownloadLink
          document={<File myAccount={isUser} invoice={invoice} />}
          fileName={`Invoice - ${
            isUser?.firstName + " " + isUser?.lastName
          } - ${invoice.client.clientName} - ${formatDate(
            invoice.issuedDate
          )}.pdf`}
        >
          {({ loading }) =>
            loading && !icon && isLoading ? (
              <Button
                variant="secondary"
                size="small"
                margin={{
                  xs: { bottom: 1 },
                  sm: { bottom: 1 },
                  md: { bottom: 1 },
                }}
              >
                Loading...
              </Button>
            ) : !loading && !icon ? (
              <Button
                variant="secondary"
                size="small"
                margin={{
                  xs: { bottom: 1 },
                  sm: { bottom: 1 },
                  md: { bottom: 1 },
                }}
              >
                Download
              </Button>
            ) : !loading && icon ? (
              <FileDownloadOutlinedIcon fontSize="small" />
            ) : (
              <FileDownloadOutlinedIcon fontSize="small" />
            )
          }
        </PDFDownloadLink>
      )}
    </>
  );
};

export { index as DonwloadInvoice };
