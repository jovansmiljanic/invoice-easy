// Global containers
import { PreviewInvoice } from "@containers";

// Global components
import { Layout } from "@components";

// Core
import { GetServerSideProps } from "next";

// Vendors
import { getSession } from "next-auth/react";

// Global types
import { Invoice, MyAccount as MyAccountTypes } from "@types";

// Vendor types
import type { Session } from "next-auth";

interface ContentPageProps {
  invoice: Invoice;
  session: Session;
  currentUser: MyAccountTypes;
}

export default function Page({
  invoice,
  session,
  currentUser,
}: ContentPageProps) {
  return (
    <Layout title="Create new invoice" session={session}>
      <PreviewInvoice invoice={invoice} currentUser={currentUser} />
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

  // Pass data to the page via props
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
  const { currentUser }: { currentUser: MyAccountTypes } =
    await userDetails.json();

  const [invoice] = invoices.filter(
    ({ _id }) => _id.toString() === ctx.params?.client
  );

  return {
    props: { invoice, session, currentUser },
  };
};
