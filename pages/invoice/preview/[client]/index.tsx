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
  currentUser: MyAccount;
  invoice: Invoice;
  session: Session;
}

export default function Page({
  currentUser,
  invoice,
  session,
}: ContentPageProps) {
  return (
    <Layout title="Create new invoice" session={session}>
      <PreviewInvoice myAccount={currentUser} invoice={invoice} />
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

  const [invoice] = invoices.filter(
    ({ _id }: any) => _id === ctx.params?.client
  );

  // Pass data to the page via props
  const user = await fetch(`${process.env.NEXTAUTH_URL}/api/registration`, {
    method: "GET",
    headers: {
      Cookie: ctx?.req?.headers?.cookie ?? "",
    },
  });
  const { currentUser } = await user.json();

  return {
    props: { currentUser, invoice, session },
  };
};
