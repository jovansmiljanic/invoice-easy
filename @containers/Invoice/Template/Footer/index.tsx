// Core types
import { type FC } from "react";

// Global components
import { Heading } from "@components";

// Vendors
import styled, { css } from "styled-components";
import useTranslation from "next-translate/useTranslation";

// Global types
import { MyAccount } from "@types";
import { FormikValues, useFormikContext } from "formik";

const Note = styled.div`
  width: 60%;
  padding: 80px 15px;

  p {
    font-size: 10px;
    line-height: 1.5;
  }

  ${({ theme: { breakpoints } }) => css`
    @media (max-width: ${breakpoints.md}px) {
      width: 100%;
      padding: 50px 15px;
    }
  `}
`;

const Footer = styled.div`
  text-align: center;

  ${({ theme: { font, breakpoints } }) => css`
    p {
      font-size: 10px;
      font-weight: ${font.weight.semiBold};
    }

    @media (max-width: ${breakpoints.md}px) {
      padding: 0 15px;
    }
  `}
`;

interface Template {
  currentUser: MyAccount;
}
const index: FC<Template> = ({ currentUser }) => {
  const { handleBlur, handleChange, values, errors, touched } =
    useFormikContext<FormikValues>();

  // Translation
  const { t } = useTranslation();

  if (!currentUser) return <>Loading....</>;

  return (
    <>
      <Note>
        <Heading as="p">{t("invoice:ddvParagraphOne")}</Heading>
        <Heading as="p">{t("invoice:ddvParagraphTwo")}</Heading>

        <textarea
          name="customText"
          rows={10}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Note>

      <Footer>
        <p>
          {currentUser?.companyField}, {currentUser?.companyName}.
        </p>
      </Footer>
    </>
  );
};

export { index as Footer };
