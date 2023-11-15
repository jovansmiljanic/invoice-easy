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
import { AddProductModal } from "@components/Modals/AddProduct";
import { ConfirmDeleteModal } from "@components/Modals/ConfirmDelete";
import { AddClientModal } from "@components/Modals/AddClient";

interface Props {
  title?: string;
  children?: React.ReactNode;
  session?: Session;
}

const Layout = styled.div<{ session?: Session }>`
  ${({ session, theme: { breakpoints } }) => css`
    ${session
      ? `grid-template-columns: 250px 1fr;`
      : `grid-template-columns: 0 1fr;`}

    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;

    @media (max-width: ${breakpoints.md}px) {
      grid-template-columns: 1fr;
    }
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
  const { isPhone, isModalOpen, isConfirmModal, isProductModalOpen } =
    useContext(StoreContext);

  return (
    <Layout session={session}>
      <Head>
        <title>{`${title ? title + " - " : ""}Invoice easy`}</title>
      </Head>

      <Header session={session} title={title} />

      {!isPhone && session && <Sidebar />}

      <Main>{children}</Main>

      <Footer />

      {isModalOpen && <AddClientModal />}
      {isProductModalOpen && <AddProductModal />}
      {isConfirmModal && <ConfirmDeleteModal />}
    </Layout>
  );
};

export { index as Layout };
