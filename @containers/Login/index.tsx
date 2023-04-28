// Core types
import type { FC } from "react";

// Core
import { useState } from "react";

// NextJS
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

// Global components
import { Button, Heading, Logo } from "@components";

// Vendors
import { object, string } from "yup";
import styled, { css } from "styled-components";
import { Formik, FormikHelpers } from "formik";

// Global styles
import { Field, Label } from "@styles/Form";
import Link from "next/link";
import { Column, Container, Row } from "@components/Grid";

const Group = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

type Formvalues = {
  email: string;
  password: string;
};

const SignupSchema = object().shape({
  email: string().email("Invalid email").required("Email is required"),
  password: string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Password is required"),
});

const index: FC = () => {
  // Handle errors
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  // Handle router
  const router = useRouter();

  return (
    <Container>
      <Row
        padding={{
          xs: { top: 8, bottom: 8 },
          sm: { top: 8, bottom: 8 },
          md: { top: 10, bottom: 10 },
        }}
        justifyContent={{ xs: "center", sm: "center", md: "center" }}
      >
        <Column
          responsivity={{ md: 6 }}
          padding={{
            xs: { top: 8, bottom: 8 },
            sm: { top: 8, bottom: 8 },
            md: { top: 10, bottom: 10 },
          }}
        >
          <Wrap>
            <Logo $width="100" $height="50" $color="primary" />
          </Wrap>

          <Formik
            autoComplete="off"
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={async (
              values: Formvalues,
              { setSubmitting }: FormikHelpers<Formvalues>
            ) => {
              await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false,
              }).then(({ error }: any) => {
                if (error === "Verification failed") {
                  setErrorMessage("Failed");
                } else {
                  if (error) {
                    // Alert error
                    setErrorMessage(error);

                    // Disable submitting
                    setTimeout(() => {
                      setSubmitting(false);
                    }, 500);
                  } else {
                    // Set error to false
                    setErrorMessage("");

                    // Reroute user to the dashboard
                    router.push("/");
                  }
                }
              });
            }}
          >
            {({
              values,
              touched,
              errors,
              handleChange,
              handleSubmit,
              isSubmitting,
              handleBlur,
            }) => (
              <form onSubmit={handleSubmit}>
                <Group>
                  <Label>Email*</Label>
                  <Field
                    hasError={Boolean(errors.email && touched.email)}
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />

                  <ErrorWrap>
                    {errors.email && touched.email ? <>{errors.email}</> : null}
                  </ErrorWrap>
                </Group>

                <Group>
                  <Label>Password*</Label>
                  <Field
                    hasError={Boolean(errors.password && touched.password)}
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />

                  <ErrorWrap>
                    {errors.password && touched.password ? (
                      <>{errors.password}</>
                    ) : errorMessage ? (
                      <>{errorMessage}</>
                    ) : null}
                  </ErrorWrap>
                </Group>

                <ButtonWrap>
                  <Button variant="primary" type="submit">
                    {isSubmitting ? "Login..." : "Login"}
                  </Button>
                </ButtonWrap>
              </form>
            )}
          </Formik>

          <Heading as="h6">
            <Link href="/registration">Create account</Link>
          </Heading>
        </Column>
      </Row>
    </Container>
  );
};

export { index as Login };
