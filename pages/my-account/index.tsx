// Global containers
import { MyAccount } from "@containers";

// Global components
import { Layout } from "@components";

// Core
import { GetServerSideProps } from "next";

// Vendor types
import type { Session } from "next-auth";

// Vendors
import { getSession } from "next-auth/react";

interface ContentPageProps {
  session: Session;
}

export default function Page({ session }: ContentPageProps) {
  return (
    <Layout title="Update company details" session={session}>
      <MyAccount />
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
    props: { session },
  };
};
