// Global containers
import { NewInvoice } from "@containers";

// Global components
import { Layout } from "@components";

// Core
import { GetServerSideProps } from "next";

// Vendors
import { getSession } from "next-auth/react";

// Global types
import { Company, MyAccount } from "@types";

interface ContentPageProps {
  company: Company;
  account: MyAccount;
}

export default function Page({ company, account }: ContentPageProps) {
  return (
    <Layout title="Create new invoice">
      <NewInvoice company={company} myAccount={account} />
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

  const companyDetails = await fetch(`${process.env.NEXTAUTH_URL}/api/company`);
  const { companies } = await companyDetails.json();

  // Pass data to the page via props
  const company = companies.find(({ _id }: any) => _id === ctx.params?.company);

  const myDetails = await fetch(`${process.env.NEXTAUTH_URL}/api/my-account`);
  const { myAccount } = await myDetails.json();

  const account = myAccount[0];

  return {
    props: { company, account },
  };
};
