// Core types
import { Button, Heading } from "@components";
import { Column, Container, Row } from "@components/Grid";
import { Formik, FormikHelpers } from "formik";
import type { FC } from "react";
import * as Yup from "yup";

// Vendors
import styled, { css } from "styled-components";
import axios from "axios";
import { useRouter } from "next/router";
import { Field, Label } from "@styles/Form";

const NewCompany = styled.div`
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
  companyName: string;
  companyAddress: string;
  zipCode: string;
  taxNumber: string;
}

const NewCompanySchema = Yup.object().shape({
  companyName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Please enter your full name"),
  companyAddress: Yup.string().required("Please enter your email"),
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
            Add new company
          </Heading>

          <NewCompany>
            <Formik
              autoComplete="off"
              initialValues={{
                companyName: "",
                companyAddress: "",
                zipCode: "",
                taxNumber: "",
              }}
              validationSchema={NewCompanySchema}
              onSubmit={async (
                data: Formvalues,
                { setSubmitting }: FormikHelpers<Formvalues>
              ) => {
                await axios({
                  method: "POST",
                  url: "/api/company",
                  data,
                })
                  .then((res) => {
                    router.push("/");
                    console.log(res);
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
                    <Label>Company name</Label>
                    <Field
                      hasError={Boolean(
                        errors.companyName && touched.companyName
                      )}
                      type="text"
                      name="companyName"
                      placeholder="Enter your full name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.companyName}
                    />

                    <ErrorWrap>
                      {errors.companyName && touched.companyName ? (
                        <>{errors.companyName}</>
                      ) : null}
                    </ErrorWrap>
                  </Group>

                  <Group>
                    <Label>Company address</Label>
                    <Field
                      type="companyAddress"
                      name="companyAddress"
                      placeholder="Enter Company Address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.companyAddress}
                      hasError={
                        errors.companyAddress && touched.companyAddress
                          ? true
                          : false
                      }
                    />

                    <ErrorWrap>
                      {errors.companyAddress && touched.companyAddress ? (
                        <>{errors.companyAddress}</>
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
          </NewCompany>
        </Column>
      </Row>
    </Container>
  );
};

export { index as NewCompany };
