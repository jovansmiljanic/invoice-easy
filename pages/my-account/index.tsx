// Global containers
import { MyAccount } from "@containers";

// Global components
import { Layout } from "@components";

// Core
import { GetServerSideProps } from "next";

// Vendor types
import type { Session } from "next-auth";

// Vendors
import { getSession } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";

interface ContentPageProps {
  session: Session;
}

export default function Page({ session }: ContentPageProps) {
  // Translation
  const { t } = useTranslation();

  return (
    <Layout title={t("home:myProfileTitle")} session={session}>
      <MyAccount />
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

  return {
    props: { session },
  };
};
