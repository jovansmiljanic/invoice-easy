// Global containers
import { Template } from "@containers";

// Global components
import { Layout } from "@components";

// Core
import { GetServerSideProps } from "next";

// Vendors
import { getSession } from "next-auth/react";

// Global types
import { Invoice, MyAccount } from "@types";

// Vendor types
import type { Session } from "next-auth";

interface ContentPageProps {
  session: Session;
  invoice: Invoice;
  currentUser: MyAccount;
}

export default function Page({
  invoice,
  session,
  currentUser,
}: ContentPageProps) {
  return (
    <Layout title="Edit invoice" session={session}>
      <Template invoice={invoice} currentUser={currentUser} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
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
  const { items: invoices }: { items: Invoice[] } = await invoiceDetails.json();

  const [invoice] = invoices.filter(
    ({ _id }) => _id.toString() === ctx.params?.client
  );

  // Pass data to the page via props
  const userDetails = await fetch(
    `${process.env.NEXTAUTH_URL}/api/registration`,
    {
      method: "GET",
      headers: {
        Cookie: ctx?.req?.headers?.cookie ?? "",
      },
    }
  );
  const { currentUser }: { currentUser: MyAccount } = await userDetails.json();

  return {
    props: { invoice, session, currentUser },
  };
};
