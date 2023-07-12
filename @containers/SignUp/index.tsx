// Core types
import { useState, type FC } from "react";

// NextJS
import { useRouter } from "next/router";

// Global components
import { Button, Heading, Logo } from "@components";

// Vendors
import axios from "axios";
import * as Yup from "yup";
import Link from "next/link";
import { Formik, FormikHelpers } from "formik";
import styled, { css } from "styled-components";

// Form styles
import { Field, Label } from "@styles/Form";

// Global grid components
import { Column, Container, Row } from "@components/Grid";
import { Eye, ToggleEye } from "public/svg";

const Wrapper = styled.div`
  padding: 40px 20px;
  border-radius: 5px;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Group = styled.div`
  width: 100%;
  position: relative;
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

const EyeWrap = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(0, -10%);
  cursoir: pointer;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    width: 100%;
  }
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
    .required("Please enter your full name")
    .matches(
      /^([a-zA-ZÀ-ÖØ-öø-ÿ]{2,}\s[a-zA-ZÀ-ÖØ-öø-ÿ]{1,}'?-?[a-zA-ZÀ-ÖØ-öø-ÿ]{2,}\s?([a-zA-ZÀ-ÖØ-öø-ÿ]{1,})?)/,
      "Please enter your full name"
    ),
  email: Yup.string()
    .email("Please enter valid email")
    .required("Please enter your email"),
  password: Yup.string()
    .min(8, "Your password is too short!")
    .max(50, "Your password is too long!")
    .required("Please enter your password"),
});

const index: FC = () => {
  // Router
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
              Adventure starts here 🚀
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
              Make your invoicing easy and fun!
            </Heading>

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
                    <Label>Full Name</Label>
                    <Field
                      hasError={Boolean(errors.fullName && touched.fullName)}
                      type="text"
                      name="fullName"
                      placeholder="Enter your full name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.fullName}
                    />

                    <ErrorWrap>
                      {errors.fullName && touched.fullName ? (
                        <>{errors.fullName}</>
                      ) : null}
                    </ErrorWrap>
                  </Group>

                  <Group>
                    <Label>Email</Label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      hasError={errors.email && touched.email ? true : false}
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
                      type="password"
                      name="password"
                      placeholder="********"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      hasError={Boolean(errors.password && touched.password)}
                    />

                    <ErrorWrap>
                      {errors.password && touched.password ? (
                        <>{errors.password}</>
                      ) : null}
                    </ErrorWrap>

                    <EyeWrap onClick={() => setIsEyeOpened(!isEyeOpened)}>
                      <ToggleEye toggled={isEyeOpened} />
                    </EyeWrap>
                  </Group>

                  <ButtonWrap>
                    <Button
                      type="submit"
                      variant="secondary"
                      margin={{
                        xs: { bottom: 2 },
                        sm: { bottom: 2 },
                        md: { bottom: 2 },
                      }}
                      isLoading={isSubmitting}
                    >
                      {isSubmitting ? "Loading..." : "Sign up"}
                    </Button>
                  </ButtonWrap>
                </Form>
              )}
            </Formik>

            <Heading
              as="h6"
              textAlign={{ xs: "center", sm: "center", md: "center" }}
              padding={{ xs: { top: 2 }, sm: { top: 2 }, md: { top: 2 } }}
              color="gray"
            >
              Already have an account? <Link href="/">Sign in instead</Link>
            </Heading>
          </Wrapper>
        </Column>
      </Row>
    </Container>
  );
};

export { index as SignUp };
