// Core types
import type { FC } from "react";

// NextJS
import { useRouter } from "next/router";

// Global components
import { Button, Heading, Logo } from "@components";

// Vendors
import axios from "axios";
import * as Yup from "yup";
import { Formik, FormikHelpers } from "formik";
import styled, { css } from "styled-components";

// Form styles
import { Field, Label } from "@styles/Form";
import Link from "next/link";
import { Column, Container, Row } from "@components/Grid";

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

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

interface Formvalues {
  fullName: string;
  email: string;
  password: string;
}

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Full name is required")
    .matches(
      /^([a-zA-ZÀ-ÖØ-öø-ÿ]{2,}\s[a-zA-ZÀ-ÖØ-öø-ÿ]{1,}'?-?[a-zA-ZÀ-ÖØ-öø-ÿ]{2,}\s?([a-zA-ZÀ-ÖØ-öø-ÿ]{1,})?)/,
      "Please enter your full name"
    ),
  email: Yup.string()
    .email("Please enter valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Password is required"),
});

const index: FC = () => {
  // Router
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
              fullName: "",
              email: "",
              password: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={async (
              data: Formvalues,
              { setSubmitting }: FormikHelpers<Formvalues>
            ) => {
              await axios({
                method: "POST",
                url: "/api/registration",
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
                  <Label>Full Name*</Label>
                  <Field
                    type="text"
                    name="fullName"
                    placeholder="Full name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.fullName}
                    hasError={Boolean(errors.fullName && touched.fullName)}
                  />

                  {errors.fullName && touched.fullName ? (
                    <>{errors.fullName}</>
                  ) : null}
                </Group>

                <Group>
                  <Label>Email*</Label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    hasError={errors.email && touched.email ? true : false}
                  />

                  {errors.email && touched.email ? <>{errors.email}</> : null}
                </Group>

                <Group>
                  <Label>Password</Label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    hasError={Boolean(errors.password && touched.password)}
                  />

                  {errors.password && touched.password ? (
                    <>{errors.password}</>
                  ) : null}
                </Group>

                <Button
                  type="submit"
                  variant="primary"
                  margin={{ md: { bottom: 2 }, sm: { bottom: 2 } }}
                >
                  {isSubmitting ? "Registering" : "Register now"}
                </Button>
              </Form>
            )}
          </Formik>

          <Heading as="h6">
            <Link href="/">Login</Link>
          </Heading>
        </Column>
      </Row>
    </Container>
  );
};

export { index as Registration };
