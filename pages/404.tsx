// Global containers
import { NotFound } from "@containers";

// Global components
import { Layout } from "@components";

export default function Page() {
  return (
    <Layout title="Page not found">
      <NotFound />
    </Layout>
  );
}
