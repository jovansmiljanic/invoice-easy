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

// Icon
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

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

  // Handle password visibility
  const [isEyeOpened, setIsEyeOpened] = useState(false);

  const SignInSchema = object().shape({
    email: string().email(t("form:emailError")).required(t("form:emailError")),
    password: string().required(t("form:passwordError")),
  });

  return (
    <Container>
      <Wrapper>
        <Wrap>
          <Logo $width="100" $height="50" $color="secondary" />
        </Wrap>

        <Heading as="h4" weight="semiBold">
          {t("signIn:title")}
        </Heading>

        <Heading
          as="h6"
          weight="regular"
          color="textColorSecondary"
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
                    <ErrorWrap>{errors.email}</ErrorWrap>
                  ) : null}
                </ErrorWrap>
              </Group>

              <Group>
                <Label>{t("form:passwordLabel")}</Label>
                <PassWrap>
                  <Field
                    hasError={Boolean(errors.password && touched.password)}
                    type={isEyeOpened ? "text" : "password"}
                    name="password"
                    placeholder={t("form:passwordPlaceholder")}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />

                  <EyeWrap onClick={() => setIsEyeOpened(!isEyeOpened)}>
                    {isEyeOpened ? (
                      <VisibilityOutlinedIcon />
                    ) : (
                      <VisibilityOffOutlinedIcon />
                    )}
                  </EyeWrap>
                </PassWrap>

                <ErrorWrap>
                  {errors.password && touched.password ? (
                    <>{errors.password}</>
                  ) : errorMessage ? (
                    <>{errorMessage}</>
                  ) : null}
                </ErrorWrap>
              </Group>

              <ButtonWrap>
                <Button
                  variant="secondary"
                  type="submit"
                  isLoading={isSubmitting}
                >
                  {isSubmitting ? t("signIn:loading") : t("signIn:signInCta")}
                </Button>
              </ButtonWrap>
            </form>
          )}
        </Formik>

        <Heading
          as="h6"
          weight="regular"
          color="textColorSecondary"
          textAlign={{ xs: "center", sm: "center", md: "center" }}
          padding={{ xs: { top: 2 }, sm: { top: 2 }, md: { top: 2 } }}
        >
          {t("signIn:signInSwitchLabel")}{" "}
          <Link href="/signup">{t("signIn:signInSwitchLink")}</Link>
        </Heading>
      </Wrapper>
    </Container>
  );
};

export { index as SignIn };

const Container = styled.div`
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  flex: 0 0 30%;

  border-radius: 5px;
  padding: 40px 20px;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;

  ${({ theme: { colors, breakpoints, font } }) => css`
    background-color: ${colors.white};

    a {
      color: ${colors.secondary};
      font-weight: ${font.weight.medium};
    }

    @media (max-width: ${breakpoints.md}px) {
      flex: 0 0 100%;
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

const PassWrap = styled.div`
  position: relative;
`;

const EyeWrap = styled.div`
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(0, -50%);
`;
