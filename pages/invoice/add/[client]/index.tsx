// Global containers
import { AddInvoice } from "@containers";

// Global components
import { Layout } from "@components";

// Core
import { GetServerSideProps } from "next";

// Vendors
import { getSession } from "next-auth/react";

// Global types
import { Client, MyAccount } from "@types";

interface ContentPageProps {
  client: Client;
  account: MyAccount;
}

export default function Page({ client, account }: ContentPageProps) {
  return (
    <Layout title="Create new invoice">
      <AddInvoice client={client} myAccount={account} />
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
  const { items } = await clientDetails.json();

  // Pass data to the page via props
  const client = items.find(({ _id }: any) => _id === ctx.params?.client);

  const details = await fetch(`${process.env.NEXTAUTH_URL}/api/registration`);
  const { users } = await details.json();

  // Pass data to the page via props
  const [account] = users.filter(({ _id }: any) => _id === session.user._id);

  return {
    props: { client, account },
  };
};
