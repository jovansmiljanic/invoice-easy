// Core
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";

// Core types
import { Client, MyAccount } from "@types";

// Global components
import { AddClientModal, Button, Heading } from "@components";

// GLobal grid components
import { Column, Container, Row } from "@components/Grid";

// Vendors
import axios from "axios";
import * as Yup from "yup";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import styled, { css } from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { Formik, FormikHelpers, FormikValues } from "formik";
import Select from "react-select";

// Global styles
import { Field } from "@styles/Form";
import { getTotalPrice } from "@utils/client";

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

const UserDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 30px 40px 20px 40px;

  ${({ theme: { colors, breakpoints } }) => css`
    border-bottom: 1px solid ${colors.lightGray};

    @media (max-width: ${breakpoints.md}px) {
      padding: 10px;
      flex-direction: column;
    }
  `}
`;

const ClientDetails = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 20px 40px;

  ${({ theme: { colors, breakpoints } }) => css`
    border-bottom: 1px solid ${colors.lightGray};

    @media (max-width: ${breakpoints.md}px) {
      padding: 10px;
      flex-direction: column;
    }
  `}
`;

const Col1 = styled.div`
  padding-bottom: 10px;
  flex: 0 0 60%;
`;

const Col2 = styled.div``;

const Table = styled.table`
  width: 100%;
`;

const Thead = styled.thead`
  font-size: 14px;

  ${({ theme: { colors, font } }) => css`
    font-weight: ${font.weight.bold};
    border-bottom: 1px solid ${colors.lightGray};
  `}

  td {
    padding: 15px;

    &:nth-child(1) {
      width: 20%;
    }

    &:nth-child(2) {
      width: 30%;
    }

    &:nth-child(3) {
      width: 15%;
    }

    &:nth-child(4) {
      width: 15%;
    }

    &:nth-child(5) {
      width: 15%;
    }
  }
`;

const Tbody = styled.tbody`
  ${({ theme: { colors } }) => css`
    &:not(:last-child) {
      border-bottom: 1px solid ${colors.lightGray};
    }

    tr {
      border-bottom: 1px solid ${colors.lightGray};
    }

    td {
      padding: 15px;

      input {
        width: 100%;
      }

      svg {
        cursor: pointer;
        margin-right: 15px;
      }

      &:nth-child(1) {
        width: 20%;
      }

      &:nth-child(2) {
        width: 30%;
      }

      &:nth-child(3) {
        width: 15%;
      }

      &:nth-child(4) {
        width: 15%;
      }

      &:nth-child(5) {
        width: 15%;
      }
    }
  `}
`;

const Total = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
  padding: 30px 0;
`;

const TotalRow = styled.div`
  display: flex;
  align-items: center;
  width: 200px;

  input {
    flex: 0 0 50% !important;
    padding: 5px 10px !important;
    font-size: 14px;
  }

  p {
    display: flex;
    flex: 0 0 50%;

    &:not(:last-child) {
      justify-content: flex-end;
    }
  }
`;

const StartDate = styled.div`
  display: flex;
  align-items: center;

  p {
    width: 100%;
    margin-right: 10px;
  }

  input {
    font-size: 14px;
  }
`;

const EndDate = styled.div`
  display: flex;
  align-items: center;

  p {
    width: 100%;
    margin-right: 10px;
  }

  input {
    font-size: 14px;
  }
`;

const Note = styled.div`
  width: 60%;
  padding: 80px 15px;

  p {
    font-size: 10px;
    line-height: 1.5;
  }
`;

const Footer = styled.div`
  text-align: center;

  ${({ theme: { font } }) => css`
    p {
      font-size: 10px;
      font-weight: ${font.weight.semiBold};
    }
  `}
`;

const CustomSelect = styled(Select)`
  width: 235px;

  ${({ theme: { colors } }) => css`
    * > input {
      padding: 5px 0 !important;
    }

    * {
      font-size: 14px;
      border-radius: 5px !important;
      border-color: ${colors.gray} !important;
    }
  `}
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

interface NewInvoice {
  client: Client[];
  account: MyAccount;
}

interface Formvalues {
  items: Values[];
  client: object;
  startDate: Date;
  endDate: Date;
  tax: number;
  paymentDeadline: Date;
  issuedDate: Date;
}

interface Values {
  name: string;
  description: string;
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
});

