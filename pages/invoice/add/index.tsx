// Global components
import { Layout } from "@components";

// Core
import { GetServerSideProps } from "next";

// Vendors
import { getSession } from "next-auth/react";

// Global types
import { Client } from "@types";

// Global containers
import { NewInvoice } from "@containers";

interface ContentPageProps {
  clients: Client[];
}

export default function Page({ clients }: ContentPageProps) {
  return (
    <Layout title="Choose client">
      <NewInvoice clients={clients} />
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

  const clientDetails = await fetch(`${process.env.NEXTAUTH_URL}/api/client`);
  const { clients } = await clientDetails.json();

  return {
    props: { clients },
  };
};
