// Core types
import type { FC } from "react";

// Core
import { useContext } from "react";

// Global components
import { Button, DownloadInvoice } from "@components";

// Vendors
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";

// Nextjs
import { useRouter } from "next/router";

// Store context
import { StoreContext } from "@context";

// Global types
import { Invoice, MyAccount } from "@types";

interface Actions {
  invoice: Invoice;
  userData: MyAccount | null;
}

const index: FC<Actions> = ({ invoice, userData }) => {
  // Translation
  const { t } = useTranslation();

  // Router
  const { locale } = useRouter();

  // Store context
  const { setClientData, setIsConfirmModal, isConfirmModal } =
    useContext(StoreContext);

  return (
    <Actions>
      {userData && <DownloadInvoice invoice={invoice} type="button" />}

      <Button
        variant="warning"
        size="small"
        as="a"
        href={`/${locale}/invoice/edit/${invoice._id}`}
        margin={{
          xs: { bottom: 2 },
          sm: { bottom: 2 },
          md: { bottom: 2 },
        }}
      >
        {t("invoice:editCta")}
      </Button>

      <Button
        variant="danger"
        size="small"
        margin={{
          xs: { bottom: 1 },
          sm: { bottom: 1 },
          md: { bottom: 1 },
        }}
        onClick={() => {
          setIsConfirmModal(!isConfirmModal), setClientData(invoice);
        }}
      >
        {t("invoice:deleteCta")}
      </Button>
    </Actions>
  );
};

export { index as Actions };

const Actions = styled.div`
  flex: 0 0 20%;

  button,
  a {
    width: 100%;
  }
`;