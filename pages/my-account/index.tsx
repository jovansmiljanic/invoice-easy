// Global containers
import { MyAccount } from "@containers";

// Global components
import { Layout } from "@components";

// Core
import { GetServerSideProps } from "next";

// Vendors
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

// Global types
import { MyAccount as MyAccountType } from "@types";

// Vendor types
import mongoose from "mongoose";

interface ContentPageProps {
  session: Session;
  myAccount: MyAccountType;
}

export default function Page({ myAccount, session }: ContentPageProps) {
  return (
    <Layout title="Update company details" session={session}>
      <MyAccount details={myAccount} session={session} />
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

  const [myAccount] = users.filter(
    ({ _id }: mongoose.Types.ObjectId) => _id === session.user._id
  );

  return {
    props: { myAccount, session },
  };
};
