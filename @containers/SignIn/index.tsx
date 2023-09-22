// Core types
import { type FC, useState } from "react";

// NextJS
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

// Global components
import { Button, ErrorWrap, Heading, Logo } from "@components";

// Vendors
import Link from "next/link";
import { object, string } from "yup";
import styled, { css } from "styled-components";
import { Formik, FormikHelpers } from "formik";
import useTranslation from "next-translate/useTranslation";

// Global styles
import { Field, Label } from "@styles/Form";

// GLobal grid components
import { Column, Container, Row } from "@components/Grid";

// Icon
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const Wrapper = styled.div`
  padding: 40px 20px;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;

  ${({ theme: { colors, breakpoints } }) => css`
    border: 1px solid ${colors.lightGray};

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
  position: relative;

  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    width: 100%;
  }
`;

const EyeWrap = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(0, -25%);
  cursor: pointer;
`;

type Formvalues = {
  email: string;
  password: string;
};

const index: FC = () => {
  // Translation
  const { t } = useTranslation();

  // Handle router
  const router = useRouter();

  // Handle errors
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const [isEyeOpened, setIsEyeOpened] = useState(false);

  const SignInSchema = object().shape({
    email: string()
      .email(t("form:validEmailError"))
      .required(t("form:emailError")),
    password: string().required(t("form:passwordError")),
  });

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

            <Heading as="h4" weight="semiBold">
              {t("signIn:title")}
            </Heading>

            <Heading
              as="h6"
              padding={{
                xs: { top: 1, bottom: 4 },
                sm: { top: 1, bottom: 4 },
                md: { top: 1, bottom: 4 },
              }}
            >
              {t("signIn:description")}
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
                    <Label>{t("form:emailLabel")}</Label>
                    <Field
                      hasError={Boolean(errors.email && touched.email)}
                      type="text"
                      name="email"
                      placeholder={t("form:emailPlaceholder")}
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
                    <Label>{t("form:passwordLabel")}</Label>
                    <Field
                      hasError={Boolean(errors.password && touched.password)}
                      type={isEyeOpened ? "text" : "password"}
                      name="password"
                      placeholder={t("form:passwordPlaceholder")}
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
                      {isEyeOpened ? (
                        <VisibilityOutlinedIcon />
                      ) : (
                        <VisibilityOffOutlinedIcon />
                      )}
                    </EyeWrap>
                  </Group>

                  <ButtonWrap>
                    <Button
                      variant="secondary"
                      type="submit"
                      isLoading={isSubmitting}
                    >
                      {isSubmitting ? t("form:loading") : t("form:signInCta")}
                    </Button>
                  </ButtonWrap>
                </form>
              )}
            </Formik>

            <Heading
              as="h6"
              textAlign={{ xs: "center", sm: "center", md: "center" }}
              padding={{ xs: { top: 2 }, sm: { top: 2 }, md: { top: 2 } }}
            >
              {t("form:signInSwitchLabel")}{" "}
              <Link href="/signup">{t("form:signInSwitchLink")}</Link>
            </Heading>
          </Wrapper>
        </Column>
      </Row>
    </Container>
  );
};

export { index as SignIn };
