// Core
import { type FC, useEffect, useContext, useRef } from "react";

// Global components
import { Button, Heading } from "@components";

// Vendors
import axios from "axios";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { Formik, FormikValues } from "formik";
import styled, { css } from "styled-components";
import useTranslation from "next-translate/useTranslation";

// Global styles
import { Field, Label } from "@styles/Form";

// Icon
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

// Store context
import { StoreContext } from "@context";
import { IClientFormValues } from "@types";
import { GridContext } from "@components/MainTable";

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const Modal = styled.div`
  width: 500px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;

  ${({ theme: { breakpoints, colors } }) => css`
    background-color: ${colors.background};

    @media (max-width: ${breakpoints.md}px) {
      overflow: scroll;
      width: 90%;
    }
  `}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 40px;
`;

const Group = styled.div`
  width: 100%;
  margin: 6px 0;
`;

const ErrorWrap = styled.div`
  width: 100%;
  font-size: 10px;
  padding: 0 12px;
  border-radius: 5px;

  ${({ theme: { colors } }) => css`
    color: ${colors.white};
    background-color: ${colors.danger};
  `}
`;

const Close = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 5px;
  cursor: pointer;
`;

const index: FC = ({}) => {
  // Translation
  const { t } = useTranslation();

  // Router
  const router = useRouter();

  // Global context from store
  const { modalData, setModalData, isModalOpen, setIsModalOpen } =
    useContext(GridContext);

  // Hide dropdown when clicked outside it's Ref
  const modalPopupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      modalPopupRef.current &&
      !modalPopupRef.current.contains(event.target as Node)
    ) {
      setIsModalOpen(false);
    }
  };

  const AddClientSchema = Yup.object().shape({
    clientName: Yup.string().required(t("form:clientNameError")),
    clientAddress: Yup.string().required(t("form:clientAddressError")),
    zipCode: Yup.string().required(t("form:zipCodeError")),
    city: Yup.string().required(t("form:cityError")),
    country: Yup.string().required(t("form:countryError")),
    taxNumber: Yup.string().required(t("form:taxNumberError")),
    registrationNumber: Yup.string().required(
      t("form:registrationNumberError")
    ),
  });

  const addInitialValues = {
    clientName: "",
    clientAddress: "",
    city: "",
    country: "",
    zipCode: "",
    taxNumber: "",
    registrationNumber: "",
  };

  const editInitialValues = {
    clientName: modalData?.clientName,
    clientAddress: modalData?.clientAddress,
    city: modalData?.city,
    country: modalData?.country,
    zipCode: modalData?.zipCode,
    taxNumber: modalData?.taxNumber,
    registrationNumber: modalData?.registrationNumber,
  };

  const addOnSubmit = (data: FormikValues) => {
    return {
      method: "POST",
      url: "/api/client",
      data: {
        ...data,
      },
    };
  };

  const editOnSubmit = (data: FormikValues) => {
    return {
      method: "PUT",
      url: "/api/client",
      data: {
        _id: modalData?._id,
        ...data,
      },
    };
  };

  return (
    <Background>
      <Modal ref={modalPopupRef}>
        <Formik
          autoComplete="off"
          initialValues={modalData ? editInitialValues : addInitialValues}
          validationSchema={AddClientSchema}
          onSubmit={async (data: IClientFormValues) => {
            await axios(modalData ? editOnSubmit(data) : addOnSubmit(data))
              .then(res => {
                setIsModalOpen(false);

                setModalData(res.data);
                router.asPath === "/invoice/add" ? "" : router.push("/clients");
              })
              .catch(err => {
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
              <Heading
                as="h4"
                padding={{
                  xs: { bottom: 4 },
                  sm: { bottom: 4 },
                  md: { bottom: 4 },
                }}
              >
                {modalData
                  ? t("invoice:editClient")
                  : t("invoice:addNewClient")}
              </Heading>

              <Group>
                <Label>{t("form:clientNameLabel")}</Label>
                <Field
                  hasError={Boolean(errors.clientName && touched.clientName)}
                  type="text"
                  name="clientName"
                  placeholder={t("form:clientNamePlaceholder")}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.clientName}
                />

                <ErrorWrap>
                  {errors.clientName && touched.clientName ? (
                    <>{errors.clientName}</>
                  ) : null}
                </ErrorWrap>
              </Group>

              <Group>
                <Label>{t("form:clientAddressLabel")}</Label>
                <Field
                  type="text"
                  name="clientAddress"
                  placeholder={t("form:clientAddressPlaceholder")}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.clientAddress}
                  hasError={
                    errors.clientAddress && touched.clientAddress ? true : false
                  }
                />

                <ErrorWrap>
                  {errors.clientAddress && touched.clientAddress ? (
                    <>{errors.clientAddress}</>
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
                    <ErrorWrap>{errors.zipCode}</ErrorWrap>
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
                  {errors.city && touched.city ? (
                    <ErrorWrap>{errors.city}</ErrorWrap>
                  ) : null}
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
                    <ErrorWrap>{errors.country}</ErrorWrap>
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

              <Button
                type="submit"
                variant="secondary"
                isLoading={isSubmitting}
                margin={{
                  xs: { top: 2 },
                  sm: { top: 2 },
                  md: { top: 2 },
                }}
              >
                {isSubmitting ? t("form:loading") : t("form:myAccountCta")}
              </Button>
            </Form>
          )}
        </Formik>

        <Close>
          <CloseOutlinedIcon
            fontSize="large"
            onClick={() => setIsModalOpen(!isModalOpen)}
          />
        </Close>
      </Modal>
    </Background>
  );
};

export { index as AddClientModal };
