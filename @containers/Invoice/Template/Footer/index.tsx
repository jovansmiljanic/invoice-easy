// Core types
import { type FC, useEffect, useState } from "react";

// Global components
import { Heading } from "@components";

// Vendors
import styled, { css } from "styled-components";
import { StoreContext } from "@context";
import { getUserData } from "@utils/client/getUserData";
import { MyAccount } from "@types";

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
  const [userData, setUserData] = useState<MyAccount>();

  useEffect(() => {
    // Fetch user data when the component mounts
    const fetchData = async () => {
      const data = getUserData();
      setUserData(data);
    };

    fetchData();
  }, []);

  if (!userData) {
    return <>Loading</>; // Or you can render a loading indicator
  }
  return (
    <>
      <Note>
        <Heading as="p">
          DDV ni obračunan na podlagi 1. Odstavka 94. Člena Zakona o davku na
          dodano vrednost. (nisem zavezanec za DDV). PRI POSLOVANJU NE
          UPORABLJAM ŽIGA.
        </Heading>
        <Heading as="p">
          Znesek računa poravnajte na transakcijski račun odprt pri{" "}
          {userData?.bankName}, številka {userData?.trr}. Pri plačilu se
          sklicujte na številko računa
        </Heading>
      </Note>

      <Footer>
        <p>
          {userData?.companyField}, {userData?.companyName}. Transakcijski račun
          odprt pri {userData?.bankName} – {userData?.trr}
          ., davčna številka: {userData?.taxNumber}.
        </p>
      </Footer>
    </>
  );
};

export { index as Footer };
