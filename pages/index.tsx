// Global components
import { Layout } from "@components";

// Global containers
import { Dashboard } from "@containers";

// Core
import type { GetServerSideProps } from "next";

// Vendors
import { getSession } from "next-auth/react";

// core types
import type { Session } from "next-auth";

interface ContentPageProps {
  session: Session;
}

export default function Page({ session }: ContentPageProps) {
  return (
    <Layout title="Dashboard" session={session}>
      <Dashboard />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Check session
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
