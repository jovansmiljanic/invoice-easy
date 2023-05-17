// Core types
import type { FC } from "react";

// Global components
import { Button, Heading } from "@components";

// Global grid components
import { Column, Container, Row } from "@components/Grid";

// Vendors
import axios from "axios";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { Formik, FormikHelpers } from "formik";
import styled, { css } from "styled-components";

// Global styles
import { Field, Label } from "@styles/Form";

const NewClient = styled.div`
  border-radius: 5px;
  box-shadow: 0 2px 6px 0 rgba(67, 89, 113, 0.12);
  padding: 40px 20px;

  ${({ theme: { colors } }) => css`
    background-color: ${colors.white};
  `}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Group = styled.div`
  width: 100%;
  padding-bottom: 10px;
`;

const ErrorWrap = styled.div`
  width: 100%;
  font-size: 10px;
  padding: 0 12px;

  ${({ theme: { colors } }) => css`
    background-color: ${colors.danger};
    color: ${colors.white};
  `}
`;

interface Formvalues {
  clientName: string;
  clientAddress: string;
  zipCode: string;
  taxNumber: string;
}

const NewClientSchema = Yup.object().shape({
  clientName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Please enter your full name"),
  clientAddress: Yup.string().required("Please enter your email"),
  zipCode: Yup.string().required("Please enter your password"),
  taxNumber: Yup.string().required("Please enter your password"),
});

const index: FC = () => {
  const router = useRouter();

  return (
    <Container backgroundColor="background">
      <Row
        padding={{ md: { top: 10, bottom: 10 } }}
        justifyContent={{ md: "center" }}
        alignItems={{ md: "center" }}
      >
        <Column responsivity={{ md: 6 }} padding={{ md: { bottom: 10 } }}>
          <Heading as="h4" color="gray" padding={{ md: { bottom: 4 } }}>
            Add new client
          </Heading>

          <NewClient>
            <Formik
              autoComplete="off"
              initialValues={{
                clientName: "",
                clientAddress: "",
                zipCode: "",
                taxNumber: "",
              }}
              validationSchema={NewClientSchema}
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
                <Form id="myForm" onSubmit={handleSubmit}>
                  <Group>
                    <Label>Client name</Label>
                    <Field
                      hasError={Boolean(
                        errors.clientName && touched.clientName
                      )}
                      type="text"
                      name="clientName"
                      placeholder="Enter your full name"
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
                      type="clientAddress"
                      name="clientAddress"
                      placeholder="Enter Client Address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.clientAddress}
                      hasError={
                        errors.clientAddress && touched.clientAddress
                          ? true
                          : false
                      }
                    />

                    <ErrorWrap>
                      {errors.clientAddress && touched.clientAddress ? (
                        <>{errors.clientAddress}</>
                      ) : null}
                    </ErrorWrap>
                  </Group>

                  <Group>
                    <Label>Zip Code</Label>
                    <Field
                      type="zipCode"
                      name="zipCode"
                      placeholder="Zip code"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.zipCode}
                      hasError={Boolean(errors.zipCode && touched.zipCode)}
                    />

                    <ErrorWrap>
                      {errors.zipCode && touched.zipCode ? (
                        <>{errors.zipCode}</>
                      ) : null}
                    </ErrorWrap>
                  </Group>

                  <Group>
                    <Label>Tax Number</Label>
                    <Field
                      type="taxNumber"
                      name="taxNumber"
                      placeholder="Tax number"
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
                    margin={{ md: { bottom: 2 }, sm: { bottom: 2 } }}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </Form>
              )}
            </Formik>
          </NewClient>
        </Column>
      </Row>
    </Container>
  );
};

export { index as NewClient };
