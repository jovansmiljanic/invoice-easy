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

interface ContentPageProps {
  session: Session;
  currentUser: MyAccountType;
}

export default function Page({ currentUser, session }: ContentPageProps) {
  return (
    <Layout title="Update company details" session={session}>
      <MyAccount details={currentUser} session={session} />
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

  const user = await fetch(`${process.env.NEXTAUTH_URL}/api/registration`, {
    method: "GET",
    headers: {
      Cookie: ctx?.req?.headers?.cookie ?? "",
    },
  });

  const { currentUser } = await user.json();

  return {
    props: { currentUser, session },
  };
};
