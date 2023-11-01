// Core
import React, { useContext } from "react";
import Head from "next/head";

// Core types
import type { FC } from "react";

// Local components
import { Header } from "./Header";
import { Footer } from "./Footer";

// Nextjs types
import type { Session } from "next-auth";

// Store context
import { StoreContext } from "@context";

import { AddClientModal, ConfirmDeleteModal } from "@components";

interface Props {
  title?: string;
  children?: React.ReactNode;
  session?: Session | null;
}

export const Layout: FC<Props> = ({ title, children, session }) => {
  const { isModalOpen, isConfirmModal } = useContext(StoreContext);

  return (
    <>
      <Head>
        <title>{`${title ? title + " - " : ""}Invoice easy`}</title>
      </Head>

      <Header session={session} />
      {children}
      <Footer />

      {isModalOpen && <AddClientModal />}
      {isConfirmModal && <ConfirmDeleteModal />}
    </>
  );
};
