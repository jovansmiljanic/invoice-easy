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

interface ContentPageProps {
  session: Session;
}

export default function Page({ session }: ContentPageProps) {
  return (
    <Layout title="Dashboard" session={session}>
      <Dashboard />
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

  const details = await fetch(`${process.env.NEXTAUTH_URL}/api/registration`);
  const { users } = await details.json();
  // Pass data to the page via props
  const [account] = users.filter(({ _id }: any) => _id === session.user._id);

  if (!account.phoneNumber || !account.taxNumber) {
    return {
      redirect: {
        destination: "/my-account",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