const index: FC<NewInvoice> = ({
  account: {
    companyAddress,
    bic,
    companyName,
    zipCode,
    ttr,
    email,
    phoneNumber,
    taxNumber,
  },
  client,
}) => {
  // Handle router
  const router = useRouter();

  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();
  const [deadlineDate, setDeadlineDate] = useState<Date | null>();

  const issuedDate = new Date();

  const [tableData, setTableData] = useState<Values[]>([
    {
      name: "",
      description: "",
      cost: 0,
      qty: 0,
      price: 0,
    },
  ]);

  // Function to handle adding a new row
  const addRow = () => {
    setTableData([
      ...tableData,
      {
        name: "",
        description: "",
        cost: 0,
        qty: 0,
        price: 0,
      },
    ]);
  };

  // Function to handle input changes in each cell
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    field: any
  ) => {
    const newData: any = [...tableData];
    newData[index][field] = e.target.value;

    // Calculate the price
    const cost = parseFloat(newData[index].cost);
    const qty = parseFloat(newData[index].qty);
    if (!isNaN(cost) && !isNaN(qty)) {
      newData[index].price = (cost * qty).toString();
    } else {
      newData[index].price = "";
    }

    setTableData(newData);
  };

  const clientOptions = client.map((item) => {
    return { value: item, label: item.clientName };
  });

  const [clientOption, setClientOption] = useState<{
    clientName: string;
    clientAddress: string;
    zipCode: string;
    taxNumber: string;
  }>();

  // Handle types
  const handleChangeType = (e: any) => {
    setClientOption(e.value);
  };

  // Hide dropdown when clicked outside it's Ref
  const articlesPopupRef = useRef<HTMLDivElement>(null);

  // Toggle articles dropdown
  const [toggledArticles, setToggleArticles] = useState<boolean>(false);

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
          items: [
            {
              name: "",
              description: "",
              cost: 0,
              qty: 0,
              price: 0,
            },
          ],
          client: {},
          startDate: new Date(),
          endDate: new Date(),
          tax: 0,
          paymentDeadline: new Date(),
          issuedDate: new Date(),
        }}
        validationSchema={InvoiceSchema}
        onSubmit={async (
          data: FormikValues,
          { setSubmitting }: FormikHelpers<Formvalues>
        ) => {
          await axios({
            method: "POST",
            url: "/api/invoice",
            data: {
              items: tableData,
              startDate: startDate,
              endDate: endDate,
              issuedDate,
              paymentDeadline: deadlineDate,
              client: clientOption,
              // ...data,
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
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
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
                    <UserDetails>
                      <Col1>
                        <Heading as="h6" weight="bold">
                          {companyName}
                        </Heading>
                        <Heading as="p">{companyAddress}</Heading>
                        <Heading as="p">{zipCode}</Heading>
                        <Heading as="p">Davčna številka: {taxNumber}</Heading>
                      </Col1>
                      <Col2>
                        <Heading as="p">TRR: {ttr}</Heading>
                        <Heading as="p">BIC koda: {bic}</Heading>
                        <Heading as="p">E-pošta: {email}</Heading>
                        <Heading as="p">Telefon: {phoneNumber}</Heading>
                      </Col2>
                    </UserDetails>

                    <ClientDetails>
                      <Col1>
                        {clientOption ? (
                          <>
                            <Heading as="h6" weight="bold">
                              {clientOption.clientName}
                            </Heading>
                            <Heading as="p">
                              {clientOption.clientAddress}
                            </Heading>
                            <Heading as="p">{clientOption.zipCode}</Heading>
                            <Heading as="p">
                              Davčna številka: {clientOption.taxNumber}
                            </Heading>
                          </>
                        ) : (
                          <>
                            <CustomSelect
                              instanceId="newClient"
                              options={clientOptions}
                              placeholder="Choose existing one"
                              onChange={(e) => handleChangeType(e)}
                              onBlur={handleBlur}
                            />

                            <div>or</div>

                            <Button
                              variant="primary"
                              type="button"
                              size="small"
                              onClick={() =>
                                setToggleArticles(!toggledArticles)
                              }
                            >
                              Add new client
                            </Button>
                          </>
                        )}
                      </Col1>

                      <Col2>
                        <Heading as="h5" weight="semiBold">
                          Invoice #3492
                        </Heading>
                        <StartDate>
                          <Heading as="p">Date from:</Heading>

                          <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            placeholderText="DD/MM/YYYY"
                            dateFormat="dd/MM/yyyy"
                          />
                        </StartDate>

                        <EndDate>
                          <Heading as="p">Date to:</Heading>

                          <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            placeholderText="DD/MM/YYYY"
                            dateFormat="dd/MM/yyyy"
                          />
                        </EndDate>

                        <EndDate>
                          <Heading as="p">Payment deadline:</Heading>

                          <DatePicker
                            selected={deadlineDate}
                            onChange={(date) => setDeadlineDate(date)}
                            placeholderText="DD/MM/YYYY"
                            dateFormat="dd/MM/yyyy"
                          />
                        </EndDate>
                      </Col2>
                    </ClientDetails>

                    <Table>
                      <Thead>
                        <tr>
                          <td>Item</td>
                          <td>Description</td>
                          <td>Cost</td>
                          <td>QTY</td>
                          <td>Price</td>
                        </tr>
                      </Thead>

                      <Tbody>
                        {tableData.map((row, index) => (
                          <tr key={index}>
                            <td>
                              <Field
                                type="text"
                                name="name"
                                placeholder="Item"
                                onChange={(e) =>
                                  handleInputChange(e, index, "name")
                                }
                                value={row.name}
                              />
                            </td>
                            <td>
                              <Field
                                type="text"
                                name="description"
                                placeholder="Description"
                                onChange={(e) =>
                                  handleInputChange(e, index, "description")
                                }
                                value={row.description}
                              />
                            </td>

                            <td>
                              <Field
                                type="number"
                                name="cost"
                                placeholder="Cost"
                                onChange={(e) =>
                                  handleInputChange(e, index, "cost")
                                }
                                value={row.cost}
                              />
                            </td>

                            <td>
                              <Field
                                type="number"
                                name="qty"
                                placeholder="QTY"
                                onChange={(e) =>
                                  handleInputChange(e, index, "qty")
                                }
                                value={row.qty}
                              />
                            </td>

                            <td>
                              <Field
                                type="number"
                                name="price"
                                disabled
                                placeholder="00.00"
                                onChange={(e) =>
                                  handleInputChange(e, index, "price")
                                }
                                value={row.price}
                              />
                            </td>
                          </tr>
                        ))}
                      </Tbody>
                    </Table>
                    <Button
                      type="button"
                      variant="secondary"
                      size="small"
                      margin={{
                        xs: { top: 1, bottom: 1, left: 2 },
                        sm: { top: 1, bottom: 1, left: 2 },
                        md: { top: 1, bottom: 1, left: 2 },
                      }}
                      onClick={addRow}
                    >
                      Add Row
                    </Button>
                    <Total>
                      <TotalRow>
                        <Heading as="p" padding={{ md: { right: 4 } }}>
                          Subtotal:
                        </Heading>
                        <Heading as="p">
                          {getTotalPrice(tableData)
                            ? `${getTotalPrice(tableData)} €`
                            : "0.0 €"}
                        </Heading>
                      </TotalRow>

                      <TotalRow>
                        <Heading as="p" padding={{ md: { right: 4 } }}>
                          Tax:
                        </Heading>

                        <Field
                          type="number"
                          name="tax"
                          placeholder="0.0 €"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.tax}
                        />
                      </TotalRow>

                      <TotalRow>
                        <Heading as="p" padding={{ md: { right: 4 } }}>
                          Total:
                        </Heading>
                        <Heading as="p">
                          {getTotalPrice(tableData)
                            ? getTotalPrice(tableData) + values.tax
                            : "0.0 €"}
                        </Heading>
                      </TotalRow>
                    </Total>

                    <Note>
                      <Heading as="p">
                        DDV ni obračunan na podlagi 1. Odstavka 94. Člena Zakona
                        o davku na dodano vrednost. (nisem zavezanec za DDV).
                        PRI POSLOVANJU NE UPORABLJAM ŽIGA.
                      </Heading>
                      <Heading as="p">
                        Znesek računa poravnajte na transakcijski račun odprt
                        pri N26., številka DE91 1001 1001 2623 8152 93. Pri
                        plačilu se sklicujte na številko računa
                      </Heading>
                    </Note>

                    {/* <Footer>
                    <p>
                      {myAccount.companyField}, {myAccount.companyName}.
                      Transakcijski račun odprt pri {myAccount.bankName} –{" "}
                      {myAccount.ttr}
                      ., davčna številka: {myAccount.taxNumber}.
                    </p>
                  </Footer> */}
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
