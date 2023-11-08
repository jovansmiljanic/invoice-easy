// Core
import { FC, useContext, useEffect, useState } from "react";

// Core types
import { Invoice, MyAccount } from "@types";

// Global components
import { Button, Heading } from "@components";

// GLobal grid components
import { Column, Container, Row } from "@components/Grid";

// Vendors
import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import useTranslation from "next-translate/useTranslation";

// Client utils
import {
  formatDate,
  useFetchUserData,
  useSubTotalPrice,
  useTotalPrice,
} from "@utils/client";

// Store context
import { StoreContext } from "@context";

// Clients download
import { DownloadInvoice } from "@components/DownloadInvoice";

const NewInvoice = styled.div`
  border-radius: 5px;
  box-shadow: 0 2px 6px 0 rgba(67, 89, 113, 0.12);

  ${({ theme: { colors } }) => css`
    border: 1px solid ${colors.lightGray};
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
  align-items: flex-end;
  padding: 40px;

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
  flex: 0 0 30%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Col2 = styled.div`
  flex: 0 0 32%;
`;

const Col3 = styled.div`
  flex: 0 0 40%;
`;

const UserCol1 = styled.div`
  padding-bottom: 10px;
  flex: 0 0 55%;
`;

const UserCol2 = styled.div`
  padding-bottom: 10px;
  flex: 0 0 45%;
`;

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

  ${({ theme: { colors, breakpoints } }) => css`
    border-bottom: 1px solid ${colors.lightGray};

    @media (max-width: ${breakpoints.md}px) {
      padding: 10px 0;
      flex-wrap: wrap;
      width: 100%;
    }
  `}
