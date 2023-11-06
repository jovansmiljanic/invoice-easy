// Global containers
import { PreviewInvoice } from "@containers";

// Global components
import { Layout } from "@components";

// Core
import { GetServerSideProps } from "next";

// Vendors
import { getSession } from "next-auth/react";

// Global types
import { Invoice } from "@types";

// Vendor types
import type { Session } from "next-auth";
import { ProductDashboard } from "@containers/Products";

interface ContentPageProps {
  session: Session;
}

export default function Page({ session }: ContentPageProps) {
  return (
    <Layout title="Create new invoice" session={session}>
      <ProductDashboard />
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
