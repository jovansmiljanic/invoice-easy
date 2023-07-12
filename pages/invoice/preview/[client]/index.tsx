// Global containers
import { PreviewInvoice } from "@containers";

// Global components
import { Layout } from "@components";

// Core
import { GetServerSideProps } from "next";

// Vendors
import { getSession } from "next-auth/react";

// Global types
import { Invoice, MyAccount } from "@types";
import { Session } from "next-auth";

interface ContentPageProps {
  account: MyAccount;
  invoice: Invoice;
  session: Session;
}

export default function Page({ account, invoice, session }: ContentPageProps) {
  return (
    <Layout title="Create new invoice" session={session}>
      <PreviewInvoice myAccount={account} invoice={invoice} />
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

  // Pass data to the page via props
  const invoiceDetails = await fetch(`${process.env.NEXTAUTH_URL}/api/invoice`);
  const { items } = await invoiceDetails.json();
  const [invoice] = items.filter(({ _id }: any) => _id === ctx.params?.client);

  // Pass data to the page via props
  const details = await fetch(`${process.env.NEXTAUTH_URL}/api/registration`);
  const { users } = await details.json();
  const [account] = users.filter(({ _id }: any) => _id === session.user._id);

  return {
    props: { account, invoice, session },
  };
};
