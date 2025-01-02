// Core types
import type { FC } from "react";

// Global components
import { Heading } from "@components";

// Global types
import { Invoice } from "@types";

// CLient utils
import { formatDate } from "@utils/client";

// Vendors
import styled, { css } from "styled-components";
import useTranslation from "next-translate/useTranslation";

interface ClientData {
  invoice: Invoice;
  city?: string;
}

const index: FC<ClientData> = ({ invoice, city }) => {
  // Translation
  const { t } = useTranslation();

  return (
    <ClientData>
      <UserCol1>
        <Heading
          as="h6"
          weight="bold"
          padding={{
            xs: { right: 2 },
            sm: { right: 2 },
            md: { right: 4 },
          }}
        >
          {invoice.client.clientName}
        </Heading>

        <Heading as="p">{invoice.client.clientAddress}</Heading>

        <Heading as="p">
          {invoice.client.zipCode}, {invoice.client.city},
          {invoice.client.country}
        </Heading>

        <Heading as="p">
          {t("form:taxNumber")}: {invoice.client.taxNumber}
        </Heading>

        {invoice.client.registrationNumber && (
          <Heading as="p">
            {t("form:registrationNumber")}: {invoice.client.registrationNumber}
          </Heading>
        )}
      </UserCol1>

      <div>
        <Heading
          as="h5"
          weight="bold"
          padding={{
            xs: { bottom: 1 },
            sm: { bottom: 1 },
            md: { bottom: 1 },
          }}
        >
          {t("invoice:invoice")} #{invoice.year ? `${invoice.year} - ` : ""}
          {invoice.invoiceNumber}
        </Heading>

        <Heading as="p">
          {t("invoice:dateFrom")}: {city}, {formatDate(invoice.startDate)}
        </Heading>

        <Heading as="p">
          {t("invoice:dateTo")}: {formatDate(invoice.endDate)}
        </Heading>

        <Heading as="p">
          {t("invoice:paymentDeadline")}: {formatDate(invoice.paymentDeadline)}
        </Heading>
      </div>
    </ClientData>
  );
};

export { index as ClientData };

const ClientData = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 30px 40px;

  ${({ theme: { colors, breakpoints } }) => css`
    border-bottom: 1px solid ${colors.lightGray};

    @media (max-width: ${breakpoints.md}px) {
      padding: 20px 10px;
      flex-direction: column;
    }
  `}
`;

const UserCol1 = styled.div`
  flex: 0 0 55%;
  padding-bottom: 10px;
`;
