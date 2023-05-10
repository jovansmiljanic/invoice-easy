// Global containers
import { MyAccount } from "@containers";

// Global components
import { Layout } from "@components";

// Core
import { GetServerSideProps } from "next";

// Vendors
import { getSession } from "next-auth/react";
import { MyAccount as MyAccountType } from "@types";

interface ContentPageProps {
  myAccount: MyAccountType[];
}

export default function Page({ myAccount }: ContentPageProps) {
  return (
    <Layout title="Create new invoice">
      <MyAccount details={myAccount} />
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

  const details = await fetch(`${process.env.NEXTAUTH_URL}/api/my-account`);
  const { myAccount } = await details.json();

  return {
    props: { myAccount },
  };
};
