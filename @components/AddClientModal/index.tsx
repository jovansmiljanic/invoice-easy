// Core types
import type { FC } from "react";

// Global components
import { Button, Heading } from "@components";

// Vendors
import axios from "axios";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
import styled, { css } from "styled-components";

// Global styles
import { Field, Label } from "@styles/Form";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 40px;
`;

const Group = styled.div`
  width: 100%;
`;

const ErrorWrap = styled.div`
  width: 100%;
  font-size: 10px;
  padding: 0 12px;
  border-radius: 5px;

  ${({ theme: { colors } }) => css`
    color: ${colors.white};
    background-color: ${colors.danger};
  `}
`;

interface Formvalues {
  clientName: string;
  clientAddress: string;
  city: string;
  country: string;
  zipCode: string;
  taxNumber: string;
}

const AddClientSchema = Yup.object().shape({
  clientName: Yup.string().required("Please enter client's company name"),
  clientAddress: Yup.string().required("Please enter client's company address"),
  city: Yup.string().required("Please enter client's city"),
  country: Yup.string().required("Please enter client's country"),
  zipCode: Yup.string().required("Please enter client's zip code"),
  taxNumber: Yup.string().required("Please enter client's company tax number"),
});

const index: FC<{ setClientOption: any; setToggleArticles: any }> = ({
  setClientOption,
  setToggleArticles,
}) => {
  return (
    <Formik
      autoComplete="off"
      initialValues={{
        clientName: "",
        clientAddress: "",
        city: "",
        country: "",
        zipCode: "",
        taxNumber: "",
      }}
      validationSchema={AddClientSchema}
      onSubmit={async (
        data: Formvalues,
        { setSubmitting }: FormikHelpers<Formvalues>
      ) => {
        await axios({
          method: "POST",
          url: "/api/client",
          data,
        })
          .then((res) => {
            setClientOption(res.data);

            setToggleArticles(false);
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
        <Form id="myForm" onSubmit={handleSubmit}>
          <Heading
            as="h4"
            color="gray"
            padding={{
              xs: { bottom: 4 },
              sm: { bottom: 4 },
              md: { bottom: 4 },
            }}
          >
            Add new client
          </Heading>

          <Group>
            <Label>Client name</Label>
            <Field
              hasError={Boolean(errors.clientName && touched.clientName)}
              type="text"
              name="clientName"
              placeholder="Enter client's name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.clientName}
            />

            <ErrorWrap>
              {errors.clientName && touched.clientName ? (
                <>{errors.clientName}</>
              ) : null}
            </ErrorWrap>
          </Group>

          <Group>
            <Label>Client address</Label>
            <Field
              type="text"
              name="clientAddress"
              placeholder="Enter client's address"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.clientAddress}
              hasError={
                errors.clientAddress && touched.clientAddress ? true : false
              }
            />

            <ErrorWrap>
              {errors.clientAddress && touched.clientAddress ? (
                <>{errors.clientAddress}</>
              ) : null}
            </ErrorWrap>
          </Group>

          <Group>
            <Label>City</Label>
            <Field
              type="text"
              name="city"
              placeholder="Enter client's city"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.city}
              hasError={Boolean(errors.city && touched.city)}
            />

            <ErrorWrap>
              {errors.city && touched.city ? (
                <ErrorWrap>{errors.city}</ErrorWrap>
              ) : null}
            </ErrorWrap>
          </Group>

          <Group>
            <Label>Country</Label>
            <Field
              type="text"
              name="country"
              placeholder="Enter client's country"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.country}
              hasError={Boolean(errors.country && touched.country)}
            />

            <ErrorWrap>
              {errors.country && touched.country ? (
                <ErrorWrap>{errors.country}</ErrorWrap>
              ) : null}
            </ErrorWrap>
          </Group>

          <Group>
            <Label>Zip Code</Label>
            <Field
              type="text"
              name="zipCode"
              placeholder="Enter client's zip code"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.zipCode}
              hasError={Boolean(errors.zipCode && touched.zipCode)}
            />

            <ErrorWrap>
              {errors.zipCode && touched.zipCode ? (
                <ErrorWrap>{errors.zipCode}</ErrorWrap>
              ) : null}
            </ErrorWrap>
          </Group>

          <Group>
            <Label>Tax Number</Label>
            <Field
              type="text"
              name="taxNumber"
              placeholder="Enter client's tax number"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.taxNumber}
              hasError={Boolean(errors.taxNumber && touched.taxNumber)}
            />

            <ErrorWrap>
              {errors.taxNumber && touched.taxNumber ? (
                <>{errors.taxNumber}</>
              ) : null}
            </ErrorWrap>
          </Group>

          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            margin={{
              xs: { top: 2 },
              sm: { top: 2 },
              md: { top: 2 },
            }}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export { index as AddClientModal };
