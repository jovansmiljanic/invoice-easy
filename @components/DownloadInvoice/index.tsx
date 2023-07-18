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

interface Download {
  myAccount: MyAccount;
  invoice: Invoice;
  icon?: boolean;
}

const index: FC<Download> = ({ myAccount, invoice, icon }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <PDFDownloadLink
          document={<File myAccount={myAccount} invoice={invoice} />}
          fileName={`Invoice - ${
            myAccount.firstName + " " + myAccount.lastName
          } - ${invoice.client.clientName} - ${formatDate(
            invoice.issuedDate
          )}.pdf`}
        >
          {({ loading }) =>
            loading && !icon ? (
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
              <></>
            )
          }
        </PDFDownloadLink>
      )}
    </>
  );
};

export { index as DonwloadInvoice };
