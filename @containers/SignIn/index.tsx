// Core types
import { type FC } from "react";

// Core
import { useState } from "react";

// NextJS
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

// Global components
import { Button, Heading, Logo } from "@components";

// Vendors
import Link from "next/link";
import { object, string } from "yup";
import styled, { css } from "styled-components";
import { Formik, FormikHelpers } from "formik";

// Global styles
import { Field, Label } from "@styles/Form";

// GLobal grid components
import { Column, Container, Row } from "@components/Grid";
import { ToggleEye } from "public/svg";

const Wrapper = styled.div`
  padding: 40px 20px;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;

  ${({ theme: { colors, breakpoints } }) => css`
    background-color: ${colors.white};

    @media (max-width: ${breakpoints.md}px) {
      padding: 40px 10px;
    }

    a {
      color: ${colors.secondary};
    }
  `}
`;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;

  position: relative;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    width: 100%;
  }
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

const EyeWrap = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(0, -20%);
  cursoir: pointer;
`;

type Formvalues = {
  email: string;
  password: string;
};

const SignInSchema = object().shape({
  email: string().email("Invalid email").required("Please enter email address"),
  password: string().required("Please enter your password"),
});

const index: FC = () => {
  // Handle errors
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  // Handle router
  const router = useRouter();

  const [isEyeOpened, setIsEyeOpened] = useState(false);

  return (
    <Container height={82} alignCenter>
      <Row
        justifyContent={{ xs: "center", sm: "center", md: "center" }}
        alignItems={{ xs: "center", sm: "center", md: "center" }}
        padding={{
          xs: { top: 10, bottom: 10 },
          sm: { top: 10, bottom: 10 },
          md: { top: 0, bottom: 0 },
        }}
      >
        <Column responsivity={{ md: 4 }}>
          <Wrapper>
            <Wrap>
              <Logo $width="100" $height="50" $color="secondary" />
            </Wrap>

            <Heading as="h4" weight="semiBold" color="gray">
              Welcome to Invoice Easy! 👋
            </Heading>

            <Heading
              as="h6"
              padding={{
                xs: { top: 1, bottom: 4 },
                sm: { top: 1, bottom: 4 },
                md: { top: 1, bottom: 4 },
              }}
              color="gray"
            >
              Please sign-in to your account and start the adventure
            </Heading>

            <Formik
              autoComplete="off"
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={SignInSchema}
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
                    <Label>Email address</Label>
                    <Field
                      hasError={Boolean(errors.email && touched.email)}
                      type="text"
                      name="email"
                      placeholder="Enter your email address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />

                    <ErrorWrap>
                      {errors.email && touched.email ? (
                        <>{errors.email}</>
                      ) : null}
                    </ErrorWrap>
                  </Group>

                  <Group>
                    <Label>Password</Label>
                    <Field
                      hasError={Boolean(errors.password && touched.password)}
                      type={isEyeOpened ? "text" : "password"}
                      name="password"
                      placeholder="************"
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

                    <EyeWrap onClick={() => setIsEyeOpened(!isEyeOpened)}>
                      <ToggleEye toggled={isEyeOpened} />
                    </EyeWrap>
                  </Group>

                  <ButtonWrap>
                    <Button
                      variant="secondary"
                      type="submit"
                      isLoading={isSubmitting}
                    >
                      {isSubmitting ? "Loading..." : "Sign in"}
                    </Button>
                  </ButtonWrap>
                </form>
              )}
            </Formik>

            <Heading
              as="h6"
              textAlign={{ xs: "center", sm: "center", md: "center" }}
              padding={{ xs: { top: 2 }, sm: { top: 2 }, md: { top: 2 } }}
              color="gray"
            >
              New on our platform? <Link href="/signup">Create account</Link>
            </Heading>
          </Wrapper>
        </Column>
      </Row>
    </Container>
  );
};

export { index as SignIn };
