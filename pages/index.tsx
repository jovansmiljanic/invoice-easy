// Global containers
import { Dashboard } from "@containers";

// Global components
import { Layout } from "@components";

// Core
import { GetServerSideProps } from "next";

// Vendors
import { getSession } from "next-auth/react";

// core types
import { Session } from "next-auth";
import { Client, Invoice, MyAccount } from "@types";

interface ContentPageProps {
  session: Session;
  clients?: number;
  totalPrice?: number;
  totalPaidInvoices?: number;
  currentUser: MyAccount;
}

export default function Page({
  session,
  clients,
  totalPrice,
  totalPaidInvoices,
  currentUser,
}: ContentPageProps) {
  return (
    <Layout title="Dashboard" session={session}>
      <Dashboard
        clients={clients}
        totalPrice={totalPrice}
        totalPaidInvoices={totalPaidInvoices}
        currentUser={currentUser}
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

  // Get current user
  const user = await fetch(`${process.env.NEXTAUTH_URL}/api/registration`, {
    method: "GET",
    headers: {
      Cookie: ctx?.req?.headers?.cookie ?? "",
    },
  });
  const { currentUser } = await user.json();

  if (!currentUser?.phoneNumber) {
    return {
      redirect: {
        destination: "/my-account",
        permanent: false,
      },
    };
  }

  // Get all clients
  const clientDetails = await fetch(`${process.env.NEXTAUTH_URL}/api/client`, {
    method: "GET",
    headers: {
      Cookie: ctx?.req?.headers?.cookie ?? "",
    },
  });
  const { items: clients } = await clientDetails.json();

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

  // Calculate the total sum of prices
  const totalPrice = invoices.reduce((sum: number, invoice: Invoice) => {
    const items = invoice.items;
    const prices = items.map((item) => parseInt(item.price.toString()));
    const total = prices.reduce((subtotal, price) => subtotal + price, 0);
    return sum + total;
  }, 0);

  const totalPaid = invoices.filter(
    (invoice: Invoice) => invoice.status === "1"
  );

  // Calculate the total sum of prices
  const totalPaidInvoices = totalPaid.reduce(
    (sum: number, invoice: Invoice) => {
      const items = invoice.items;
      const prices = items.map((item) => parseInt(item.price.toString()));
      const total = prices.reduce((subtotal, price) => subtotal + price, 0);
      return sum + total;
    },
    0
  );

  return {
    props: {
      session,
      clients: clients.length,
      totalPrice,
      totalPaidInvoices,
      currentUser,
    },
  };
};
