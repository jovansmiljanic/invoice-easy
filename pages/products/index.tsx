// Global containers
import { PreviewInvoice } from "@containers";

// Global components
import { Layout } from "@components";

// Core
import { GetServerSideProps } from "next";

// Vendors
import { getSession } from "next-auth/react";

// Vendor types
import type { Session } from "next-auth";
import useTranslation from "next-translate/useTranslation";

import { ProductDashboard } from "@containers/Products";

interface ContentPageProps {
  session: Session;
}

export default function Page({ session }: ContentPageProps) {
  // Translation
  const { t } = useTranslation();

  return (
    <Layout title={t("home:productsTitle")} session={session}>
      <ProductDashboard />
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
