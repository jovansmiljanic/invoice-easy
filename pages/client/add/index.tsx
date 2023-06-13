// Global containers
import { AddClient } from "@containers";

// Global components
import { Layout } from "@components";

// Core
import { GetServerSideProps } from "next";

// Vendors
import { getSession } from "next-auth/react";

export default function Page() {
  return (
    <Layout title="Add new client">
      <AddClient />
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

  return {
    props: {},
  };
};
