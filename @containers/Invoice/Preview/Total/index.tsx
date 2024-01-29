// Core types
import type { FC } from "react";

// Global types
import { Invoice } from "@types";

// Client utils
import { useSubTotalPrice, useTotalPrice } from "@utils/client";

// Vendors
import styled, { css } from "styled-components";
import useTranslation from "next-translate/useTranslation";

// Global components
import { Heading } from "@components";

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

interface Total {
  invoice: Invoice;
  companyName?: string;
}

const index: FC<Total> = ({ invoice, companyName }) => {
  // Translation
  const { t } = useTranslation();

  const totalPrice = useTotalPrice(invoice.items, invoice.tax);
  const subTotalPrice = useSubTotalPrice(invoice.items);

  return (
    <>
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

      {invoice?.customText ? (
        <Note>
          <Heading as="p">{invoice?.customText}</Heading>
        </Note>
      ) : (
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
        </Note>
      )}

      <Footer>
        <p>{companyName}.</p>
      </Footer>
    </>
  );
};

export { index as Total };
