// Core types
import type { FC } from "react";

// Global components
import { Heading } from "@components";

// GLobal styles
import { Field } from "@styles/Form";

// Client utils
import { useTotalPrice, useSubTotalPrice } from "@utils/client";

// Vendors
import { FormikValues, useFormikContext } from "formik";
import useTranslation from "next-translate/useTranslation";

// Vendors
import styled, { css } from "styled-components";
import { IInvoiceItem } from "@types";

const Total = styled.div`
  width: 90%;

  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;

  padding: 30px 0;
`;

const TotalRow = styled.div`
  width: 200px;
  display: flex;
  align-items: center;

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

interface Total {
  tableData: IInvoiceItem[];
}

const index: FC<Total> = ({ tableData }) => {
  // Translation
  const { t } = useTranslation();

  const { handleBlur, handleChange, values } = useFormikContext<FormikValues>();

  const totalPrice = useTotalPrice(tableData, values.tax, values.discount);
  const subTotalPrice = useSubTotalPrice(tableData);

  return (
    <Total>
      <TotalRow>
        <Heading
          as="p"
          padding={{ xs: { right: 2 }, sm: { right: 2 }, md: { right: 4 } }}
        >
          {t("invoice:subtotal")}:
        </Heading>

        <Heading as="p">{subTotalPrice}</Heading>
      </TotalRow>

      <TotalRow>
        <Heading
          as="p"
          padding={{ xs: { right: 2 }, sm: { right: 2 }, md: { right: 4 } }}
        >
          {t("invoice:tax")}:
        </Heading>
        <Field
          type="number"
          name="tax"
          placeholder="0.0"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.tax}
        />
        %
      </TotalRow>

      <TotalRow>
        <Heading
          as="p"
          padding={{ xs: { right: 2 }, sm: { right: 2 }, md: { right: 4 } }}
        >
          {t("invoice:discount")}:
        </Heading>
        <Field
          type="number"
          name="discount"
          placeholder="0.0"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.discount}
        />{" "}
        %
      </TotalRow>

      <TotalRow>
        <Heading
          as="p"
          padding={{ xs: { right: 2 }, sm: { right: 2 }, md: { right: 4 } }}
        >
          {t("invoice:total")}:
        </Heading>

        <Heading as="p">{totalPrice}</Heading>
      </TotalRow>
    </Total>
  );
};

export { index as Total };
