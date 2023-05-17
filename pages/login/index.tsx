// Global containers
import { Login } from "@containers";

// Core
import { GetServerSideProps } from "next";

// Vendors
import { getSession } from "next-auth/react";

export default function Page() {
  return (
    <>
      <title>Login - Invoice Easy</title>
      <Login />
    </>
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
