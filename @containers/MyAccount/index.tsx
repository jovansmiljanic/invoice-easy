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
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 2px 6px 0 rgba(67, 89, 113, 0.12);
  padding: 40px 20px;
  margin: 10px 0;

  ${({ theme: { colors } }) => css`
    background-color: ${colors.white};
  `}
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  ${({ theme: { breakpoints } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      flex-direction: column;
    }
  `}
`;

const Group = styled.div`
  width: 100%;
  flex: 0 0 49%;
  padding-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

interface Formvalues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  taxNumber: string;

  companyField: string;
  companyName: string;
  companyAddress: string;
  zipCode: string;
  city: string;
  country: string;

  bankName: string;
  trr: string;
  bic: string;
}

const MyAccountSchema = Yup.object().shape({
  firstName: Yup.string().required("Please enter First name"),
  lastName: Yup.string().required("Please enter Last name"),
  email: Yup.string().required("Please enter your Email address"),
  phoneNumber: Yup.string().required("Please enter your Phone number"),
  taxNumber: Yup.string().required("Please enter your Tax Number"),

  companyField: Yup.string().required("Please enter Company field"),
  companyName: Yup.string().required("Please enter Company name"),
  companyAddress: Yup.string().required("Please enter your Company address"),
  zipCode: Yup.string().required("Please enter your Zip Code"),
  city: Yup.string().required("Please enter City"),
  country: Yup.string().required("Please enter Country"),

  bankName: Yup.string().required("Please enter your TRR"),
  trr: Yup.string().required("Please enter your TRR"),
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
    email: details.email ? details.email : "",
    phoneNumber: details.phoneNumber ? details.phoneNumber : "",
    taxNumber: details.taxNumber ? details.taxNumber : "",

    companyField: details.companyField ? details.companyField : "",
    companyName: details.companyName ? details.companyName : "",
    companyAddress: details.companyAddress ? details.companyAddress : "",
    zipCode: details.zipCode ? details.zipCode : "",
    city: details.city ? details.city : "",
    country: details.country ? details.country : "",

    bankName: details.bankName ? details.bankName : "",
    trr: details.trr ? details.trr : "",
    bic: details.bic ? details.bic : "",
  };

  return (
    <Container backgroundColor="background">
      <Row
        padding={{
          xs: { top: 6, bottom: 6 },
          sm: { top: 6, bottom: 6 },
          md: { top: 10, bottom: 6 },
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
                  router.push("/my-account");
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
                <MyAccount>
                  <Heading
                    as="h5"
                    color="gray"
                    weight="semiBold"
                    padding={{
                      xs: { bottom: 4 },
                      sm: { bottom: 4 },
                      md: { bottom: 4 },
                    }}
                  >
                    Personal information
                  </Heading>

                  <Wrapper>
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
                      <Label>Last name</Label>
                      <Field
                        hasError={Boolean(errors.lastName && touched.lastName)}
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
                      <Label>Email</Label>
                      <Field
                        type="text"
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
                        type="text"
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
                        type="text"
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
                  </Wrapper>
                </MyAccount>

                <MyAccount>
                  <Heading
                    as="h5"
                    color="gray"
                    weight="semiBold"
                    padding={{
                      xs: { bottom: 4 },
                      sm: { bottom: 4 },
                      md: { bottom: 4 },
                    }}
                  >
                    Company information
                  </Heading>

                  <Wrapper>
                    <Group>
                      <Label>Company field</Label>
                      <Field
                        hasError={Boolean(
                          errors.companyField && touched.companyField
                        )}
                        type="text"
                        name="companyField"
                        placeholder="Enter your company field"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.companyField}
                      />

                      <ErrorWrap>
                        {errors.companyField && touched.companyField ? (
                          <>{errors.companyField}</>
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
                      <Label>Zip Code</Label>
                      <Field
                        type="text"
                        name="zipCode"
                        placeholder="Zip code and City"
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
                      <Label>City</Label>
                      <Field
                        type="text"
                        name="city"
                        placeholder="City"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.city}
                        hasError={Boolean(errors.city && touched.city)}
                      />

                      <ErrorWrap>
                        {errors.city && touched.city ? (
                          <>{errors.city}</>
                        ) : null}
                      </ErrorWrap>
                    </Group>

                    <Group>
                      <Label>Country</Label>
                      <Field
                        type="text"
                        name="country"
                        placeholder="Country"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.country}
                        hasError={Boolean(errors.country && touched.country)}
                      />

                      <ErrorWrap>
                        {errors.country && touched.country ? (
                          <>{errors.country}</>
                        ) : null}
                      </ErrorWrap>
                    </Group>
                  </Wrapper>
                </MyAccount>

                <MyAccount>
                  <Heading
                    as="h5"
                    color="gray"
                    weight="semiBold"
                    padding={{
                      xs: { bottom: 4 },
                      sm: { bottom: 4 },
                      md: { bottom: 4 },
                    }}
                  >
                    Bank information
                  </Heading>

                  <Wrapper>
                    <Group>
                      <Label>Bank name</Label>
                      <Field
                        type="text"
                        name="bankName"
                        placeholder="Please enter your bank name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.bankName}
                        hasError={Boolean(errors.bankName && touched.bankName)}
                      />

                      <ErrorWrap>
                        {errors.bankName && touched.bankName ? (
                          <ErrorWrap>{errors.bankName}</ErrorWrap>
                        ) : null}
                      </ErrorWrap>
                    </Group>

                    <Group>
                      <Label>TRR</Label>
                      <Field
                        type="text"
                        name="trr"
                        placeholder="Please enter your TRR"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.trr}
                        hasError={Boolean(errors.trr && touched.trr)}
                      />

                      <ErrorWrap>
                        {errors.trr && touched.trr ? (
                          <ErrorWrap>{errors.trr}</ErrorWrap>
                        ) : null}
                      </ErrorWrap>
                    </Group>

                    <Group>
                      <Label>BIC</Label>
                      <Field
                        type="text"
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
                  </Wrapper>
                </MyAccount>

                <Button
                  type="submit"
                  variant="primary"
                  margin={{
                    xs: { top: 2 },
                    sm: { top: 2 },
                    md: { top: 2 },
                  }}
                  isLoading={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </Form>
            )}
          </Formik>
        </Column>
      </Row>
    </Container>
  );
};

export { index as MyAccount };
