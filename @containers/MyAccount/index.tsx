// Core types
import { type FC } from "react";

// Global components
import { Button, ErrorWrap, Heading } from "@components";

// Vendors
import axios from "axios";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { Formik, FormikHelpers } from "formik";
import styled, { css } from "styled-components";
import useTranslation from "next-translate/useTranslation";

// Global styles
import { Field, Label } from "@styles/Form";

// Global types
import { MyAccount as MyAcoountType, IMyAccountForm } from "@types";

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const MyAccountContainer = styled.div`
  flex: 0 0 49%;
  border-radius: 10px;
  box-shadow: 0 2px 6px 0 rgba(67, 89, 113, 0.12);
  padding: 40px 20px;
  margin: 10px 0;

  ${({ theme: { colors, breakpoints } }) => css`
    background-color: ${colors.white};

    @media (max-width: ${breakpoints.md}px) {
      flex: 0 0 100%;
    }
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

interface MyAccount {
  currentUser: MyAcoountType;
}

const index: FC<MyAccount> = ({ currentUser }) => {
  // Translation
  const { t } = useTranslation();

  // Router
  const router = useRouter();

  if (!currentUser) return <ErrorWrap>No user data available.</ErrorWrap>;

  const initialValues: IMyAccountForm = {
    firstName: currentUser.firstName || "",
    lastName: currentUser.lastName || "",
    email: currentUser.email || "",
    phoneNumber: currentUser.phoneNumber || "",
    taxNumber: currentUser.taxNumber || "",
    registrationNumber: currentUser.registrationNumber || "",

    companyField: currentUser.companyField || "",
    companyName: currentUser.companyName || "",
    companyAddress: currentUser.companyAddress || "",
    zipCode: currentUser.zipCode || "",
    city: currentUser.city || "",
    country: currentUser.country || "",

    bankName: currentUser.bankName || "",
    trr: currentUser.trr || "",
    bic: currentUser.bic || "",
  };

  const handleSubmit = async (
    data: IMyAccountForm,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    setSubmitting(true);

    const id = currentUser?._id;

    await axios({
      method: "PUT",
      url: `/api/registration`,
      data: {
        id,
        ...data,
      },
    })
      .then(res => {
        setSubmitting(false);

        router.push("/my-account");
      })
      .catch(err => {
        setSubmitting(false);
        console.log(err);
      });
  };

  const MyAccountSchema = Yup.object().shape({
    firstName: Yup.string().required(t("form:firstNameError")),
    lastName: Yup.string().required(t("form:lastNameError")),
    email: Yup.string().required(t("form:emailError")),
    phoneNumber: Yup.string().required(t("form:phoneError")),
    taxNumber: Yup.string().required(t("form:taxNumberError")),
    registrationNumber: Yup.string(),

    companyField: Yup.string().required(t("form:companyFieldError")),
    companyName: Yup.string().required(t("form:companyNameError")),
    companyAddress: Yup.string().required(t("form:companyAddressError")),
    zipCode: Yup.string().required(t("form:zipCodeError")),
    city: Yup.string().required(t("form:cityError")),
    country: Yup.string().required(t("form:countryError")),

    bankName: Yup.string().required(t("form:bankNameError")),
    trr: Yup.string().required(t("form:trrError")),
    bic: Yup.string().required(t("form:bicError")),
  });

  return (
    <Formik
      autoComplete="off"
      initialValues={initialValues}
      validationSchema={MyAccountSchema}
      onSubmit={async (
        data: IMyAccountForm,
        { setSubmitting }: FormikHelpers<IMyAccountForm>
      ) => {
        handleSubmit(data, setSubmitting);
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
          <MyAccountContainer>
            <Heading
              as="h5"
              weight="semiBold"
              padding={{
                xs: { bottom: 6 },
                sm: { bottom: 6 },
                md: { bottom: 6 },
              }}
            >
              {t("myAccount:personalInformation")}
            </Heading>

            <Wrapper>
              <Group>
                <Label>{t("form:firstNameLabel")}</Label>
                <Field
                  hasError={Boolean(errors.firstName && touched.firstName)}
                  type="text"
                  name="firstName"
                  placeholder={t("form:firstNamePlaceholder")}
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
                <Label>{t("form:lastNameLabel")}</Label>
                <Field
                  hasError={Boolean(errors.lastName && touched.lastName)}
                  type="text"
                  name="lastName"
                  placeholder={t("form:lastNamePlaceholder")}
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
                <Label>{t("form:emailLabel")}</Label>
                <Field
                  type="text"
                  name="email"
                  placeholder={t("form:emailPlaceholder")}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  hasError={Boolean(errors.email && touched.email)}
                />

                <ErrorWrap>
                  {errors.email && touched.email ? <>{errors.email}</> : null}
                </ErrorWrap>
              </Group>

              <Group>
                <Label>{t("form:phoneLabel")}</Label>
                <Field
                  type="text"
                  name="phoneNumber"
                  placeholder={t("form:phonePlaceholder")}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phoneNumber}
                  hasError={Boolean(errors.phoneNumber && touched.phoneNumber)}
                />

                <ErrorWrap>
                  {errors.phoneNumber && touched.phoneNumber ? (
                    <>{errors.phoneNumber}</>
                  ) : null}
                </ErrorWrap>
              </Group>
            </Wrapper>
          </MyAccountContainer>

          <MyAccountContainer>
            <Heading
              as="h5"
              weight="semiBold"
              padding={{
                xs: { bottom: 6 },
                sm: { bottom: 6 },
                md: { bottom: 6 },
              }}
            >
              {t("myAccount:companyInformation")}
            </Heading>

            <Wrapper>
              <Group>
                <Label>{t("form:companyField")}</Label>
                <Field
                  hasError={Boolean(
                    errors.companyField && touched.companyField
                  )}
                  type="text"
                  name="companyField"
                  placeholder={t("form:companyFieldPlaceholder")}
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
                <Label>{t("form:companyName")}</Label>
                <Field
                  hasError={Boolean(errors.companyName && touched.companyName)}
                  type="text"
                  name="companyName"
                  placeholder={t("form:companyNamePlaceholder")}
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
                <Label>{t("form:taxNumber")}</Label>
                <Field
                  type="text"
                  name="taxNumber"
                  placeholder={t("form:taxNumberPlaceholder")}
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
                <Label>{t("form:registrationNumber")}</Label>
                <Field
                  type="text"
                  name="registrationNumber"
                  placeholder={t("form:registrationNumberPlaceholder")}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.registrationNumber}
                  hasError={Boolean(
                    errors.registrationNumber && touched.registrationNumber
                  )}
                />

                <ErrorWrap>
                  {errors.registrationNumber && touched.registrationNumber ? (
                    <>{errors.registrationNumber}</>
                  ) : null}
                </ErrorWrap>
              </Group>
            </Wrapper>
          </MyAccountContainer>

          <MyAccountContainer>
            <Heading
              as="h5"
              weight="semiBold"
              padding={{
                xs: { bottom: 6 },
                sm: { bottom: 6 },
                md: { bottom: 6 },
              }}
            >
              {t("myAccount:companyInformation")}
            </Heading>

            <Wrapper>
              <Group>
                <Label>{t("form:companyAddress")}</Label>
                <Field
                  type="companyAddress"
                  name="companyAddress"
                  placeholder={t("form:companyAddressPlaceholder")}
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
                <Label>{t("form:zipCode")}</Label>
                <Field
                  type="text"
                  name="zipCode"
                  placeholder={t("form:zipCodePlaceholder")}
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
                <Label>{t("form:city")}</Label>
                <Field
                  type="text"
                  name="city"
                  placeholder={t("form:cityPlaceholder")}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.city}
                  hasError={Boolean(errors.city && touched.city)}
                />

                <ErrorWrap>
                  {errors.city && touched.city ? <>{errors.city}</> : null}
                </ErrorWrap>
              </Group>

              <Group>
                <Label>{t("form:country")}</Label>
                <Field
                  type="text"
                  name="country"
                  placeholder={t("form:countryPlaceholder")}
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
          </MyAccountContainer>

          <MyAccountContainer>
            <Heading
              as="h5"
              weight="semiBold"
              padding={{
                xs: { bottom: 6 },
                sm: { bottom: 6 },
                md: { bottom: 6 },
              }}
            >
              {t("myAccount:bankInformation")}
            </Heading>

            <Wrapper>
              <Group>
                <Label>{t("form:bankName")}</Label>
                <Field
                  type="text"
                  name="bankName"
                  placeholder={t("form:bankNamePlaceholder")}
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
                <Label>{t("form:trr")}</Label>
                <Field
                  type="text"
                  name="trr"
                  placeholder={t("form:trrPlaceholder")}
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
                <Label>{t("form:bic")}</Label>
                <Field
                  type="text"
                  name="bic"
                  placeholder={t("form:bicPlaceholder")}
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
          </MyAccountContainer>

          <Button
            type="submit"
            variant="secondary"
            margin={{
              xs: { top: 2 },
              sm: { top: 2 },
              md: { top: 2 },
            }}
            isLoading={isSubmitting}
          >
            {isSubmitting ? t("form:loading") : t("form:myAccountCta")}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export { index as MyAccount };
