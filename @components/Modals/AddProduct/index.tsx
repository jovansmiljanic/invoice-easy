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

const index: FC = () => {
  // Translation
  const { t } = useTranslation();

  // Router
  const router = useRouter();

  const { isModalOpen, setIsModalOpen } = useContext(GridContext);
  const { isModalData, setIsModalData } = useContext(StoreContext);

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

  const AddProductSchema = Yup.object().shape({
    name: Yup.string().required(t("form:productNameError")),
    price: Yup.string().required(t("form:productAddressError")),
  });

  const addInitialValues = {
    name: "",
    price: "",
  };

  const editInitialValues = {
    name: isModalData?.name,
    price: isModalData?.price,
  };

  const addOnSubmit = (data: FormikValues) => {
    return {
      method: "POST",
      url: "/api/products",
      data: {
        ...data,
      },
    };
  };

  const editOnSubmit = (data: FormikValues) => {
    return {
      method: "PUT",
      url: "/api/products",
      data: {
        _id: isModalData?._id,
        ...data,
      },
    };
  };

  return (
    <Background>
      <Modal ref={modalPopupRef}>
        <Formik
          autoComplete="off"
          initialValues={isModalData ? editInitialValues : addInitialValues}
          validationSchema={AddProductSchema}
          onSubmit={async (data: { name: string; price: string }) => {
            await axios(isModalData ? editOnSubmit(data) : addOnSubmit(data))
              .then(res => {
                setIsModalOpen(false);

                setIsModalData("");

                router.push("/products");
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
                {isModalData
                  ? t("product:editProduct")
                  : t("product:addNewProduct")}
              </Heading>

              <Group>
                <Label>{t("form:productNameLabel")}</Label>
                <Field
                  hasError={Boolean(errors.name && touched.name)}
                  type="text"
                  name="name"
                  placeholder={t("form:productNamePlaceholder")}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />

                <ErrorWrap>
                  {errors.name && touched.name ? (
                    <ErrorWrap>{errors.name}</ErrorWrap>
                  ) : null}
                </ErrorWrap>
              </Group>

              <Group>
                <Label>{t("form:productPriceLabel")}</Label>
                <Field
                  type="text"
                  name="price"
                  placeholder={t("form:productPricePlaceholder")}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.price}
                  hasError={errors.price && touched.price ? true : false}
                />

                <ErrorWrap>
                  {errors.price && touched.price ? (
                    <ErrorWrap>{errors.price}</ErrorWrap>
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

export { index as AddProductModal };
