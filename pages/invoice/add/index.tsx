// Global containers
import { AddInvoice } from "@containers";

// Global components
import { Layout } from "@components";

// Core
import { GetServerSideProps } from "next";

// Vendors
import { getSession } from "next-auth/react";

// Global types
import { Client, Invoice, MyAccount } from "@types";
import { Session } from "next-auth";

interface ContentPageProps {
  client?: Client[];
  account?: MyAccount;
  session: Session;
  invoice?: Invoice;
}

export default function Page({
  account,
  client,
  session,
  invoice,
}: ContentPageProps) {
  return (
    <Layout title="Create new invoice" session={session}>
      <AddInvoice account={account} client={client} invoice={invoice} />
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

  const invoiceDetails = await fetch(`${process.env.NEXTAUTH_URL}/api/invoice`);
  const { items: invoices } = await invoiceDetails.json();
  const invoice = invoices.length > 0 ? invoices[0] : [];

  const clientDetails = await fetch(`${process.env.NEXTAUTH_URL}/api/client`);
  const { items } = await clientDetails.json();

  // Pass data to the page via props
  const client = items.filter(({ owner }: any) => owner === session.user._id);

  const details = await fetch(`${process.env.NEXTAUTH_URL}/api/registration`);
  const { users } = await details.json();

  // Pass data to the page via props
  const [account] = users.filter(({ _id }: any) => _id === session.user._id);
  const accountDetails = account ? account : [];

  return {
    props: { account: accountDetails, client, invoice, session },
  };
};
