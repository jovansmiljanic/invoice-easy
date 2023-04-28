// Global containers
import { Home, Login } from "@containers";

// Global components
import { Layout } from "@components";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

interface ContentPageProps {
  session: Session;
}

export default function Page({ session }: ContentPageProps) {
  if (!session) return <Login />;

  return (
    <Layout title="Home">
      <Home />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Check session
  const session = await getSession(ctx);

  return {
    props: { session },
  };
};
