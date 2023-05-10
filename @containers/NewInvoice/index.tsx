// Core types
import { Button, Heading } from "@components";
import { Column, Container, Row } from "@components/Grid";
import { Company, MyAccount } from "@types";
import type { FC } from "react";

// Vendors
import styled, { css } from "styled-components";

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

const CompanyDetails = styled.div`
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
    padding: 15px 30px;

    &:nth-child(1) {
      width: 15%;
    }

    &:nth-child(2) {
      width: 30%;
    }

    &:nth-child(3) {
      width: 10%;
    }

    &:nth-child(4) {
      width: 10%;
    }

    &:nth-child(5) {
      width: 10%;
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
      padding: 15px 30px;

      svg {
        cursor: pointer;
        margin-right: 15px;
      }

      &:nth-child(1) {
        width: 15%;
      }

      &:nth-child(2) {
        width: 30%;
      }

      &:nth-child(3) {
        width: 10%;
      }

      &:nth-child(4) {
        width: 10%;
      }

      &:nth-child(5) {
        width: 10%;
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
  width: 200px;

  p {
    display: flex;
    flex: 0 0 50%;

    &:not(:last-child) {
      justify-content: flex-end;
    }
  }
`;

interface NewInvoice {
  company: Company;
  myAccount: MyAccount;
}

const index: FC<NewInvoice> = ({ company, myAccount }) => {
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
                <Heading as="p">{myAccount.zipCode}</Heading>
                <Heading as="p">Davčna številka: {myAccount.taxNumber}</Heading>
              </Col1>
              <Col2>
                <Heading as="p">TRR: {myAccount.ttr}</Heading>
                <Heading as="p">BIC koda: {myAccount.bic}</Heading>
                <Heading as="p">E-pošta: {myAccount.email}</Heading>
                <Heading as="p">Telefon: {myAccount.phoneNumber}</Heading>
              </Col2>
            </UserDetails>

            <CompanyDetails>
              <Col1>
                <Heading as="h6" weight="bold">
                  {company.companyName}
                </Heading>
                <Heading as="p">{company.companyAddress}</Heading>
                <Heading as="p">{company.zipCode}</Heading>
                <Heading as="p">Davčna številka: {company.taxNumber}</Heading>
              </Col1>

              <Col2>
                <Heading as="h5" weight="semiBold">
                  Invoice #3492
                </Heading>
                <Heading as="p">Date Issues: 25/08/2020</Heading>
                <Heading as="p">Date Due: 29/08/2020</Heading>
              </Col2>
            </CompanyDetails>

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
                <tr>
                  <td>Development</td>
                  <td>Razvoj vmesnika spletne aplikacije</td>
                  <td>$320</td>
                  <td>1</td>
                  <td>$320.00</td>
                </tr>
                <tr>
                  <td>Testing</td>
                  <td>Testiranje spletne aplikacije</td>
                  <td>$120</td>
                  <td>1</td>
                  <td>$120.00</td>
                </tr>
                <tr>
                  <td>Review</td>
                  <td>Storitev vzdrževanja spletne aplikacije</td>
                  <td>$1130</td>
                  <td>1</td>
                  <td>$1130.00</td>
                </tr>
              </Tbody>
            </Table>

            <Total>
              <TotalRow>
                <Heading as="p" padding={{ md: { right: 4 } }}>
                  Subtotal:
                </Heading>
                <Heading as="p">$154.25</Heading>
              </TotalRow>

              <TotalRow>
                <Heading as="p" padding={{ md: { right: 4 } }}>
                  Tax:
                </Heading>
                <Heading as="p">$50.00</Heading>
              </TotalRow>

              <TotalRow>
                <Heading as="p" padding={{ md: { right: 4 } }}>
                  Total:
                </Heading>
                <Heading as="p">$204.25</Heading>
              </TotalRow>
            </Total>
          </NewInvoice>
        </Column>

        <Column responsivity={{ md: 3 }}>
          <Options>
            <Button
              variant="secondary"
              size="small"
              margin={{
                xs: { bottom: 1 },
                sm: { bottom: 1 },
                md: { bottom: 1 },
              }}
            >
              Send Invoice
            </Button>

            <Button
              variant="primary"
              size="small"
              margin={{
                xs: { bottom: 1 },
                sm: { bottom: 1 },
                md: { bottom: 1 },
              }}
            >
              Download
            </Button>

            <Button
              variant="primary"
              size="small"
              margin={{
                xs: { bottom: 1 },
                sm: { bottom: 1 },
                md: { bottom: 1 },
              }}
            >
              Print
            </Button>

            <Button
              variant="primary"
              size="small"
              margin={{
                xs: { bottom: 1 },
                sm: { bottom: 1 },
                md: { bottom: 1 },
              }}
            >
              Edit Invoice
            </Button>
          </Options>
        </Column>
      </Row>
    </Container>
  );
};

export { index as NewInvoice };
