// Global containers
import { Template } from "@containers";

// Global components
import { Layout } from "@components";

// Core
import { GetServerSideProps } from "next";

// Vendors
import { getSession } from "next-auth/react";

// Global types
import { Client, MyAccount } from "@types";
import { Session } from "next-auth";

interface ContentPageProps {
  client?: Client[];
  currentUser: MyAccount;
  session: Session;
  invoiceNumber: number;
}

export default function Page({
  currentUser,
  client,
  invoiceNumber,
  session,
}: ContentPageProps) {
  return (
    <Layout title="Create new invoice" session={session}>
      <Template
        currentUser={currentUser}
        invoiceNumber={invoiceNumber}
        client={client}
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
  const invoiceNumber = invoices.length > 0 ? invoices[0].invoiceNumber : 0;

  const clientDetails = await fetch(`${process.env.NEXTAUTH_URL}/api/client`, {
    method: "GET",
    headers: {
      Cookie: ctx?.req?.headers?.cookie ?? "",
    },
  });
  const { items: client } = await clientDetails.json();

  const details = await fetch(`${process.env.NEXTAUTH_URL}/api/registration`, {
    method: "GET",
    headers: {
      Cookie: ctx?.req?.headers?.cookie ?? "",
    },
  });
  const { currentUser } = await details.json();

  return {
    props: { currentUser, client, invoiceNumber, session },
  };
};
