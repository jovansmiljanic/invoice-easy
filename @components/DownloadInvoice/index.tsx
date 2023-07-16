import { File } from "@containers/Invoice/Preview/File";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Invoice, MyAccount } from "@types";
import axios, { AxiosResponse } from "axios";
import { FC, useEffect, useState } from "react";
import { formatDate } from "../../@utils/client/formatDate";
import { Button } from "@components";

// Svg
import { FileDownloadOutlined } from "@mui/icons-material";

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
              <FileDownloadOutlined fontSize="small" />
            ) : (
              <>s</>
            )
          }
        </PDFDownloadLink>
      )}
    </>
  );
};

export { index as DonwloadInvoice };
