// Core
import { FC, useEffect, useRef, useState } from "react";

// Core types
import { Client, Invoice, MyAccount } from "@types";

// Global components
import { AddClientModal, Button } from "@components";

// GLobal grid components
import { Column, Container, Row } from "@components/Grid";

// Vendors
import axios from "axios";
import * as Yup from "yup";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { Formik, FormikValues } from "formik";

// Local components
import { Table } from "./Table";
import { Total } from "./Total";
import { Footer } from "./Footer";
import { ClientDetails } from "./Client";
import { AccountDetails } from "./Account";

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

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const Modal = styled.div`
  width: 500px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  background-color: white;
`;

interface Formvalues {
  items: Values[];
  client: object;
  startDate: Date;
  endDate: Date;
  tax: number;
  paymentDeadline: Date;
  issuedDate: Date;
  invoiceNumber: number;
}

interface NewInvoice {
  client?: Client[];
  account?: MyAccount;
  invoice?: Invoice;
}

interface Values {
  name: string;
  cost: number;
  qty: number;
  price: number;
}

const InvoiceSchema = Yup.object().shape({
  items: Yup.array(),
  client: Yup.object(),
  startDate: Yup.date(),
  endDate: Yup.date(),
  tax: Yup.number(),
  invoiceNumber: Yup.number(),
});

const index: FC<NewInvoice> = ({ account, client, invoice }) => {
  // Handle router
  const router = useRouter();

  // Hide dropdown when clicked outside it's Ref
  const articlesPopupRef = useRef<HTMLDivElement>(null);

  // Toggle articles dropdown
  const [toggledArticles, setToggleArticles] = useState<boolean>(false);

  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();
  const [deadlineDate, setDeadlineDate] = useState<Date | null>();

  const [tableData, setTableData] = useState<Values[]>([
    {
      name: "",
      cost: 0,
      qty: 0,
      price: 0,
    },
  ]);

  const [clientOption, setClientOption] = useState<{
    clientName: string;
    clientAddress: string;
    zipCode: string;
    taxNumber: string;
  }>();

  const handleClickOutside = (event: { target: any }) => {
    if (
      articlesPopupRef.current &&
      !articlesPopupRef.current.contains(event.target)
    ) {
      setToggleArticles(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <>
      <Formik
        autoComplete="off"
        initialValues={{
          items: tableData,
          client: {},
          startDate: new Date(),
          endDate: new Date(),
          tax: 0,
          invoiceNumber: invoice?.invoiceNumber ? invoice.invoiceNumber + 1 : 1,
          paymentDeadline: new Date(),
          issuedDate: new Date(),
        }}
        validationSchema={InvoiceSchema}
        onSubmit={async (data: FormikValues) => {
          await axios({
            method: "POST",
            url: "/api/invoice",
            data: {
              items: tableData,
              startDate: startDate,
              endDate: endDate,
              issuedDate: new Date(),
              paymentDeadline: deadlineDate,
              client: clientOption,
              invoiceNumber: data.invoiceNumber,
            },
          })
            .then((res) => {
              router.push("/");
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        {({ handleSubmit, values, errors, touched, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <Container backgroundColor="background">
              <Row padding={{ md: { top: 10, bottom: 10 } }}>
                <Column
                  responsivity={{ md: 9 }}
                  padding={{
                    xs: { top: 4, bottom: 4 },
                    sm: { top: 4, bottom: 4 },
                    md: { top: 0, bottom: 10 },
                  }}
                >
                  <NewInvoice>
                    <AccountDetails account={account} />

                    <ClientDetails
                      client={client}
                      clientOption={clientOption}
                      startDate={startDate}
                      setStartDate={setStartDate}
                      endDate={endDate}
                      setEndDate={setEndDate}
                      deadlineDate={deadlineDate}
                      setDeadlineDate={setDeadlineDate}
                      toggledArticles={toggledArticles}
                      setToggleArticles={setToggleArticles}
                      setClientOption={setClientOption}
                      values={values}
                    />

                    <Table tableData={tableData} setTableData={setTableData} />

                    <Total tableData={tableData} values={values} />

                    <Footer account={account} />
                  </NewInvoice>
                </Column>

                <Column responsivity={{ md: 3 }}>
                  <Options>
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={isSubmitting}
                      margin={{
                        xs: { bottom: 1 },
                        sm: { bottom: 1 },
                        md: { bottom: 1 },
                      }}
                    >
                      Save
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
                      Cancel
                    </Button>
                  </Options>
                </Column>
              </Row>
            </Container>
          </form>
        )}
      </Formik>

      {toggledArticles && (
        <Background>
          <Modal ref={articlesPopupRef}>
            <AddClientModal
              setClientOption={setClientOption}
              setToggleArticles={setToggleArticles}
            />
          </Modal>
        </Background>
      )}
    </>
  );
};

export { index as AddInvoice };
