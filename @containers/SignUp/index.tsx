// Core types
import { type FC, useState } from "react";

// NextJS
import { useRouter } from "next/router";

// Global components
import { Button, ErrorWrap, Heading, Logo } from "@components";

// Vendors
import axios from "axios";
import * as Yup from "yup";
import Link from "next/link";
import { Formik, FormikHelpers } from "formik";
import styled, { css } from "styled-components";
import useTranslation from "next-translate/useTranslation";

// Form styles
import { Field, Label } from "@styles/Form";

// Global grid components
import { Column, Container, Row } from "@components/Grid";

// Icon
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const Wrapper = styled.div`
  padding: 40px 20px;
  border-radius: 5px;
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

const EyeWrap = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(0, -10%);
  cursor: pointer;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  button {
    width: 100%;
  }
`;

interface Formvalues {
  fullName: string;
  email: string;
  password: string;
}

const index: FC = () => {
  // Translation
  const { t } = useTranslation();

  // Router
  const router = useRouter();

  const [isEyeOpened, setIsEyeOpened] = useState(false);

  const SignupSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, t("form:tooShort"))
      .max(50, t("form:tooLong"))
      .required(t("form:fullNameError"))
      .matches(
        /^([a-zA-ZÀ-ÖØ-öø-ÿ]{2,}\s[a-zA-ZÀ-ÖØ-öø-ÿ]{1,}'?-?[a-zA-ZÀ-ÖØ-öø-ÿ]{2,}\s?([a-zA-ZÀ-ÖØ-öø-ÿ]{1,})?)/,
        t("form:fullNameError")
      ),
    email: Yup.string()
      .email(t("form:validEmailError"))
      .required(t("form:emailError")),
    password: Yup.string()
      .min(8, t("form:tooShort"))
      .max(50, t("form:tooLong"))
      .required(t("form:passwordError")),
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
              {t("signUp:title")}
            </Heading>

            <Heading
              as="h6"
              padding={{
                xs: { top: 1, bottom: 4 },
                sm: { top: 1, bottom: 4 },
                md: { top: 1, bottom: 4 },
              }}
            >
              {t("signUp:description")}
            </Heading>

            <Formik
              autoComplete="off"
              initialValues={{
                fullName: "",
                email: "",
                password: "",
              }}
              validationSchema={SignupSchema}
              onSubmit={async (data: Formvalues) => {
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
                    <Label>{t("form:fullNameLabel")}</Label>
                    <Field
                      hasError={Boolean(errors.fullName && touched.fullName)}
                      type="text"
                      name="fullName"
                      placeholder={t("form:fullNamePlaceholder")}
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
                    <Label>{t("form:emailLabel")}</Label>
                    <Field
                      type="email"
                      name="email"
                      placeholder={t("form:emailPlaceholder")}
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
                    <Label>{t("form:passwordLabel")}</Label>
                    <Field
                      type="password"
                      name="password"
                      placeholder={t("form:passwordPlaceholder")}
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
                      {isEyeOpened ? (
                        <VisibilityOutlinedIcon />
                      ) : (
                        <VisibilityOffOutlinedIcon />
                      )}
                    </EyeWrap>
                  </Group>

                  <ButtonWrap>
                    <Button
                      type="submit"
                      variant="secondary"
                      margin={{
                        xs: { top: 1, bottom: 2 },
                        sm: { top: 1, bottom: 2 },
                        md: { top: 1, bottom: 2 },
                      }}
                      isLoading={isSubmitting}
                    >
                      {isSubmitting ? t("form:loading") : t("form:signUpCta")}
                    </Button>
                  </ButtonWrap>
                </Form>
              )}
            </Formik>

            <Heading
              as="h6"
              textAlign={{ xs: "center", sm: "center", md: "center" }}
              padding={{ xs: { top: 2 }, sm: { top: 2 }, md: { top: 2 } }}
            >
              {t("form:signUpSwitchLabel")}{" "}
              <Link href="/">{t("form:signUpSwitchLink")}</Link>
            </Heading>
          </Wrapper>
        </Column>
      </Row>
    </Container>
  );
};

export { index as SignUp };
