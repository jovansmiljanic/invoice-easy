// Global containers
import { PreviewInvoice } from "@containers";

// Global components
import { Layout } from "@components";

// Core
import { GetServerSideProps } from "next";

// Vendors
import { getSession } from "next-auth/react";

// Global types
import { Client, Invoice, MyAccount } from "@types";

interface ContentPageProps {
  account: MyAccount;
  invoice: Invoice;
  client: Client;
}

export default function Page({ account, invoice, client }: ContentPageProps) {
  return (
    <Layout title="Create new invoice">
      <PreviewInvoice myAccount={account} invoice={invoice} {...{ client }} />
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

  // Pass data to the page via props
  const invoiceDetails = await fetch(`${process.env.NEXTAUTH_URL}/api/invoice`);
  const { items } = await invoiceDetails.json();
  const [invoice] = items.filter(({ _id }: any) => _id === ctx.params?.client);

  // Pass data to the page via props
  const clientsData = await fetch(`${process.env.NEXTAUTH_URL}/api/client`);
  const { clients } = await clientsData.json();
  const [client] = clients.filter(({ _id }: any) => _id === invoice.client);

  // Pass data to the page via props
  const details = await fetch(`${process.env.NEXTAUTH_URL}/api/registration`);
  const { users } = await details.json();
  const [account] = users.filter(({ _id }: any) => _id === session.user._id);

  return {
    props: { account, invoice, client },
  };
};
