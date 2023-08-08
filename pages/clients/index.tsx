// Global components
import { Layout } from "@components";

// Core
import { GetServerSideProps } from "next";

// Vendors
import { getSession } from "next-auth/react";

// core types
import { Session } from "next-auth";
import { TableTemplate } from "@containers/Table";

interface ContentPageProps {
  session: Session;
}

export default function Page({ session }: ContentPageProps) {
  return (
    <Layout title="Dashboard" session={session}>
      <TableTemplate />
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
