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

// Global styles
import { Field, Label } from "@styles/Form";

// Icon
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

// Store context
import { StoreContext } from "@context";

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
`;

interface Formvalues {
  clientName?: string;
  clientAddress?: string;
  city?: string;
  country?: string;
  zipCode?: string;
  taxNumber?: string;
}

const AddClientSchema = Yup.object().shape({
  clientName: Yup.string().required("Please enter client's name"),
  clientAddress: Yup.string().required("Please enter client's address"),
  zipCode: Yup.string().required("Please enter client's zip code"),
  city: Yup.string().required("Please enter client's city"),
  country: Yup.string().required("Please enter client's country"),
  taxNumber: Yup.string().required("Please enter client's company tax number"),
});

const index: FC = ({}) => {
  // Router
  const router = useRouter();

  // Global context from store
  const { isModalOpen, setIsModalOpen, isClientData, setIsClientData } =
    useContext(StoreContext);

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

  const addInitialValues = {
    clientName: "",
    clientAddress: "",
    city: "",
    country: "",
    zipCode: "",
    taxNumber: "",
  };

  const editInitialValues = {
    clientName: isClientData?.clientName,
    clientAddress: isClientData?.clientAddress,
    city: isClientData?.city,
    country: isClientData?.country,
    zipCode: isClientData?.zipCode,
    taxNumber: isClientData?.taxNumber,
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
        _id: isClientData?._id,
        ...data,
      },
    };
  };

  return (
    <Background>
      <Modal ref={modalPopupRef}>
        <Formik
          autoComplete="off"
          initialValues={isClientData ? editInitialValues : addInitialValues}
          validationSchema={AddClientSchema}
          onSubmit={async (data: Formvalues) => {
            await axios(isClientData ? editOnSubmit(data) : addOnSubmit(data))
              .then((res) => {
                setIsModalOpen(false);

                setIsClientData(res.data);
                router.asPath === "/invoice/add" ? "" : router.push("/clients");
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
              <Heading
                as="h4"
                padding={{
                  xs: { bottom: 4 },
                  sm: { bottom: 4 },
                  md: { bottom: 4 },
                }}
              >
                Add new client
              </Heading>

              <Group>
                <Label>Client name</Label>
                <Field
                  hasError={Boolean(errors.clientName && touched.clientName)}
                  type="text"
                  name="clientName"
                  placeholder="Enter client's name"
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
                <Label>Client address</Label>
                <Field
                  type="text"
                  name="clientAddress"
                  placeholder="Enter client's address"
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
                <Label>Zip Code</Label>
                <Field
                  type="text"
                  name="zipCode"
                  placeholder="Enter client's zip code"
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
                <Label>City</Label>
                <Field
                  type="text"
                  name="city"
                  placeholder="Enter client's city"
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
                <Label>Country</Label>
                <Field
                  type="text"
                  name="country"
                  placeholder="Enter client's country"
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
                <Label>Tax Number</Label>
                <Field
                  type="text"
                  name="taxNumber"
                  placeholder="Enter client's tax number"
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
                {isSubmitting ? "Submitting..." : "Submit"}
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

export { index as ClientModal };
