// Core types
import { type FC } from "react";

// Global components
import { Button, Heading } from "@components";

// GLobal grid components
import { Column, Container, Row } from "@components/Grid";

// Vendors
import axios from "axios";
import * as Yup from "yup";
import { Session } from "next-auth";
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
    color: ${colors.white};
    background-color: ${colors.danger};
  `}
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  ${({ theme: { breakpoints } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      flex-direction: column;
    }
  `}
`;

const Wrap = styled.div`
  width: 49%;

  ${({ theme: { breakpoints } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      width: 100%;
    }
  `}
`;

interface Formvalues {
  firstName: string;
  lastName: string;
  companyName: string;
  companyAddress: string;
  zipCode: string;
  taxNumber: string;
  ttr: string;
  bic: string;
  email: string;
  phoneNumber: string;
}

const MyAccountSchema = Yup.object().shape({
  firstName: Yup.string().required("Please enter First name"),
  lastName: Yup.string().required("Please enter Last name"),
  email: Yup.string().required("Please enter your Email address"),
  phoneNumber: Yup.string().required("Please enter your Phone number"),
  companyName: Yup.string().required("Please enter Company name"),
  companyAddress: Yup.string().required("Please enter your Company address"),
  zipCode: Yup.string().required("Please enter your Zip Code"),
  taxNumber: Yup.string().required("Please enter your Tax Number"),
  ttr: Yup.string().required("Please enter your TTR"),
  bic: Yup.string().required("Please enter your BIC code"),
});

interface MyAccount {
  details: MyAccountType;
  session: Session;
}

const index: FC<MyAccount> = ({ details, session }) => {
  // Handle router
  const router = useRouter();

  const initialValue = {
    firstName: details.firstName ? details.firstName : "",
    lastName: details.lastName ? details.lastName : "",
    companyName: details.companyName ? details.companyName : "",
    companyAddress: details.companyAddress ? details.companyAddress : "",
    zipCode: details.zipCode ? details.zipCode : "",
    taxNumber: details.taxNumber ? details.taxNumber : "",
    ttr: details.ttr ? details.ttr : "",
    bic: details.bic ? details.bic : "",
    email: details.email ? details.email : "",
    phoneNumber: details.phoneNumber ? details.phoneNumber : "",
  };

  return (
    <Container backgroundColor="background">
      <Row
        padding={{
          xs: { top: 6, bottom: 6 },
          sm: { top: 6, bottom: 6 },
          md: { top: 10, bottom: 10 },
        }}
        justifyContent={{ md: "center" }}
        alignItems={{ md: "center" }}
      >
        <Column
          responsivity={{ md: 9 }}
          padding={{
            xs: { top: 4, bottom: 4 },
            sm: { top: 4, bottom: 4 },
            md: { top: 0, bottom: 10 },
          }}
        >
          <Heading
            as="h4"
            color="gray"
            padding={{
              xs: { bottom: 4 },
              sm: { bottom: 4 },
              md: { bottom: 4 },
            }}
          >
            Add your company informations
          </Heading>

          <MyAccount>
            <Formik
              autoComplete="off"
              initialValues={initialValue}
              validationSchema={MyAccountSchema}
              onSubmit={async (
                data: Formvalues,
                { setSubmitting }: FormikHelpers<Formvalues>
              ) => {
                setSubmitting(true);

                const id = session.user._id;

                await axios({
                  method: "PUT",
                  url: "/api/registration",
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
                  <Wrapper>
                    <Wrap>
                      <Group>
                        <Label>First name</Label>
                        <Field
                          hasError={Boolean(
                            errors.firstName && touched.firstName
                          )}
                          type="text"
                          name="firstName"
                          placeholder="Enter your full name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.firstName}
                        />

                        <ErrorWrap>
                          {errors.firstName && touched.firstName ? (
                            <>{errors.firstName}</>
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
                    </Wrap>

                    <Wrap>
                      <Group>
                        <Label>Last name</Label>
                        <Field
                          hasError={Boolean(
                            errors.lastName && touched.lastName
                          )}
                          type="text"
                          name="lastName"
                          placeholder="Enter your full name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.lastName}
                        />

                        <ErrorWrap>
                          {errors.lastName && touched.lastName ? (
                            <>{errors.lastName}</>
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

                      <Group>
                        <Label>Tax Number</Label>
                        <Field
                          type="taxNumber"
                          name="taxNumber"
                          placeholder="Tax number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.taxNumber}
                          hasError={Boolean(
                            errors.taxNumber && touched.taxNumber
                          )}
                        />

                        <ErrorWrap>
                          {errors.taxNumber && touched.taxNumber ? (
                            <>{errors.taxNumber}</>
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
                    </Wrap>
                  </Wrapper>

                  <Button
                    type="submit"
                    variant="primary"
                    margin={{ xs: { top: 2 }, sm: { top: 2 }, md: { top: 2 } }}
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