`;

const Item = styled.div`
  padding: 15px;

  &:nth-child(1) {
    flex: 0 0 5%;
  }

  &:nth-child(2) {
    flex: 0 0 45%;
  }

  &:nth-child(3) {
    flex: 0 0 15%;
  }

  &:nth-child(4) {
    flex: 0 0 15%;
  }

  &:nth-child(5) {
    flex: 0 0 15%;
  }

  &:nth-child(6) {
    padding: 0;
    flex: 0 0 5%;
    cursor: pointer;
  }

  ${({ theme: { colors, breakpoints } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      margin: 0 10px;
      border: 1px solid ${colors.lightGray};
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
    flex: 0 0 60%;

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

  ${({ theme: { breakpoints } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      width: 100%;
      padding: 50px 15px;
    }
  `}
`;

const Footer = styled.div`
  text-align: center;
  padding: 20px 0;

  ${({ theme: { font, breakpoints } }) => css`
    p {
      font-size: 10px;
      font-weight: ${font.weight.semiBold};
    }

    @media (max-width: ${breakpoints.md}px) {
      padding: 0 15px;
    }
  `}
`;

const ItemWrap = styled.div`
  width: 33%;

  &:first-child {
    width: 100%;
  }
`;

const Label = styled.div`
  padding: 5px 15px;
`;

const Logo = styled.img`
  width: 120px;
  margin-bottom: 10px;
`;

interface NewInvoice {
  invoice: Invoice;
}

const index: FC<NewInvoice> = ({ invoice }) => {
  // Translation
  const { t } = useTranslation();

  const { locale } = useRouter();

  // Store context
  const { isPhone, setClientData, setIsConfirmModal, isConfirmModal } =
    useContext(StoreContext);

  const { userData, loading, error } = useFetchUserData();

  const totalPrice = useTotalPrice(invoice.items, invoice.tax);
  const subTotalPrice = useSubTotalPrice(invoice.items);

  if (loading) return <>Loading...</>;
  return (
    <Container>
      <Row
        padding={{
          xs: { top: 8, bottom: 8 },
          sm: { top: 8, bottom: 8 },
          md: { top: 10, bottom: 10 },
        }}
      >
        <Column
          responsivity={{ md: 9 }}
          padding={{
            xs: { top: 4, bottom: 4 },
            sm: { top: 4, bottom: 4 },
            md: { top: 0, bottom: 10 },
          }}
        >
          <NewInvoice>
            {userData?.logo ? (
              <>
                <UserDetails>
                  <Col1>
                    {userData?.logo && <Logo src={userData?.logo} alt="" />}

                    <Heading as="h6" weight="bold">
                      {userData?.companyName}
                    </Heading>
                  </Col1>

                  <Col3>
                    <Heading as="p">
                      {t("form:taxNumber")}: {userData?.taxNumber}
                    </Heading>

                    {invoice?.client?.registrationNumber && (
                      <Heading as="p">
                        {t("form:registrationNumber")}:{" "}
                        {invoice.client.registrationNumber}
                      </Heading>
                    )}

                    <Heading as="p">
                      {t("form:trr")}: {userData?.trr}
                    </Heading>

                    {userData?.bic && (
                      <Heading as="p">
                        {t("form:bic")}: {userData?.bic}
                      </Heading>
                    )}

                    <Heading as="p">
                      {userData?.companyAddress}, {userData?.zipCode},{" "}
                      {userData?.city}, {userData?.country}
                    </Heading>

                    <Heading as="p">
                      {t("form:emailLabel")}: {userData?.email}
                    </Heading>

                    <Heading as="p">
                      {t("form:phoneLabel")}: {userData?.phoneNumber}
                    </Heading>
                  </Col3>
                </UserDetails>

                <ClientDetails>
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
                        {t("form:registrationNumber")}:{" "}
                        {invoice.client.registrationNumber}
                      </Heading>
                    )}
                  </UserCol1>

                  <UserCol2>
                    <Heading
                      as="h5"
                      weight="bold"
                      padding={{
                        xs: { bottom: 1 },
                        sm: { bottom: 1 },
                        md: { bottom: 1 },
                      }}
                    >
                      {t("invoice:invoice")} #{invoice.invoiceNumber}
                    </Heading>

                    <StartDate>
                      <Heading as="p">
                        {t("invoice:dateFrom")}: {userData?.city},{" "}
                        {formatDate(invoice.startDate)}
                      </Heading>
                    </StartDate>

                    <EndDate>
                      <Heading as="p">
                        {t("invoice:dateTo")}: {formatDate(invoice.endDate)}
                      </Heading>
                    </EndDate>

                    <EndDate>
                      <Heading as="p">
                        {t("invoice:paymentDeadline")}:{" "}
                        {formatDate(invoice.paymentDeadline)}
                      </Heading>
                    </EndDate>
                  </UserCol2>
                </ClientDetails>
              </>
            ) : (
              <>
                <UserDetails>
                  <div>
                    <Heading as="h6" weight="bold">
                      {userData?.companyName}
                    </Heading>

                    <Heading as="p">{userData?.companyAddress}</Heading>

                    <Heading as="p">
                      {userData?.zipCode}, {userData?.city}, {userData?.country}
                    </Heading>

                    <Heading as="p">
                      {t("form:taxNumber")}: {userData?.taxNumber}
                    </Heading>
                  </div>

                  {userData?.logo && (
                    <div>
                      <Logo src={userData?.logo} alt="" />
                    </div>
                  )}

                  <div>
                    <Heading as="p">
                      {t("form:trr")}: {userData?.trr}
                    </Heading>

                    {userData?.bic && (
                      <Heading as="p">
                        {t("form:bic")}: {userData?.bic}
                      </Heading>
                    )}

                    <Heading as="p">
                      {t("form:emailLabel")}: {userData?.email}
                    </Heading>

                    <Heading as="p">
                      {t("form:phoneLabel")}: {userData?.phoneNumber}
                    </Heading>

                    {invoice?.client?.registrationNumber && (
                      <Heading as="p">
                        {t("form:registrationNumber")}:{" "}
                        {invoice.client.registrationNumber}
                      </Heading>
                    )}
                  </div>
                </UserDetails>

                <ClientDetails>
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
                        {t("form:registrationNumber")}:{" "}
                        {invoice.client.registrationNumber}
                      </Heading>
                    )}
                  </UserCol1>

                  <UserCol2>
                    <Heading
                      as="h5"
                      weight="bold"
                      padding={{
                        xs: { bottom: 1 },
                        sm: { bottom: 1 },
                        md: { bottom: 1 },
                      }}
                    >
                      {t("invoice:invoice")} #{invoice.invoiceNumber}
                    </Heading>

                    <StartDate>
                      <Heading as="p">
                        {t("invoice:dateFrom")}: {userData?.city},{" "}
                        {formatDate(invoice.startDate)}
                      </Heading>
                    </StartDate>

                    <EndDate>
                      <Heading as="p">
                        {t("invoice:dateTo")}: {formatDate(invoice.endDate)}
                      </Heading>
                    </EndDate>

                    <EndDate>
                      <Heading as="p">
                        {t("invoice:paymentDeadline")}:{" "}
                        {formatDate(invoice.paymentDeadline)}
                      </Heading>
                    </EndDate>
                  </UserCol2>
                </ClientDetails>
              </>
            )}

            {!isPhone ? (
              <Table>
                <Head>
                  <Item>No.</Item>
                  <Item>{t("invoice:item")}</Item>
                  <Item>{t("invoice:cost")}</Item>
                  <Item>{t("invoice:qty")}</Item>
                  <Item>{t("invoice:price")}</Item>
                </Head>

                <Body>
                  {invoice?.items?.map((row, index) => (
                    <Wrap key={index}>
                      <Item>{index + 1}</Item>
                      <Item>{row.name}</Item>
                      <Item>
                        {isNaN(Number(row.cost))
                          ? "Invalid cost"
                          : Number(row.cost).toLocaleString("en-US", {
                              style: "decimal",
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                      </Item>
                      <Item>{row.qty}</Item>
                      <Item>
                        {row.price.toLocaleString("en-US", {
                          style: "decimal",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </Item>
                    </Wrap>
                  ))}
                </Body>
              </Table>
            ) : (
              <Table>
                <Body>
                  {invoice?.items?.map((row, index) => (
                    <Wrap key={index}>
                      <ItemWrap>
                        <Label>{t("invoice:item")}</Label>
                        <Item>{row.name}</Item>
                      </ItemWrap>

                      <ItemWrap>
                        <Label>{t("invoice:cost")}</Label>
                        <Item>
                          {row.cost.toLocaleString("en-US", {
                            style: "decimal",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}{" "}
                          {t("invoice:currency")}
                        </Item>
                      </ItemWrap>

                      <ItemWrap>
                        <Label>{t("invoice:qty")}</Label>
                        <Item>{row.qty}</Item>
                      </ItemWrap>

                      <ItemWrap>
                        <Label>{t("invoice:price")}</Label>
                        <Item>
                          {row.price} {t("invoice:currency")}
                        </Item>
                      </ItemWrap>
                    </Wrap>
                  ))}
                </Body>
              </Table>
            )}

            <Total>
              <TotalRow>
                <Heading
                  as="p"
                  padding={{
                    xs: { right: 1 },
                    sm: { right: 1 },
                    md: { right: 1 },
                  }}
                >
                  {t("invoice:subtotal")}:
                </Heading>
                <Heading as="p">{subTotalPrice}</Heading>
              </TotalRow>

              {invoice.tax === "0" && (
                <TotalRow>
                  <Heading
                    as="p"
                    padding={{
                      xs: { right: 1 },
                      sm: { right: 1 },
                      md: { right: 2 },
                    }}
                  >
                    {t("invoice:tax")}:
                  </Heading>
                  <Heading as="p">{invoice.tax}%</Heading>
                </TotalRow>
              )}

              <TotalRow>
                <Heading
                  as="p"
                  padding={{
                    xs: { right: 1 },
                    sm: { right: 1 },
                    md: { right: 2 },
                  }}
                >
                  {t("invoice:total")}:
                </Heading>
                <Heading as="p">{totalPrice}</Heading>
              </TotalRow>
            </Total>

            <Note>
              <Heading as="p">{t("invoice:ddvParagraphOne")}</Heading>

              <Heading
                as="p"
                padding={{
                  xs: { bottom: 3 },
                  sm: { bottom: 3 },
                  md: { bottom: 3 },
                }}
              >
                {t("invoice:ddvParagraphTwo")}
              </Heading>

              <Heading as="p">
                {t("invoice:invoiceFooterOne")} {userData?.bankName},{" "}
                {t("invoice:invoiceFooterTwo")} {userData?.trr}.{" "}
              </Heading>
            </Note>

            <Footer>
              <p>
                {userData?.companyField}, {userData?.companyName}.
              </p>
            </Footer>
          </NewInvoice>
        </Column>

        <Column responsivity={{ md: 3 }}>
          <Options>
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
          </Options>
        </Column>
      </Row>
    </Container>
  );
};

export { index as PreviewInvoice };
