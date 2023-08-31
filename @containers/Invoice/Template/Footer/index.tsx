// Core types
import { type FC, useContext } from "react";

// Global components
import { Heading } from "@components";

// Vendors
import styled, { css } from "styled-components";
import { StoreContext } from "@context";

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

interface Footer {}

const index: FC<Footer> = () => {
  const { isUserData } = useContext(StoreContext);

  return (
    <>
      <Note>
        <Heading as="p">
          DDV ni obračunan na podlagi 1. Odstavka 94. Člena Zakona o davku na
          dodano vrednost. (nisem zavezanec za DDV). PRI POSLOVANJU NE
          UPORABLJAM ŽIGA.
        </Heading>
        <Heading as="p">
          Znesek računa poravnajte na transakcijski račun odprt pri N26.,
          številka DE91 1001 1001 2623 8152 93. Pri plačilu se sklicujte na
          številko računa
        </Heading>
      </Note>

      <Footer>
        <p>
          {isUserData?.companyField}, {isUserData?.companyName}. Transakcijski
          račun odprt pri {isUserData?.bankName} – {isUserData?.trr}
          ., davčna številka: {isUserData?.taxNumber}.
        </p>
      </Footer>
    </>
  );
};

export { index as Footer };
