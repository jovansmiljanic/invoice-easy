// Global containers
import { Template } from "@containers";

// Global components
import { Layout } from "@components";

// Core
import { GetServerSideProps } from "next";

// Vendors
import { getSession } from "next-auth/react";

// Vendor types
import type { Session } from "next-auth";

// Global types
import { Client } from "@types";
import { findBiggestInvoiceNumber } from "@utils/shared/getInvoiceNumber";

interface ContentPageProps {
  client?: Client[];
  session: Session;
  invoiceNumber: number;
}

export default function Page({
  client,
  invoiceNumber,
  session,
}: ContentPageProps) {
  return (
    <Layout title="Create new invoice" session={session}>
      <Template invoiceNumber={invoiceNumber} client={client} />
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

  const invoiceNumber = findBiggestInvoiceNumber(invoices);

  const clientDetails = await fetch(`${process.env.NEXTAUTH_URL}/api/client`, {
    method: "GET",
    headers: {
      Cookie: ctx?.req?.headers?.cookie ?? "",
    },
  });
  const { items: client } = await clientDetails.json();

  return {
    props: { client, invoiceNumber, session },
  };
};
