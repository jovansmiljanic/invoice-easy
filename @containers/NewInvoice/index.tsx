// Core types
import { Button, Heading } from "@components";
import { Column, Container, Row } from "@components/Grid";
import type { FC } from "react";

// Vendors
import styled, { css } from "styled-components";

const NewInvoice = styled.div`
  margin: 20px 0;

  ${({ theme: { colors } }) => css`
    background-color: ${colors.white};
  `}
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme: { colors } }) => css``}
`;

const UserDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;

  ${({ theme: { colors, breakpoints } }) => css`
    border-bottom: 1px solid ${colors.textColor};

    @media (max-width: ${breakpoints.md}px) {
      padding: 10px;
      flex-direction: column;
    }
  `}
`;

const CompanyDetails = styled.div`
  display: flex;
  //   justify-content: space-between;
  align-items: flex-start;
  padding: 20px;

  ${({ theme: { colors, breakpoints } }) => css`
    border-bottom: 1px solid ${colors.textColor};

    @media (max-width: ${breakpoints.md}px) {
      padding: 10px;
      flex-direction: column;
    }
  `}
`;

const Items = styled.div`
  padding: 20px;
`;

const Col1 = styled.div`
  padding-bottom: 10px;
  flex: 0 0 75%;
`;

const Col2 = styled.div``;

interface NewInvoice {}

const index: FC<NewInvoice> = () => {
  return (
    <Container backgroundColor="background">
      <Row padding={{ md: { top: 10, bottom: 10 } }}>
        <Column responsivity={{ md: 9 }} padding={{ md: { bottom: 10 } }}>
          <NewInvoice>
            <UserDetails>
              <Col1>
                <Heading as="h6" weight="bold">
                  JOVAN SMILJANIĆ s.p
                </Heading>
                <Heading as="p">Martina Krpana ulica 18</Heading>
                <Heading as="p">1000 Ljubljana, Slovenia</Heading>
                <Heading as="p">Davčna številka: 79215378</Heading>
              </Col1>
              <Col2>
                <Heading as="p">TRR: DE91 1001 1001 2623 8152 93</Heading>
                <Heading as="p">BIC koda: NTSBDEB1XXX</Heading>
                <Heading as="p">E-pošta: smiljanicjovan9@gmail.com</Heading>
                <Heading as="p">Telefon: 030 760 375</Heading>
              </Col2>
            </UserDetails>

            <CompanyDetails>
              <Col1>
                <Heading as="p">Consalta d.o.o.</Heading>
                <Heading as="p">Slandrova ulica 4b</Heading>
                <Heading as="p">SI-1231 Ljubljana</Heading>
                <Heading as="p">Davčna številka: 85200638</Heading>
              </Col1>

              <Col2>
                <Heading as="h5">Invoice #3492</Heading>
                <Heading as="p">Date Issues: 25/08/2020</Heading>
                <Heading as="p">Date Due: 29/08/2020</Heading>
              </Col2>
            </CompanyDetails>

            <Items>Items</Items>
          </NewInvoice>
        </Column>

        <Column responsivity={{ md: 3 }}>
          <Options>
            <Button variant="secondary" margin={{ md: { bottom: 1 } }}>
              Send Invoice
            </Button>

            <Button variant="primary" margin={{ md: { bottom: 1 } }}>
              Preview
            </Button>

            <Button variant="primary" margin={{ md: { bottom: 1 } }}>
              Save
            </Button>
          </Options>
        </Column>
      </Row>
    </Container>
  );
};

export { index as NewInvoice };
