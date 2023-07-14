// Core types
import type { FC } from "react";

// Global components
import { Heading } from "@components";

// GLobal styles
import { Field } from "@styles/Form";

// Client utils
import { getTotalPrice } from "@utils/client";

// Vendors
import { useFormikContext } from "formik";

// Vendors
import styled, { css } from "styled-components";

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
  tableData: any;
  values: any;
}

const index: FC<Total> = ({ tableData, values }) => {
  const { handleBlur, handleChange } = useFormikContext();

  const price = getTotalPrice(tableData);

  const total = +price + values.tax;

  console.log(getTotalPrice(tableData));
  return (
    <Total>
      <TotalRow>
        <Heading
          as="p"
          padding={{ xs: { right: 2 }, sm: { right: 2 }, md: { right: 4 } }}
        >
          Subtotal:
        </Heading>

        <Heading as="p">
          {getTotalPrice(tableData) ? `${getTotalPrice(tableData)} €` : "0.0 €"}
        </Heading>
      </TotalRow>

      <TotalRow>
        <Heading
          as="p"
          padding={{ xs: { right: 2 }, sm: { right: 2 }, md: { right: 4 } }}
        >
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
        <Heading
          as="p"
          padding={{ xs: { right: 2 }, sm: { right: 2 }, md: { right: 4 } }}
        >
          Total:
        </Heading>

        <Heading as="p">{+price !== 0 ? `${total} €` : "0.00 €"}</Heading>
      </TotalRow>
    </Total>
  );
};

export { index as Total };
