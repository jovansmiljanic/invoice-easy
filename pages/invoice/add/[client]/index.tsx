// Global containers
import { Invoice } from "@containers";

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
      <Invoice client={client} myAccount={account} />
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

  // Pass data to the page via props
  const client = clients.find(({ _id }: any) => _id === ctx.params?.client);

  const myDetails = await fetch(`${process.env.NEXTAUTH_URL}/api/my-account`);
  const { myAccount } = await myDetails.json();

  const account = myAccount[0];

  return {
    props: { client, account },
  };
};
