// Global containers
import { Layout } from "@components";

// Global containers
import { SignUp } from "@containers";

// Core
import { GetServerSideProps } from "next";

// Vendors
import { getSession } from "next-auth/react";

export default function Page() {
  return (
    <Layout title="Sign up">
      <SignUp />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Check session
  const session = await getSession(ctx);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
