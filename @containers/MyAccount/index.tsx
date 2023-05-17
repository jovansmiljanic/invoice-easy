// Core types
import { type FC } from "react";

// Global components
import { Button, Heading } from "@components";

// GLobal grid components
import { Column, Container, Row } from "@components/Grid";

// Vendors
import axios from "axios";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { Formik, FormikHelpers } from "formik";
import styled, { css } from "styled-components";

// Global styles
import { Field, Label } from "@styles/Form";

// Global types
import { MyAccount as MyAccountType } from "@types";

const MyAccount = styled.div`
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
  ttr: string;
  bic: string;
  email: string;
  phoneNumber: string;
}

const NewCompanySchema = Yup.object().shape({
  companyName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Please enter your full name"),
  companyAddress: Yup.string().required("Please enter your email"),
  zipCode: Yup.string().required("Please enter your password"),
  taxNumber: Yup.string().required("Please enter your password"),
  ttr: Yup.string().required("Please enter your password"),
  bic: Yup.string().required("Please enter your password"),
  email: Yup.string().required("Please enter your password"),
  phoneNumber: Yup.string().required("Please enter your password"),
});

interface MyAccount {
  details: MyAccountType[];
}

const index: FC<MyAccount> = ({ details }) => {
  const router = useRouter();

  const initialVal = {
    companyName: "",
    companyAddress: "",
    zipCode: "",
    taxNumber: "",
    ttr: "",
    bic: "",
    email: "",
    phoneNumber: "",
  };

  const prePopVal = {
    companyName: details[0].companyName,
    companyAddress: details[0].companyAddress,
    zipCode: details[0].zipCode,
    taxNumber: details[0].taxNumber,
    ttr: details[0].ttr,
    bic: details[0].bic,
    email: details[0].email,
    phoneNumber: details[0].phoneNumber,
  };
  return (
    <Container backgroundColor="background">
      <Row
        padding={{ md: { top: 10, bottom: 10 } }}
        justifyContent={{ md: "center" }}
        alignItems={{ md: "center" }}
      >
        <Column
          responsivity={{ md: 6 }}
          padding={{
            xs: { top: 4, bottom: 4 },
            sm: { top: 4, bottom: 4 },
            md: { top: 0, bottom: 10 },
          }}
        >
          <Heading as="h4" color="gray" padding={{ md: { bottom: 4 } }}>
            Add your company informations
          </Heading>

          <MyAccount>
            <Formik
              autoComplete="off"
              initialValues={details ? prePopVal : initialVal}
              validationSchema={NewCompanySchema}
              onSubmit={async (
                data: Formvalues,
                { setSubmitting }: FormikHelpers<Formvalues>
              ) => {
                setSubmitting(true);

                if (details) {
                  const id = details[0]._id;

                  await axios({
                    method: "PUT",
                    url: "/api/my-account",
                    data: {
                      id,
                      ...data,
                    },
                  })
                    .then((res) => {
                      setSubmitting(false);
                      router.push("/");
                    })
                    .catch((err) => {
                      setSubmitting(false);
                      console.log(err);
                    });
                } else {
                  await axios({
                    method: "POST",
                    url: "/api/my-account",
                    data,
                  })
                    .then((res) => {
                      setSubmitting(false);
                      router.push("/");
                    })
                    .catch((err) => {
                      setSubmitting(false);
                      console.log(err);
                    });
                }
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

                  <Group>
                    <Label>TTR</Label>
                    <Field
                      type="ttr"
                      name="ttr"
                      placeholder="Please enter your TTR"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.ttr}
                      hasError={Boolean(errors.ttr && touched.ttr)}
                    />

                    <ErrorWrap>
                      {errors.ttr && touched.ttr ? (
                        <ErrorWrap>{errors.ttr}</ErrorWrap>
                      ) : null}
                    </ErrorWrap>
                  </Group>

                  <Group>
                    <Label>BIC</Label>
                    <Field
                      type="bic"
                      name="bic"
                      placeholder="Please enter BIC number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.bic}
                      hasError={Boolean(errors.bic && touched.bic)}
                    />

                    <ErrorWrap>
                      {errors.bic && touched.bic ? (
                        <ErrorWrap>{errors.bic}</ErrorWrap>
                      ) : null}
                    </ErrorWrap>
                  </Group>

                  <Group>
                    <Label>Email</Label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Please enter your email address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      hasError={Boolean(errors.email && touched.email)}
                    />

                    <ErrorWrap>
                      {errors.email && touched.email ? (
                        <>{errors.email}</>
                      ) : null}
                    </ErrorWrap>
                  </Group>

                  <Group>
                    <Label>Phone number</Label>
                    <Field
                      type="phoneNumber"
                      name="phoneNumber"
                      placeholder="Please enter your phone number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phoneNumber}
                      hasError={Boolean(
                        errors.phoneNumber && touched.phoneNumber
                      )}
                    />

                    <ErrorWrap>
                      {errors.phoneNumber && touched.phoneNumber ? (
                        <>{errors.phoneNumber}</>
                      ) : null}
                    </ErrorWrap>
                  </Group>

                  <Button
                    type="submit"
                    variant="primary"
                    margin={{ md: { bottom: 2 }, sm: { bottom: 2 } }}
                    isLoading={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </Form>
              )}
            </Formik>
          </MyAccount>
        </Column>
      </Row>
    </Container>
  );
};

export { index as MyAccount };
