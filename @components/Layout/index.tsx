// Core types
import type { FC } from "react";

// Core
import Head from "next/head";
import React, { useContext } from "react";

// Local components
import { Header } from "./Header";
import { Footer } from "./Footer";

// Nextjs types
import type { Session } from "next-auth";

// Store context
import { StoreContext } from "@context";

// Vendors
import styled, { css } from "styled-components";

// Local components
import { Sidebar } from "./Sidebar";
import { useRouter } from "next/router";

interface Props {
  title?: string;
  children?: React.ReactNode;
  session?: Session;
}

const Layout = styled.div<{ session?: Session; isSignPage?: boolean }>`
  ${({ isSignPage, session, theme: { breakpoints } }) => css`
    ${session
      ? `grid-template-columns: 250px 1fr;`
      : `grid-template-columns: 0 1fr;`}

    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;

    ${!isSignPage &&
    css`
      @media (max-width: ${breakpoints.md}px) {
        grid-template-columns: 1fr;
      }
    `}
  `}
`;

const Main = styled.div`
  grid-column: 2 / 3;
  grid-row: 2;

  background-color: ;
  border-radius: 10px;
  padding: 20px;

  ${({ theme: { colors } }) => css`
    background-color: ${colors.background};
  `}
`;

export const index: FC<Props> = ({ title, children, session }) => {
  const { isPhone } = useContext(StoreContext);

  const { asPath } = useRouter();

  return (
    <Layout
      session={session}
      isSignPage={asPath === "/signin" || asPath === "/signup"}
    >
      <Head>
        <title>{`${title ? title + " - " : ""}Invoice easy`}</title>
      </Head>

      <Header session={session} title={title} />

      {!isPhone && session && <Sidebar />}

      <Main>{children}</Main>

      <Footer />
    </Layout>
  );
};

export { index as Layout };
