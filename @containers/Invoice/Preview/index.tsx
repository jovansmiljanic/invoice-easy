// Core
import { FC, useEffect, useState } from "react";

// Core types
import { Invoice, MyAccount } from "@types";

// Global components
import { Button, Heading } from "@components";

// GLobal grid components
import { Column, Container, Row } from "@components/Grid";

// Vendors
import styled, { css } from "styled-components";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { File } from "./File";
import { formatDate, getTotalPrice } from "@utils/client";

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

  button {
    width: 100%;
  }
`;

const UserDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 50px 40px 30px 40px;

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
  padding: 30px 40px;

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

const Table = styled.div``;

const Head = styled.div`
  width: 100%;
  display: flex;
  font-size: 14px;

  ${({ theme: { colors, font } }) => css`
    font-weight: ${font.weight.bold};
    border-bottom: 1px solid ${colors.lightGray};
  `}
`;

const Body = styled.div`
  width: 100%;
`;

const Wrap = styled.div`
  width: 100%;
  display: flex;

  ${({ theme: { colors } }) => css`
    border-bottom: 1px solid ${colors.lightGray};
  `}
`;

const Item = styled.div`
  padding: 15px;

  &:nth-child(1) {
    flex: 0 0 50%;
  }

  &:nth-child(2) {
    flex: 0 0 15%;
  }

  &:nth-child(3) {
    flex: 0 0 15%;
  }

  &:nth-child(4) {
    flex: 0 0 15%;
  }

  &:nth-child(5) {
    padding: 0;
    flex: 0 0 5%;
    cursor: pointer;
  }
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
  width: 200px;

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
  padding: 80px 40px;

  p {
    font-size: 10px;
    line-height: 1.5;
  }
`;

const Footer = styled.div`
  text-align: center;
  padding: 20px 0;

  ${({ theme: { font } }) => css`
    p {
      font-size: 10px;
      font-weight: ${font.weight.semiBold};
    }
  `}
`;

interface NewInvoice {
  myAccount: MyAccount;
  invoice: Invoice;
}

const index: FC<NewInvoice> = ({ myAccount, invoice }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
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
                  {myAccount.companyName}
                </Heading>
                <Heading as="p">{myAccount.companyAddress}</Heading>
                <Heading as="p">
                  {myAccount.zipCode}, {myAccount.city}, {myAccount.country}
                </Heading>
                <Heading as="p">Davčna številka: {myAccount.taxNumber}</Heading>
              </Col1>
              <Col2>
                <Heading as="p">TRR: {myAccount.trr}</Heading>
                <Heading as="p">BIC koda: {myAccount.bic}</Heading>
                <Heading as="p">E-pošta: {myAccount.email}</Heading>
                <Heading as="p">Telefon: {myAccount.phoneNumber}</Heading>
              </Col2>
            </UserDetails>

            <ClientDetails>
              <Col1>
                <Heading as="h6" weight="bold">
                  {invoice.client.clientName}
                </Heading>
                <Heading as="p">{invoice.client.clientAddress}</Heading>
                <Heading as="p">
                  {invoice.client.zipCode}, {invoice.client.city},
                  {invoice.client.country}
                </Heading>
                <Heading as="p">
                  Davčna številka: {invoice.client.taxNumber}
                </Heading>
              </Col1>

              <Col2>
                <Heading as="h5" weight="semiBold">
                  Invoice #{invoice.invoiceNumber}
                </Heading>
                <StartDate>
                  <Heading as="p">
                    Date from: {formatDate(invoice.startDate)}
                  </Heading>
                </StartDate>

                <EndDate>
                  <Heading as="p">
                    Date to: {formatDate(invoice.endDate)}
                  </Heading>
                </EndDate>

                <EndDate>
                  <Heading as="p">
                    Payment deadline: {formatDate(invoice.paymentDeadline)}
                  </Heading>
                </EndDate>
              </Col2>
            </ClientDetails>

            <Table>
              <Head>
                <Item>Item</Item>
                <Item>Cost</Item>
                <Item>QTY</Item>
                <Item>Price</Item>
              </Head>

              <Body>
                {invoice?.items?.map((row, index) => (
                  <Wrap key={index}>
                    <Item>{row.name}</Item>
                    <Item>{row.cost} €</Item>
                    <Item>{row.qty}</Item>
                    <Item>{row.price} €</Item>
                  </Wrap>
                ))}
              </Body>
            </Table>

            <Total>
              <TotalRow>
                <Heading as="p" padding={{ md: { right: 4 } }}>
                  Subtotal:
                </Heading>
                <Heading as="p">{getTotalPrice(invoice.items)} €</Heading>
              </TotalRow>

              <TotalRow>
                <Heading as="p" padding={{ md: { right: 4 } }}>
                  Tax:
                </Heading>
                <Heading as="p">0.00 €</Heading>
              </TotalRow>

              <TotalRow>
                <Heading as="p" padding={{ md: { right: 4 } }}>
                  Total:
                </Heading>
                <Heading as="p">{getTotalPrice(invoice.items)} €</Heading>
              </TotalRow>
            </Total>

            <Note>
              <Heading
                as="p"
                padding={{
                  xs: { bottom: 3 },
                  sm: { bottom: 3 },
                  md: { bottom: 3 },
                }}
              >
                DDV ni obračunan na podlagi 1. Odstavka 94. Člena Zakona o davku
                na dodano vrednost. (nisem zavezanec za DDV). PRI POSLOVANJU NE
                UPORABLJAM ŽIGA.
              </Heading>

              <Heading as="p">
                Znesek računa poravnajte na transakcijski račun odprt pri{" "}
                {myAccount.bankName}., številka {myAccount.trr}. Pri plačilu se
                sklicujte na številko računa
              </Heading>
            </Note>

            <Footer>
              <p>
                {myAccount.companyField}, {myAccount.companyName}. Transakcijski
                račun odprt pri {myAccount.bankName} – {myAccount.trr}
                ., davčna številka: {myAccount.taxNumber}.
              </p>
            </Footer>
          </NewInvoice>
        </Column>

        <Column responsivity={{ md: 3 }}>
          <Options>
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
                  loading ? (
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
                  ) : (
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
                  )
                }
              </PDFDownloadLink>
            )}

            <Button
              variant="primary"
              size="small"
              as="a"
              href={`/invoice/edit/${invoice._id}`}
              margin={{
                xs: { bottom: 1 },
                sm: { bottom: 1 },
                md: { bottom: 1 },
              }}
            >
              Edit
            </Button>
          </Options>
        </Column>
      </Row>
    </Container>
  );
};

export { index as PreviewInvoice };
