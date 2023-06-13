// Global containers
import { Dashboard } from "@containers";

// Global components
import { Layout } from "@components";

// Core
import { GetServerSideProps } from "next";

// Vendors
import { getSession } from "next-auth/react";

// Types
import { Invoice } from "@types";

interface ContentPageProps {
  invoices: Invoice[];
}

export default function Page() {
  return (
    <Layout title="Dashboard">
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
        destination: "/login",
        permanent: false,
      },
    };
  }

  const invoice = await fetch(`${process.env.NEXTAUTH_URL}/api/invoice`);
  const a = await invoice.json();

  return {
    props: {},
  };
};
