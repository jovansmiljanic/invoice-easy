// Core types
import { Invoice } from "@types";
import useTranslation from "next-translate/useTranslation";
import type { FC } from "react";

// Vendors
import styled, { css } from "styled-components";

const Head = styled.div`
  width: 100%;
  display: flex;
  font-size: 14px;

  ${({ theme: { colors, font, breakpoints } }) => css`
    font-weight: ${font.weight.bold};
    border-bottom: 1px solid ${colors.lightGray};

    @media (max-width: ${breakpoints.md}px) {
      display: none;
    }
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
      flex-wrap: wrap;
      justify-content: space-between;
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

  ${({ theme: { colors, breakpoints } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      border: 1px solid ${colors.lightGray};

      &:nth-child(1) {
        display: none;
      }

      &:nth-child(2) {
        flex: 0 0 100%;
        margin: 10px 0;
      }

      &:nth-child(3) {
        flex: 0 0 30%;
      }

      &:nth-child(4) {
        flex: 0 0 30%;
      }

      &:nth-child(5) {
        flex: 0 0 30%;
      }
    }
  `}
`;

interface Table {
  invoice: Invoice;
}

const index: FC<Table> = ({ invoice }) => {
  // Translation
  const { t } = useTranslation();

  return (
    <div>
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
    </div>
  );
};

export { index as Table };
