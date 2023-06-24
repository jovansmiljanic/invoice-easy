// Core
import React from "react";
import Head from "next/head";

// Core types
import type { FC } from "react";

// Local components
import { Header } from "./Header";
import { Footer } from "./Footer";

// Nextjs types
import { Session } from "next-auth";

interface Props {
  title?: string;
  children?: React.ReactNode;
  session?: Session;
}

export const Layout: FC<Props> = ({ title, children, session }) => {
  return (
    <>
      <Head>
        <title>{`${title ? title + " - " : ""}Invoice easy`}</title>
      </Head>

      <Header session={session} />
      {children}
      <Footer />
    </>
  );
};
