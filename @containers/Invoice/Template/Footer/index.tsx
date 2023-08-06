// Core types
import type { FC } from "react";

// Global components
import { Heading } from "@components";

// Global types
import { MyAccount } from "@types";

// Vendors
import styled, { css } from "styled-components";

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

interface Footer {
  currentUser: MyAccount;
}

const index: FC<Footer> = ({ currentUser }) => {
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
          {currentUser?.companyField}, {currentUser?.companyName}. Transakcijski
          račun odprt pri {currentUser?.bankName} – {currentUser?.trr}
          ., davčna številka: {currentUser?.taxNumber}.
        </p>
      </Footer>
    </>
  );
};

export { index as Footer };