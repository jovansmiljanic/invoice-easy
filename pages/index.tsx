// Global containers
import { Dashboard } from "@containers";

// Global components
import { Layout } from "@components";

// Core
import { GetServerSideProps } from "next";

// Vendors
import { getSession } from "next-auth/react";

// core types
import { Session } from "next-auth";
import { Client, Invoice, MyAccount } from "@types";

interface ContentPageProps {
  session: Session;
  clients?: Client[];
  invoices?: Invoice[];
  currentUser: MyAccount;
}

export default function Page({
  session,
  clients,
  invoices,
  currentUser,
}: ContentPageProps) {
  return (
    <Layout title="Dashboard" session={session}>
      <Dashboard
        clients={clients}
        invoices={invoices}
        currentUser={currentUser}
      />
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

  // Get current user
  const user = await fetch(`${process.env.NEXTAUTH_URL}/api/registration`, {
    method: "GET",
    headers: {
      Cookie: ctx?.req?.headers?.cookie ?? "",
    },
  });
  const { currentUser } = await user.json();

  if (!currentUser?.phoneNumber) {
    return {
      redirect: {
        destination: "/my-account",
        permanent: false,
      },
    };
  }

  // Get all clients
  const clientDetails = await fetch(`${process.env.NEXTAUTH_URL}/api/client`, {
    method: "GET",
    headers: {
      Cookie: ctx?.req?.headers?.cookie ?? "",
    },
  });
  const { items: clients } = await clientDetails.json();

  const invoiceDetails = await fetch(
    `${process.env.NEXTAUTH_URL}/api/invoice`,
    {
      method: "GET",
      headers: {
        Cookie: ctx?.req?.headers?.cookie ?? "",
      },
    }
  );
  const { items: invoices } = await invoiceDetails.json();

  return {
    props: {
      session,
      clients,
      invoices,
      currentUser,
    },
  };
};
