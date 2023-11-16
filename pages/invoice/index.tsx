// Global containers
import { Invoices } from "@containers";

// Global components
import { Layout } from "@components";

// Core
import { GetServerSideProps } from "next";

// Vendors
import { getSession } from "next-auth/react";

// Vendor types
import type { Session } from "next-auth";
import useTranslation from "next-translate/useTranslation";
import { MyAccount } from "@types";

interface ContentPageProps {
  session: Session;
  currentUser: MyAccount;
}

export default function Page({ session, currentUser }: ContentPageProps) {
  // Translation
  const { t } = useTranslation();

  return (
    <Layout title={t("home:invoicesTitle")} session={session}>
      <Invoices currentUser={currentUser} />
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
    props: {
      session,
      currentUser,
    },
  };
};
