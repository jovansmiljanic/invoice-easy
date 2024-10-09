// Core
import { FC, useContext, useEffect, useState } from "react";

// Core types
import { Client, IInvoiceItem, Invoice, MyAccount } from "@types";

// Global components
import { Button } from "@components";

// Vendors
import axios from "axios";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { Formik, FormikValues } from "formik";
import styled, { css } from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import useTranslation from "next-translate/useTranslation";

// Local components
import { Table } from "./Table";
import { Total } from "./Total";
import { Footer } from "./Footer";
import { ClientDetails } from "./Client";
import { AccountDetails } from "./Account";

// Store context
import { StoreContext } from "@context";
import { GridContext } from "@components/MainTable";

const NewInvoice = styled.div`
  border-radius: 5px;
  box-shadow: 0 2px 6px 0 rgba(67, 89, 113, 0.12);

  ${({ theme: { colors } }) => css`
    background-color: ${colors.white};
  `}
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
`;

interface NewInvoice {
  client?: Client[];
  invoice?: Invoice;
  invoiceNumber?: number;
  currentUser: MyAccount;
}

const InvoiceSchema = Yup.object().shape({
  items: Yup.array(),
  client: Yup.object(),
  startDate: Yup.date(),
  endDate: Yup.date(),
  tax: Yup.number(),
  invoiceNumber: Yup.number(),
  customText: Yup.string(),
});

const index: FC<NewInvoice> = ({
  client,
  invoiceNumber,
  invoice,
  currentUser,
}) => {
  // Translation
  const { t } = useTranslation();

  // Handle router
  const router = useRouter();

  const { isModalData } = useContext(StoreContext);

  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();
  const [deadlineDate, setDeadlineDate] = useState<Date | null>();

  const [tableData, setTableData] = useState<IInvoiceItem[]>([
    {
      name: "",
      cost: 0,
      qty: 0,
      price: 0,
    },
  ]);

  useEffect(() => {
    if (invoice) {
      setTableData(invoice.items);
    }
  }, []);

  const addInitialValues = {
    items: tableData,
    client: {},
    startDate: new Date(),
    endDate: new Date(),
    tax: 0,
    invoiceNumber: invoiceNumber,
    paymentDeadline: new Date(),
    issuedDate: new Date(),
    customText: "",
    discount: 0,
  };

  const editInitialValues = {
    items: tableData,
    client: invoice?.client,
    startDate: invoice?.startDate,
    endDate: invoice?.endDate,
    tax: invoice?.tax ? invoice.tax : 0,
    invoiceNumber: invoice?.invoiceNumber,
    paymentDeadline: invoice?.paymentDeadline,
    customText: invoice?.customText,
    issuedDate: invoice?.createdAt,
    discount: invoice?.discount,
  };

  const addOnSubmit = (data: FormikValues) => {
    return {
      method: "POST",
      url: "/api/invoice",
      data: {
        items: tableData,
        startDate: startDate,
        endDate: endDate,
        issuedDate: new Date(),
        customText: data.customText,
        paymentDeadline: deadlineDate,
        client: isModalData,
        tax: data.tax,
        invoiceNumber: data.invoiceNumber,
        discount: data.discount,
      },
    };
  };

  const editOnSubmit = (data: FormikValues) => {
    return {
      method: "PUT",
      url: "/api/invoice",
      data: {
        _id: invoice?._id,
        items: tableData,
        startDate: startDate,
        endDate: endDate,
        issuedDate: new Date(),
        paymentDeadline: deadlineDate,
        customText: data.customText,
        client: isModalData,
        tax: data.tax,
        invoiceNumber: data.invoiceNumber,
        discount: data.discount,
      },
    };
  };

  return (
    <Formik
      autoComplete="off"
      initialValues={invoice ? editInitialValues : addInitialValues}
      validationSchema={InvoiceSchema}
      onSubmit={async (data: FormikValues) => {
        await axios(invoice ? editOnSubmit(data) : addOnSubmit(data))
          .then(res => {
            console.log(res);
            router.push("/");
          })
          .catch(err => {
            console.log(err);
          });
      }}
    >
      {({ handleSubmit, values, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <NewInvoice>
            <AccountDetails currentUser={currentUser} />

            <ClientDetails
              client={client}
              currentClient={invoice?.client}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              deadlineDate={deadlineDate}
              setDeadlineDate={setDeadlineDate}
              invoice={invoice}
            />

            <Table tableData={tableData} setTableData={setTableData} />

            <Total tableData={tableData} />

            <Footer currentUser={currentUser} />
          </NewInvoice>
          <Options>
            <Button
              variant="secondary"
              type="submit"
              disabled={isSubmitting}
              margin={{
                xs: { bottom: 1 },
                sm: { bottom: 1 },
                md: { bottom: 1 },
              }}
            >
              {t("invoice:saveCta")}
            </Button>

            <Button
              variant="danger"
              as="a"
              href="/"
              size="small"
              margin={{
                xs: { bottom: 1 },
                sm: { bottom: 1 },
                md: { bottom: 1 },
              }}
            >
              {t("invoice:cancelCta")}
            </Button>
          </Options>
        </form>
      )}
    </Formik>
  );
};

export { index as Template };
