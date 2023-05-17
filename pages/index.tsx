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

export default function Page({ invoices }: ContentPageProps) {
  return (
    <Layout title="Dashboard">
      <Dashboard invoices={invoices} />
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
  const { invoices } = await invoice.json();

  return {
    props: { invoices },
  };
};
